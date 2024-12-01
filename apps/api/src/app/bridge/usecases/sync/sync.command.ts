import { IsDefined, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { EnvironmentWithUserCommand, IStepControl } from '@novu/application-generic';
import type { IPreferenceChannels, CustomDataType, StepType, JSONSchemaDto } from '@novu/shared';

interface IStepOutput {
  schema: JSONSchemaDto;
}

interface IWorkflowDefineStep {
  stepId: string;

  type: StepType;

  controls: IStepControl;

  outputs: IStepOutput;

  description: string;

  preferenceSettings?: IPreferenceChannels;

  data?: CustomDataType;
}

interface IStepDefineOptions {
  version: `${number}.${number}.${number}`;
  failOnErrorEnabled: boolean;
  skip: boolean;
  active?: boolean;
}

class WorkflowDefineStep implements IWorkflowDefineStep {
  description: string;
  preferenceSettings?: any;
  data?: any;
  @IsString()
  stepId: string;

  @IsString()
  type: StepType;

  controls: IStepControl;

  outputs: IStepOutput;

  code: string;
}

export interface IWorkflowDefine {
  workflowId: string;

  code: string;

  steps: IWorkflowDefineStep[];

  controls?: IStepControl;
}

export class WorkflowDefine implements IWorkflowDefine {
  @IsString()
  workflowId: string;

  code: string;

  @ValidateNested({ each: true })
  @Type(() => WorkflowDefineStep)
  steps: IWorkflowDefineStep[];

  controls?: IStepControl;
}

export interface ICreateBridges {
  workflows?: IWorkflowDefine[];
}

export class SyncCommand extends EnvironmentWithUserCommand implements ICreateBridges {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => WorkflowDefine)
  workflows?: WorkflowDefine[];

  @IsString()
  @IsDefined()
  bridgeUrl: string;

  @IsOptional()
  @IsString()
  source?: string;
}
