import { useState, useEffect, useMemo } from 'react';
import { RiAlertFill, RiEdit2Line, RiPencilRuler2Line } from 'react-icons/ri';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useBlocker, useNavigate, useParams } from 'react-router-dom';
import { FieldValues, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type WorkflowResponseDto, type StepDataDto, type StepUpdateDto } from '@novu/shared';

import { Form } from '@/components/primitives/form/form';
import { Notification5Fill } from '@/components/icons';
import { Button, buttonVariants } from '@/components/primitives/button';
import { Separator } from '@/components/primitives/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/primitives/tabs';
import { InAppEditorPreview } from '@/components/workflow-editor/steps/in-app/in-app-editor-preview';
import { useUpdateWorkflow } from '@/hooks/use-update-workflow';
import { buildDynamicZodSchema, buildDefaultValues } from '@/utils/schema';
import { InAppEditor } from '@/components/workflow-editor/steps/in-app/in-app-editor';
import { showToast } from '@/components/primitives/sonner-helpers';
import { ToastIcon } from '@/components/primitives/sonner';
import { usePreviewStep } from '@/hooks/use-preview-step';
import useDebouncedEffect from '@/hooks/use-debounced-effect';
import { CustomStepControls } from '../controls/custom-step-controls';
import { useStep } from '../use-step';
import { flattenIssues } from '../../step-utils';
import { useWorkflowEditorContext } from '../../hooks';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/primitives/alert-dialog';

const tabsContentClassName = 'h-full w-full px-3 py-3.5 overflow-y-auto';

export const InAppTabs = ({ workflow, step }: { workflow: WorkflowResponseDto; step: StepDataDto }) => {
  const { stepSlug = '', workflowSlug = '' } = useParams<{ workflowSlug: string; stepSlug: string }>();
  const { resetWorkflowForm } = useWorkflowEditorContext();
  const { step: workflowStep } = useStep();
  const { dataSchema, uiSchema } = step.controls;
  const navigate = useNavigate();
  const schema = buildDynamicZodSchema(dataSchema ?? {});
  const form = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    resetOptions: { keepDirtyValues: true },
    defaultValues: buildDefaultValues(uiSchema ?? {}),
    values: step.controls.values,
    shouldFocusError: true,
  });
  const [editorValue, setEditorValue] = useState('{}');
  const { reset, formState, setError } = form;

  const controlErrors = useMemo(() => flattenIssues(workflowStep?.issues?.controls), [workflowStep]);

  useEffect(() => {
    if (Object.keys(controlErrors).length) {
      Object.entries(controlErrors).forEach(([key, value]) => {
        setError(key as any, { message: value }, { shouldFocus: true });
      });
    }
  }, [controlErrors, setError]);

  const { previewStep, data: previewData } = usePreviewStep();
  const { isPending, updateWorkflow } = useUpdateWorkflow({
    onSuccess: (data) => {
      resetWorkflowForm(data);
      showToast({
        children: () => (
          <>
            <ToastIcon variant="success" />
            <span className="text-sm">Saved</span>
          </>
        ),
        options: {
          position: 'bottom-right',
          classNames: {
            toast: 'ml-10 mb-4',
          },
        },
      });
    },
    onError: () => {
      showToast({
        children: () => (
          <>
            <ToastIcon variant="error" />
            <span className="text-sm">Failed to save</span>
          </>
        ),
        options: {
          position: 'bottom-right',
          classNames: {
            toast: 'ml-10 mb-4',
          },
        },
      });
    },
  });

  const onSubmit = async (data: any) => {
    await updateWorkflow({
      id: workflow._id,
      workflow: {
        ...workflow,
        steps: workflow.steps.map((step) =>
          step.slug === stepSlug ? ({ ...step, controlValues: { ...data }, issues: undefined } as StepUpdateDto) : step
        ),
      },
    });
    reset({ ...data });
  };

  const preview = async (props: {
    controlValues: Record<string, unknown>;
    previewPayload: Record<string, unknown>;
  }) => {
    const res = await previewStep({
      workflowSlug,
      stepSlug,
      data: { controlValues: props.controlValues, previewPayload: props.previewPayload },
    });
    setEditorValue(JSON.stringify(res.previewPayloadExample, null, 2));
  };

  const formValues = useWatch(form);
  useDebouncedEffect(
    () => {
      preview({
        controlValues: form.getValues() as Record<string, unknown>,
        previewPayload: JSON.parse(editorValue),
      });
    },
    2000,
    [formValues]
  );

  const blocker = useBlocker(formState.isDirty || isPending);

  return (
    <>
      <Form {...form}>
        <form
          id="save-step"
          className="flex h-full flex-col"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit(onSubmit)(event);
          }}
        >
          <Tabs defaultValue="editor" className="flex h-full flex-1 flex-col">
            <header className="flex flex-row items-center gap-3 px-3 py-1.5">
              <div className="mr-auto flex items-center gap-2.5 text-sm font-medium">
                <RiEdit2Line className="size-4" />
                <span>Configure Template</span>
              </div>
              <TabsList className="w-min">
                <TabsTrigger value="editor" className="gap-1.5">
                  <RiPencilRuler2Line className="size-5 p-0.5" />
                  <span>Editor</span>
                </TabsTrigger>
                <TabsTrigger value="preview" className="gap-1.5">
                  <Notification5Fill className="size-5 p-0.5" />
                  <span>Preview</span>
                </TabsTrigger>
              </TabsList>

              <Button
                variant="ghost"
                size="xs"
                className="size-6"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate('../', { relative: 'path' });
                }}
              >
                <Cross2Icon className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </header>
            <Separator />
            <TabsContent value="editor" className={tabsContentClassName}>
              <InAppEditor uiSchema={uiSchema} />
              <CustomStepControls dataSchema={dataSchema} origin={workflow.origin} />
            </TabsContent>
            <TabsContent value="preview" className={tabsContentClassName}>
              <InAppEditorPreview
                value={editorValue}
                onChange={setEditorValue}
                previewData={previewData}
                applyPreview={() => {
                  previewStep({
                    stepSlug,
                    workflowSlug,
                    data: { controlValues: form.getValues() as FieldValues, previewPayload: JSON.parse(editorValue) },
                  });
                }}
              />
            </TabsContent>
            <Separator />
            <footer className="flex justify-end px-3 py-3.5">
              <Button
                className="ml-auto"
                variant="default"
                type="submit"
                form="save-step"
                disabled={!formState.isDirty}
              >
                Save step
              </Button>
            </footer>
          </Tabs>
        </form>
      </Form>
      <AlertDialog open={blocker.state === 'blocked'}>
        <AlertDialogContent>
          <AlertDialogHeader className="flex flex-row items-start gap-4">
            <div className="bg-warning/10 rounded-lg p-3">
              <RiAlertFill className="text-warning size-6" />
            </div>
            <div className="space-y-1">
              <AlertDialogTitle>You might lose your progress</AlertDialogTitle>
              <AlertDialogDescription>
                This editor form has some unsaved changes. Save progress before you leave.
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>

          <Separator />

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => blocker.reset?.()}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => blocker.proceed?.()}
              className={buttonVariants({ variant: 'destructive' })}
            >
              Proceed anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
