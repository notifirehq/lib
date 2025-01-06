import { EditorView } from '@uiw/react-codemirror';
import { useCallback, useRef, useState } from 'react';

type SelectedVariable = {
  value: string;
  from: number;
  to: number;
} | null;

/**
 * Manages variable selection and updates in the editor.
 *
 * This hook combines variable selection and update logic:
 * 1. Tracks which variable is currently selected
 * 2. Prevents recursive updates when variables are being modified
 * 3. Handles proper Liquid syntax maintenance
 * 4. Manages cursor position and editor state updates
 */
export function useVariables(viewRef: React.RefObject<EditorView>, onChange: (value: string) => void) {
  const [selectedVariable, setSelectedVariable] = useState<SelectedVariable>(null);
  const isUpdatingRef = useRef(false);

  const handleVariableSelect = useCallback((value: string, from: number, to: number) => {
    if (isUpdatingRef.current) return;
    setSelectedVariable({ value, from, to });
  }, []);

  const handleVariableUpdate = useCallback(
    (newValue: string) => {
      if (!selectedVariable || !viewRef.current || isUpdatingRef.current) return;

      try {
        isUpdatingRef.current = true;
        const { from, to } = selectedVariable;
        const view = viewRef.current;

        // Ensure the new value has proper liquid syntax
        const hasLiquidSyntax = newValue.match(/^\{\{.*\}\}$/);
        const newVariableText = hasLiquidSyntax ? newValue : `{{${newValue}}}`;

        // Calculate the actual end position including closing brackets
        const currentContent = view.state.doc.toString();
        const afterCursor = currentContent.slice(to);
        const closingBracketPos = afterCursor.indexOf('}}');
        const actualEnd = closingBracketPos >= 0 ? to + closingBracketPos + 2 : to;

        const changes = {
          from,
          to: actualEnd,
          insert: newVariableText,
        };

        view.dispatch({
          changes,
          selection: { anchor: from + newVariableText.length },
        });

        onChange(view.state.doc.toString());

        // Update the selected variable with new bounds
        setSelectedVariable((prev: SelectedVariable) =>
          prev ? { ...prev, value: newValue, to: from + newVariableText.length } : null
        );
      } finally {
        isUpdatingRef.current = false;
      }
    },
    [selectedVariable, onChange, viewRef]
  );

  return {
    selectedVariable,
    setSelectedVariable,
    handleVariableSelect,
    handleVariableUpdate,
    isUpdatingRef,
  };
}