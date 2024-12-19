import { CSSProperties, useEffect, useRef, useState } from 'react';
import { RiChat1Fill } from 'react-icons/ri';
import { type StepDataDto, type WorkflowResponseDto } from '@novu/shared';

import { Code2 } from '@/components/icons/code-2';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/primitives/accordion';
import { Button } from '@/components/primitives/button';
import { Editor } from '@/components/primitives/editor';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import { useEditorPreview } from '@/components/workflow-editor/steps/use-editor-preview';
import { ChatPreview } from '@/components/workflow-editor/steps/chat/chat-preview';
import { TabsSection } from '@/components/workflow-editor/steps/tabs-section';
import { InlineToast } from '@/components/primitives/inline-toast';

const getInitialAccordionValue = (value: string) => {
  try {
    return Object.keys(JSON.parse(value)).length > 0 ? 'payload' : undefined;
  } catch (e) {
    return undefined;
  }
};

type ChatEditorPreviewProps = {
  workflow: WorkflowResponseDto;
  step: StepDataDto;
  formValues: Record<string, unknown>;
};

const extensions = [loadLanguage('json')?.extension ?? []];

export const ChatEditorPreview = ({ workflow, step, formValues }: ChatEditorPreviewProps) => {
  const workflowSlug = workflow.workflowId;
  const stepSlug = step.stepId;
  const { editorValue, setEditorValue, previewStep, previewData, isPreviewPending } = useEditorPreview({
    workflowSlug,
    stepSlug,
    controlValues: formValues,
  });
  const [accordionValue, setAccordionValue] = useState<string | undefined>(getInitialAccordionValue(editorValue));
  const [payloadError, setPayloadError] = useState('');
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAccordionValue(getInitialAccordionValue(editorValue));
  }, [editorValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (contentRef.current) {
        const rect = contentRef.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [editorValue]);

  return (
    <TabsSection>
      <div className="relative flex flex-col gap-3">
        <div className="flex items-center gap-2.5 text-sm font-medium">
          <RiChat1Fill className="size-3" />
          Chat template editor
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <ChatPreview isPreviewPending={isPreviewPending} previewData={previewData} />
          <InlineToast
            description="This preview shows how your message will appear. Actual rendering may vary by provider."
            className="w-full px-3"
          />
        </div>
        <Accordion type="single" collapsible value={accordionValue} onValueChange={setAccordionValue}>
          <AccordionItem value="payload">
            <AccordionTrigger>
              <div className="flex items-center gap-1">
                <Code2 className="size-5" />
                Configure preview
              </div>
            </AccordionTrigger>
            <AccordionContent
              ref={contentRef}
              className="flex flex-col gap-2"
              style={{ '--radix-collapsible-content-height': `${height}px` } as CSSProperties}
            >
              <Editor
                value={editorValue}
                onChange={setEditorValue}
                lang="json"
                extensions={extensions}
                className="border-neutral-alpha-200 bg-background text-foreground-600 mx-0 mt-0 rounded-lg border border-dashed p-3"
              />
              {payloadError && <p className="text-destructive text-xs">{payloadError}</p>}
              <Button
                size="xs"
                type="button"
                variant="outline"
                className="self-end"
                onClick={() => {
                  try {
                    previewStep();
                    setPayloadError('');
                  } catch (e) {
                    setPayloadError(String(e));
                  }
                }}
              >
                Apply
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </TabsSection>
  );
};
