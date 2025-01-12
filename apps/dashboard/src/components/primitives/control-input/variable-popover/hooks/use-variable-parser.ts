import { Tokenizer, TokenKind } from 'liquidjs';
import { useMemo } from 'react';
import { TRANSFORMERS } from '../constants';
import { TransformerWithParam } from '../types';

export function useVariableParser(variable: string) {
  return useMemo(() => {
    if (!variable) {
      return { parsedName: '', parsedDefaultValue: '', parsedTransformers: [], originalVariable: '' };
    }

    try {
      // Remove {{ and }} and trim
      const cleanVariable = variable.replace(/^\{\{|\}\}$/g, '').trim();

      // The content before any filters is the variable name
      const [variableName, ...filterParts] = cleanVariable.split('|');
      const parsedName = variableName.trim();

      // Extract default value and transformers from the filters
      let parsedDefaultValue = '';
      const parsedTransformers: TransformerWithParam[] = [];

      if (filterParts.length > 0) {
        const filterTokenizer = new Tokenizer('|' + filterParts.join('|'));
        const filters = filterTokenizer.readFilters();

        // First pass: find default value
        for (const filter of filters) {
          if (filter.kind === TokenKind.Filter && filter.name === 'default' && filter.args.length > 0) {
            parsedDefaultValue = (filter.args[0] as any).content;
            break;
          }
        }

        // Second pass: collect other transformers
        for (const filter of filters) {
          if (
            filter.kind === TokenKind.Filter &&
            filter.name !== 'default' &&
            TRANSFORMERS.some((t) => t.value === filter.name)
          ) {
            parsedTransformers.push({
              value: filter.name,
              ...(filter.args.length > 0
                ? {
                    params: filter.args.map((arg) => {
                      return (arg as any).content;
                    }),
                  }
                : {}),
            });
          }
        }
      }

      return {
        parsedName,
        parsedDefaultValue,
        parsedTransformers,
        originalVariable: variable,
      };
    } catch (error) {
      console.error('Error parsing variable:', error);
      return { parsedName: '', parsedDefaultValue: '', parsedTransformers: [], originalVariable: variable };
    }
  }, [variable]);
}
