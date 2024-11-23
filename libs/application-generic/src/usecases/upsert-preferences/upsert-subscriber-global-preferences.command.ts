import { IsMongoId, IsNotEmpty } from 'class-validator';
import { UpsertPreferencesPartialBaseCommand } from './upsert-preferences.command';

export class UpsertSubscriberGlobalPreferencesCommand extends UpsertPreferencesPartialBaseCommand {
  @IsNotEmpty()
  @IsMongoId()
  readonly _subscriberId: string;
}
