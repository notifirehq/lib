import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsObject,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

import {
  JSONSchemaDto,
  NotificationTemplateCustomData,
  WorkflowStatusEnum,
  WorkflowTypeEnum,
} from '@novu/shared';

import { Type } from 'class-transformer';
import { EnvironmentWithUserCommand } from '../../../commands';
import { PreferencesRequired } from '../../upsert-preferences';
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_NAME_LENGTH,
  MAX_TAG_LENGTH,
} from './upsert-validation-constants';
import {
  ContentIssue,
  IStepControl,
  NotificationStep,
} from '../../create-workflow/create-workflow.command';

export class UpdateWorkflowCommand extends EnvironmentWithUserCommand {
  @IsDefined()
  @IsMongoId()
  id: string;

  @IsOptional()
  @IsString()
  @Length(1, MAX_NAME_LENGTH)
  name: string;

  @IsString()
  @IsOptional()
  @Length(0, MAX_DESCRIPTION_LENGTH)
  description?: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @Length(1, MAX_TAG_LENGTH, { each: true })
  tags?: string[];

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsArray()
  @ValidateNested()
  @IsOptional()
  steps?: NotificationStep[];

  @IsOptional()
  @IsMongoId()
  notificationGroupId?: string;

  @IsObject()
  @ValidateNested()
  @Type(() => PreferencesRequired)
  @ValidateIf((object, value) => value !== null)
  @IsOptional()
  userPreferences?: PreferencesRequired | null;

  @IsBoolean()
  @IsOptional()
  critical?: boolean;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => PreferencesRequired)
  defaultPreferences: PreferencesRequired;

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
  rawData?: Record<string, unknown>;

  @IsOptional()
  payloadSchema?: JSONSchemaDto;

  @IsEnum(WorkflowTypeEnum)
  @IsDefined()
  type: WorkflowTypeEnum;

  @IsString()
  @IsOptional()
  workflowId?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ContentIssue)
  issues?: Record<string, ContentIssue[]>;

  @IsEnum(WorkflowStatusEnum)
  @IsOptional()
  status?: WorkflowStatusEnum;
}
