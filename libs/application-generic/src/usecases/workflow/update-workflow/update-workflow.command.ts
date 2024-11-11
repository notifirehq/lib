import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import {
  IPreferenceChannels,
  NotificationTemplateCustomData,
  WorkflowTypeEnum,
} from '@novu/shared';

import { JsonSchema } from '@novu/framework/internal';
import { EnvironmentWithUserCommand } from '../../../commands';
import { NotificationStep } from '../..';

export class UpdateWorkflowCommand extends EnvironmentWithUserCommand {
  @IsDefined()
  @IsMongoId()
  id: string;

  @IsArray()
  @IsOptional()
  @ArrayMaxSize(8)
  tags?: string[];

  @IsString()
  @IsOptional()
  name?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  workflowId?: string;

  @IsBoolean()
  @IsOptional()
  critical?: boolean;

  @IsOptional()
  preferenceSettings?: IPreferenceChannels;

  @IsOptional()
  @IsMongoId({
    message: 'Bad group id name',
  })
  notificationGroupId?: string;

  @IsArray()
  @ValidateNested()
  @IsOptional()
  steps?: NotificationStep[];

  @ValidateNested()
  @IsOptional()
  replyCallback?: {
    active: boolean;
    url: string;
  };

  @IsOptional()
  data?: NotificationTemplateCustomData;

  @IsOptional()
  inputs?: IStepControl;

  @IsOptional()
  controls?: IStepControl;

  @IsOptional()
  rawData?: any;

  @IsOptional()
  payloadSchema?: JsonSchema;

  @IsEnum(WorkflowTypeEnum)
  @IsDefined()
  type: WorkflowTypeEnum;
}

export interface IStepControl {
  schema: JsonSchema;
}
