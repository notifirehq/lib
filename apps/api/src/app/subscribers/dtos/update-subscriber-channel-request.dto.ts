import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { ChatProviderIdEnum, ISubscriberChannel, PushProviderIdEnum } from '@novu/shared';

import { ChannelCredentials } from '../../shared/dtos/subscriber-channel';

export function getEnumValues<T>(enumObj: T): Array<T[keyof T]> {
  return Object.values(enumObj || {}) as Array<T[keyof T]>;
}
export class UpdateSubscriberChannelRequestDto implements ISubscriberChannel {
  @ApiProperty({
    enum: [...getEnumValues(ChatProviderIdEnum), ...getEnumValues(PushProviderIdEnum)],
    description: 'The provider identifier for the credentials',
  })
  @IsEnum(
    { ...ChatProviderIdEnum, ...PushProviderIdEnum },
    {
      message: 'providerId must be a valid provider ID',
    }
  )
  @IsDefined()
  providerId: ChatProviderIdEnum | PushProviderIdEnum;

  @ApiProperty({
    type: String,
    description: 'The integration identifier',
  })
  @IsString()
  @IsOptional()
  integrationIdentifier?: string;

  @ApiProperty({
    description: 'Credentials payload for the specified provider',
  })
  @IsDefined()
  @IsObject()
  credentials: ChannelCredentials;
}
