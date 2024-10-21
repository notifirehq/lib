import { PreferencesRequestDto, StepCreateDto, StepUpdateDto, WorkflowCommonsFields } from './workflow-commons-fields';

export type UpdateWorkflowDto = WorkflowCommonsFields & {
  updatedAt: string;

  steps: (StepCreateDto | StepUpdateDto)[];

  preferences: PreferencesRequestDto;
};
