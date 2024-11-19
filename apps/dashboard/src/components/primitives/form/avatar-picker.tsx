import { EditorView } from '@uiw/react-codemirror';
import { forwardRef, useMemo, useState } from 'react';
import { RiEdit2Line, RiErrorWarningFill, RiImageEditFill } from 'react-icons/ri';

import { Avatar, AvatarImage } from '@/components/primitives/avatar';
import { Button } from '@/components/primitives/button';
import { FormMessage } from '@/components/primitives/form/form';
import { InputField } from '@/components/primitives/input';
import { Label } from '@/components/primitives/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/primitives/popover';
import { Separator } from '@/components/primitives/separator';
import TextSeparator from '@/components/primitives/text-separator';
import { useStepEditorContext } from '@/components/workflow-editor/steps/hooks';
import { completions } from '@/utils/liquid-autocomplete';
import { parseStepVariablesToLiquidVariables } from '@/utils/parseStepVariablesToLiquidVariables';
import { autocompletion } from '@codemirror/autocomplete';
import { Editor } from '../editor';
import { useFormField } from './form-context';

const predefinedAvatars = [
  `${window.location.origin}/images/avatar.svg`,
  `${window.location.origin}/images/building.svg`,
  `${window.location.origin}/images/info.svg`,
  `${window.location.origin}/images/speaker.svg`,
  `${window.location.origin}/images/confetti.svg`,
  `${window.location.origin}/images/novu.svg`,
  `${window.location.origin}/images/info-2.svg`,
  `${window.location.origin}/images/bell.svg`,
  `${window.location.origin}/images/error.svg`,
  `${window.location.origin}/images/warning.svg`,
  `${window.location.origin}/images/question.svg`,
  `${window.location.origin}/images/error-warning.svg`,
];

type AvatarPickerProps = {
  name: string;
  value: string;
  onChange?: (value: string) => void;
};

export const AvatarPicker = forwardRef<HTMLInputElement, AvatarPickerProps>(({ name, value, onChange }, ref) => {
  const { step } = useStepEditorContext();
  const variables = useMemo(() => (step ? parseStepVariablesToLiquidVariables(step.variables) : []), [step]);
  const [isOpen, setIsOpen] = useState(false);
  const { error } = useFormField();

  const handlePredefinedAvatarClick = (url: string) => {
    onChange?.(url);
    setIsOpen(false);
  };

  return (
    <div className="size-9 space-y-2">
      <Popover modal={true} open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="text-foreground-600 relative size-full overflow-hidden">
            {value ? (
              <Avatar className="p-px">
                <AvatarImage src={value as string} />
              </Avatar>
            ) : (
              <RiImageEditFill className="size-5" />
            )}
            {error && (
              <RiErrorWarningFill className="text-destructive outline-destructive absolute right-0 top-0 size-3 -translate-y-1/2 translate-x-1/2 rounded-full outline outline-1 outline-offset-1" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium leading-none">
                <RiEdit2Line className="size-4" /> Customize avatar
              </div>
              <Separator />
              <div className="space-y-1">
                <Label>Avatar URL</Label>
                <InputField className="px-1">
                  <Editor
                    fontFamily="inherit"
                    ref={ref}
                    placeholder="Enter avatar URL"
                    id={name}
                    extensions={[autocompletion({ override: [completions(variables)] }), EditorView.lineWrapping]}
                    value={`${value}`}
                    onChange={(newValue) => onChange?.(newValue)}
                  />
                </InputField>
                <FormMessage />
              </div>
            </div>
            <TextSeparator text="or" />
            <div className="grid grid-cols-6 gap-4">
              {predefinedAvatars.map((url, index) => (
                <Button key={index} variant="ghost" className="p-0" onClick={() => handlePredefinedAvatarClick(url)}>
                  <Avatar>
                    <AvatarImage src={url} />
                  </Avatar>
                </Button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
});

AvatarPicker.displayName = 'AvatarPicker';
