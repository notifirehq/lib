import { BadRequestException, Injectable } from '@nestjs/common';
import { PreferencesEntity, PreferencesRepository } from '@novu/dal';
import {
  buildWorkflowPreferences,
  IPreferenceChannels,
  PreferencesTypeEnum,
  WorkflowPreferences,
  WorkflowPreferencesPartial,
} from '@novu/shared';
import { GetPreferencesCommand } from './get-preferences.command';
import { GetPreferencesResponseDto } from './get-preferences.dto';
import { Instrument, InstrumentUsecase } from '../../instrumentation';
import { MergePreferences } from '../merge-preferences/merge-preferences.usecase';
import { MergePreferencesCommand } from '../merge-preferences/merge-preferences.command';

export type PreferenceSet = {
  workflowResourcePreference?: PreferencesEntity & {
    preferences: WorkflowPreferences;
  };
  workflowUserPreference?: PreferencesEntity & {
    preferences: WorkflowPreferences;
  };
  subscriberGlobalPreference?: PreferencesEntity & {
    preferences: WorkflowPreferencesPartial;
  };
  subscriberWorkflowPreference?: PreferencesEntity & {
    preferences: WorkflowPreferencesPartial;
  };
};

class PreferencesNotFoundException extends BadRequestException {
  constructor(featureFlagCommand: GetPreferencesCommand) {
    super({ message: 'Preferences not found', ...featureFlagCommand });
  }
}

@Injectable()
export class GetPreferences {
  constructor(private preferencesRepository: PreferencesRepository) {}

  @InstrumentUsecase()
  async execute(
    command: GetPreferencesCommand,
  ): Promise<GetPreferencesResponseDto> {
    const items = await this.getPreferencesFromDb(command);

    const mergedPreferences = MergePreferences.execute(
      MergePreferencesCommand.create(items),
    );

    if (!mergedPreferences.preferences) {
      throw new PreferencesNotFoundException(command);
    }

    return mergedPreferences;
  }

  /** Get only simple, channel-level enablement flags */
  public async getPreferenceChannels(command: {
    environmentId: string;
    organizationId: string;
    subscriberId: string;
    templateId?: string;
  }): Promise<IPreferenceChannels | undefined> {
    const result = await this.safeExecute(command);

    if (!result) {
      return undefined;
    }

    return GetPreferences.mapWorkflowPreferencesToChannelPreferences(
      result.preferences,
    );
  }

  public async safeExecute(
    command: GetPreferencesCommand,
  ): Promise<GetPreferencesResponseDto> {
    try {
      return await this.execute(
        GetPreferencesCommand.create({
          environmentId: command.environmentId,
          organizationId: command.organizationId,
          subscriberId: command.subscriberId,
          templateId: command.templateId,
        }),
      );
    } catch (e) {
      // If we cant find preferences lets return undefined instead of throwing it up to caller to make it easier for caller to handle.
      if ((e as Error).name === PreferencesNotFoundException.name) {
        return undefined;
      }
      throw e;
    }
  }

  /** Transform WorkflowPreferences into IPreferenceChannels */
  public static mapWorkflowPreferencesToChannelPreferences(
    workflowPreferences: WorkflowPreferencesPartial,
  ): IPreferenceChannels {
    const builtPreferences = buildWorkflowPreferences(workflowPreferences);

    const mappedPreferences = Object.entries(
      builtPreferences.channels ?? {},
    ).reduce(
      (acc, [channel, preference]) => ({
        ...acc,
        [channel]: preference.enabled,
      }),
      {} as IPreferenceChannels,
    );

    return mappedPreferences;
  }

  private async getPreferencesFromDb(
    command: GetPreferencesCommand,
  ): Promise<PreferenceSet> {
    const [
      workflowResourcePreference,
      workflowUserPreference,
      subscriberWorkflowPreference,
      subscriberGlobalPreference,
    ] = await Promise.all([
      this.getWorkflowResourcePreference(
        command.templateId,
        command.environmentId,
      ),
      this.getWorkflowUserPreference(command.templateId, command.environmentId),
      this.getSubscriberWorkflowPreference(
        command.subscriberId,
        command.templateId,
        command.environmentId,
      ),
      this.getSubscriberGlobalPreference(
        command.subscriberId,
        command.environmentId,
      ),
    ]);

    return {
      ...(workflowResourcePreference ? { workflowResourcePreference } : {}),
      ...(workflowUserPreference ? { workflowUserPreference } : {}),
      ...(subscriberWorkflowPreference ? { subscriberWorkflowPreference } : {}),
      ...(subscriberGlobalPreference ? { subscriberGlobalPreference } : {}),
    };
  }

  @Instrument()
  private async getWorkflowResourcePreference(
    workflowId: string,
    environmentId: string,
  ): Promise<PreferenceSet['workflowResourcePreference']> {
    return (await this.preferencesRepository.findOne({
      _templateId: workflowId,
      _environmentId: environmentId,
      type: PreferencesTypeEnum.WORKFLOW_RESOURCE,
    })) as PreferenceSet['workflowResourcePreference'];
  }

  @Instrument()
  private async getWorkflowUserPreference(
    workflowId: string,
    environmentId: string,
  ): Promise<PreferenceSet['workflowUserPreference']> {
    return (await this.preferencesRepository.findOne({
      _templateId: workflowId,
      _environmentId: environmentId,
      type: PreferencesTypeEnum.USER_WORKFLOW,
    })) as PreferenceSet['workflowUserPreference'];
  }

  @Instrument()
  private async getSubscriberWorkflowPreference(
    subscriberId: string,
    workflowId: string,
    environmentId: string,
  ): Promise<PreferenceSet['subscriberWorkflowPreference']> {
    return (await this.preferencesRepository.findOne({
      _subscriberId: subscriberId,
      _templateId: workflowId,
      _environmentId: environmentId,
      type: PreferencesTypeEnum.SUBSCRIBER_WORKFLOW,
    })) as PreferenceSet['subscriberWorkflowPreference'];
  }

  @Instrument()
  private async getSubscriberGlobalPreference(
    subscriberId: string,
    environmentId: string,
  ): Promise<PreferenceSet['subscriberGlobalPreference']> {
    return (await this.preferencesRepository.findOne({
      _subscriberId: subscriberId,
      _environmentId: environmentId,
      type: PreferencesTypeEnum.SUBSCRIBER_GLOBAL,
    })) as PreferenceSet['subscriberGlobalPreference'];
  }
}
