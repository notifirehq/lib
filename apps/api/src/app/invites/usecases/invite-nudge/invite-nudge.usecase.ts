import { Injectable, Scope } from '@nestjs/common';
import { MemberRepository } from '@novu/dal';
import { GetFeatureFlag, GetFeatureFlagCommand, createHash } from '@novu/application-generic';
import { FeatureFlagsKeysEnum } from '@novu/shared';
import axios from 'axios';

import { InviteNudgeWebhookCommand } from './invite-nudge.command';

const axiosInstance = axios.create();

@Injectable({
  scope: Scope.REQUEST,
})
export class InviteNudgeWebhook {
  constructor(private memberRepository: MemberRepository, private getFeatureFlag: GetFeatureFlag) {}

  async execute(command: InviteNudgeWebhookCommand) {
    const isEnabled = await this.getFeatureFlag.execute(
      GetFeatureFlagCommand.create({
        key: FeatureFlagsKeysEnum.IS_TEAM_MEMBER_INVITE_NUDGE_ENABLED,
        organizationId: command.subscriber._organizationId,
        userId: 'system',
        environmentId: 'system',
      })
    );

    if (isEnabled && process.env.NOVU_API_KEY) {
      const hmacHash = createHash(process.env.NOVU_API_KEY, command.subscriber._environmentId);
      const hmacHashFromWebhook = command.hmacHeader;

      if (hmacHash !== hmacHashFromWebhook) {
        throw new Error('Unauthorized request');
      }

      const membersCount = await this.memberRepository.count({
        _organizationId: command.subscriber._organizationId,
      });

      if (membersCount === 1) {
        await axiosInstance.post(
          `https://api.hubapi.com/contacts/v1/lists/${process.env.HUBSPOT_INVITE_NUDGE_EMAIL_USER_LIST_ID}/add`,
          {
            emails: [command.subscriber.email],
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.HUBSPOT_PRIVATE_APP_ACCESS_TOKEN}`,
            },
          }
        );
      }
    }

    return { send: false };
  }
}
