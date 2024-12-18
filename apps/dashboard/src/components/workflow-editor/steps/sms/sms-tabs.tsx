import { StepEditorProps } from '@/components/workflow-editor/steps/configure-step-template-form';
import { CustomStepControls } from '@/components/workflow-editor/steps/controls/custom-step-controls';
import { SmsEditor } from '@/components/workflow-editor/steps/sms/sms-editor';
import { SmsEditorPreview } from '@/components/workflow-editor/steps/sms/sms-editor-preview';
import { TemplateTabs } from '@/components/workflow-editor/steps/template-tabs';
import { WorkflowOriginEnum } from '@novu/shared';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export const SmsTabs = (props: StepEditorProps) => {
  const { workflow, step } = props;
  const { dataSchema, uiSchema } = step.controls;
  const form = useFormContext();
  const [tabsValue, setTabsValue] = useState('editor');

  const isNovuCloud = workflow.origin === WorkflowOriginEnum.NOVU_CLOUD && uiSchema;
  const isExternal = workflow.origin === WorkflowOriginEnum.EXTERNAL;

  const editorContent = (
    <>
      {isNovuCloud && <SmsEditor uiSchema={uiSchema} />}
      {isExternal && <CustomStepControls dataSchema={dataSchema} origin={workflow.origin} />}
    </>
  );

  const previewContent = <SmsEditorPreview workflow={workflow} step={step} formValues={form.getValues()} />;

  return (
    <TemplateTabs
      editorContent={editorContent}
      previewContent={previewContent}
      tabsValue={tabsValue}
      onTabChange={setTabsValue}
    />
  );
};
