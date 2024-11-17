import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsObject,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

import {
  BuilderFieldType,
  BuilderGroupValues,
  ChannelCTATypeEnum,
  FilterParts,
  IMessageAction,
  INotificationGroup,
  IStepVariant,
  StepIssuesDto,
  StepIssue as StepIssueDto,
  ContentIssue as ContentIssueDto,
  IWorkflowStepMetadata,
  JSONSchemaDto,
  NotificationTemplateCustomData,
  WorkflowOriginEnum,
  WorkflowTypeEnum,
  StepIssueEnum,
  StepContentIssueEnum,
  StepCreateAndUpdateKeys,
  WorkflowStatusEnum,
} from '@novu/shared';

import { Type } from 'class-transformer';
import { EnvironmentWithUserCommand } from '../../commands';
import { PreferencesRequired } from '../upsert-preferences';

export class CreateWorkflowCommand extends EnvironmentWithUserCommand {
  @IsMongoId()
  @IsDefined()
  notificationGroupId?: string;

  @IsOptional()
  notificationGroup?: INotificationGroup;

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsDefined()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDefined()
  @IsArray()
  @ValidateNested()
  steps: NotificationStep[];

  @IsBoolean()
  active: boolean;

  @IsBoolean()
  @IsOptional()
  draft?: boolean;

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

  @IsOptional()
  blueprintId?: string;

  @IsOptional()
  @IsString()
  __source?: string;

  @IsOptional()
  data?: NotificationTemplateCustomData;

  @IsOptional()
  inputs?: {
    schema: JSONSchemaDto;
  };
  @IsOptional()
  controls?: {
    schema: JSONSchemaDto;
  };

  @IsOptional()
  rawData?: Record<string, unknown>;

  @IsOptional()
  payloadSchema?: JSONSchemaDto;

  @IsEnum(WorkflowTypeEnum)
  @IsDefined()
  type: WorkflowTypeEnum;

  origin: WorkflowOriginEnum;

  /**
   * Optional identifier for the workflow trigger.
   * This allows overriding the default trigger identifier generation strategy in the use case.
   * If provided, the use case will use this value instead of generating one.
   * If not provided, the use case will generate a trigger identifier based on its internal logic.
   */
  @IsOptional()
  @IsString()
  triggerIdentifier?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ContentIssue)
  issues?: Record<string, ContentIssue[]>;

  @IsEnum(WorkflowStatusEnum)
  @IsOptional()
  status?: WorkflowStatusEnum;
}

export class ChannelCTACommand {
  @IsEnum(ChannelCTATypeEnum)
  type: ChannelCTATypeEnum;

  @ValidateNested()
  data: {
    url: string;
  };

  @IsOptional()
  @IsArray()
  @ValidateNested()
  action?: IMessageAction[];
}

export class ContentIssue implements ContentIssueDto {
  @IsOptional()
  @IsString()
  variableName?: string;

  @IsString()
  message: string;

  @IsEnum(StepContentIssueEnum)
  issueType: StepContentIssueEnum;
}

export class StepIssue implements StepIssueDto {
  @IsEnum(StepIssueEnum)
  issueType: StepIssueEnum;

  @IsOptional()
  @IsString()
  variableName?: string;

  @IsString()
  message: string;
}

export class StepIssues implements StepIssuesDto {
  @IsOptional()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => StepIssue)
  body?: Record<StepCreateAndUpdateKeys, StepIssue>;

  @IsOptional()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => ContentIssue)
  controls?: Record<string, ContentIssue[]>;
}

export class NotificationStepVariantCommand implements IStepVariant {
  @IsString()
  @IsOptional()
  _templateId?: string;

  @ValidateNested()
  @IsOptional()
  template?: any;

  @IsOptional()
  uuid?: string;

  @IsOptional()
  name?: string;

  @IsBoolean()
  active?: boolean;

  @IsBoolean()
  shouldStopOnFail?: boolean;

  @ValidateNested()
  @IsOptional()
  replyCallback?: {
    active: boolean;
    url: string;
  };

  @IsOptional()
  @IsArray()
  @ValidateNested()
  filters?: MessageFilter[];

  @IsMongoId()
  @IsOptional()
  _id?: string;

  @IsOptional()
  metadata?: IWorkflowStepMetadata;

  @IsOptional()
  controls?: {
    schema: JSONSchemaDto;
  };

  @IsOptional()
  output?: {
    schema: JSONSchemaDto;
  };

  @IsOptional()
  stepId?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => StepIssues)
  issues?: StepIssues;
}

export class NotificationStep extends NotificationStepVariantCommand {
  @IsOptional()
  @IsArray()
  @ValidateNested()
  variants?: NotificationStepVariantCommand[];
}

export class MessageFilter {
  isNegated?: boolean;

  @IsString()
  type?: BuilderFieldType;

  @IsString()
  value: BuilderGroupValues;

  @IsArray()
  children: FilterParts[];
}
