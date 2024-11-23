import { IsDefined, IsOptional } from 'class-validator';
import {
  CodeResult,
  DiscoverOutput,
  Event,
  ExecuteOutput,
  GetActionEnum,
  HealthCheck,
  HttpQueryKeysEnum,
  PostActionEnum,
} from '@novu/framework/internal';
import { WorkflowOriginEnum } from '@novu/shared';
import { EnvironmentLevelCommand } from '../../commands';

export type BridgeError = {
  url: string;
  code: string;
  message: string;
  statusCode: number;
  data?: unknown;
  cause?: unknown;
};

export type ProcessError = (response: BridgeError) => Promise<void>;

export class ExecuteBridgeRequestCommand extends EnvironmentLevelCommand {
  @IsOptional()
  event?: Omit<Event, `${HttpQueryKeysEnum}`>;

  @IsOptional()
  searchParams?: Partial<Record<HttpQueryKeysEnum, string>>;

  @IsOptional()
  processError?: ProcessError;

  @IsDefined()
  action: PostActionEnum | GetActionEnum;

  @IsOptional()
  retriesLimit?: number;

  @IsDefined()
  workflowOrigin: WorkflowOriginEnum;

  @IsOptional()
  statelessBridgeUrl?: string;
}

// will generate the output type based on the action
export type ExecuteBridgeRequestDto<T extends PostActionEnum | GetActionEnum> =
  T extends GetActionEnum.DISCOVER
    ? DiscoverOutput
    : T extends GetActionEnum.HEALTH_CHECK
      ? HealthCheck
      : T extends GetActionEnum.CODE
        ? CodeResult
        : T extends PostActionEnum.EXECUTE
          ? ExecuteOutput
          : T extends PostActionEnum.PREVIEW
            ? ExecuteOutput
            : never;
