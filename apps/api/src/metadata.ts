/* eslint-disable */
export default async () => {
  const t = {
    ['./app/user/dtos/user-response.dto']: await import('./app/user/dtos/user-response.dto'),
    ['../../../libs/shared/dist/cjs/types/organization/index']: await import(
      '../../../libs/shared/dist/cjs/types/organization/index'
    ),
    ['../../../libs/shared/dist/cjs/types/analytics/index']: await import(
      '../../../libs/shared/dist/cjs/types/analytics/index'
    ),
    ['../../../libs/shared/dist/cjs/types/channel/index']: await import(
      '../../../libs/shared/dist/cjs/types/channel/index'
    ),
    ['./app/layouts/dtos/layout.dto']: await import('./app/layouts/dtos/layout.dto'),
    ['./app/environments/dtos/update-environment-request.dto']: await import(
      './app/environments/dtos/update-environment-request.dto'
    ),
    ['../../../libs/shared/dist/cjs/entities/change/change.interface']: await import(
      '../../../libs/shared/dist/cjs/entities/change/change.interface'
    ),
    ['./app/change/dtos/change-response.dto']: await import('./app/change/dtos/change-response.dto'),
    ['./app/integrations/dtos/credentials.dto']: await import('./app/integrations/dtos/credentials.dto'),
    ['./app/shared/dtos/step-filter']: await import('./app/shared/dtos/step-filter'),
    ['../../../libs/shared/dist/cjs/entities/organization/member.enum']: await import(
      '../../../libs/shared/dist/cjs/entities/organization/member.enum'
    ),
    ['../../../libs/dal/dist/repositories/organization/organization.entity']: await import(
      '../../../libs/dal/dist/repositories/organization/organization.entity'
    ),
    ['./app/organization/dtos/organization-response.dto']: await import(
      './app/organization/dtos/organization-response.dto'
    ),
    ['./app/organization/dtos/member-response.dto']: await import('./app/organization/dtos/member-response.dto'),
    ['../../../libs/shared/dist/cjs/entities/organization/member.interface']: await import(
      '../../../libs/shared/dist/cjs/entities/organization/member.interface'
    ),
    ['../../../libs/shared/dist/cjs/entities/notification-template/notification-template.interface']: await import(
      '../../../libs/shared/dist/cjs/entities/notification-template/notification-template.interface'
    ),
    ['./app/workflows/dto/workflow-response.dto']: await import('./app/workflows/dto/workflow-response.dto'),
    ['./app/shared/dtos/preference-channels']: await import('./app/shared/dtos/preference-channels'),
    ['./app/shared/dtos/notification-step']: await import('./app/shared/dtos/notification-step'),
    ['../../../libs/shared/dist/cjs/types/events/index']: await import(
      '../../../libs/shared/dist/cjs/types/events/index'
    ),
    ['./app/subscribers/dtos/create-subscriber-request.dto']: await import(
      './app/subscribers/dtos/create-subscriber-request.dto'
    ),
    ['./app/shared/dtos/subscriber-channel']: await import('./app/shared/dtos/subscriber-channel'),
    ['./app/subscribers/dtos/subscriber-response.dto']: await import('./app/subscribers/dtos/subscriber-response.dto'),
    ['./app/shared/dtos/channel-preference']: await import('./app/shared/dtos/channel-preference'),
    ['./app/events/dtos/trigger-event-request.dto']: await import('./app/events/dtos/trigger-event-request.dto'),
    ['../../../libs/shared/dist/cjs/types/message-template/index']: await import(
      '../../../libs/shared/dist/cjs/types/message-template/index'
    ),
    ['./app/widgets/dtos/message-response.dto']: await import('./app/widgets/dtos/message-response.dto'),
    ['./app/widgets/dtos/feeds-response.dto']: await import('./app/widgets/dtos/feeds-response.dto'),
    ['./app/widgets/dtos/update-subscriber-preference-response.dto']: await import(
      './app/widgets/dtos/update-subscriber-preference-response.dto'
    ),
    ['../../../libs/shared/dist/cjs/types/messages/index']: await import(
      '../../../libs/shared/dist/cjs/types/messages/index'
    ),
    ['../../../libs/shared/dist/cjs/entities/messages/messages.interface']: await import(
      '../../../libs/shared/dist/cjs/entities/messages/messages.interface'
    ),
    ['./app/topics/dtos/topic.dto']: await import('./app/topics/dtos/topic.dto'),
    ['../../../libs/dal/dist/repositories/notification-template/notification-template.entity']: await import(
      '../../../libs/dal/dist/repositories/notification-template/notification-template.entity'
    ),
    ['../../../libs/shared/dist/cjs/dto/message-template/message-template.dto']: await import(
      '../../../libs/shared/dist/cjs/dto/message-template/message-template.dto'
    ),
    ['../../../libs/shared/dist/cjs/entities/execution-details/execution-details.interface']: await import(
      '../../../libs/shared/dist/cjs/entities/execution-details/execution-details.interface'
    ),
    ['./app/notifications/dtos/activities-response.dto']: await import(
      './app/notifications/dtos/activities-response.dto'
    ),
    ['../../../libs/dal/dist/repositories/subscriber/subscriber.entity']: await import(
      '../../../libs/dal/dist/repositories/subscriber/subscriber.entity'
    ),
    ['./app/invites/dtos/bulk-invite-members.dto']: await import('./app/invites/dtos/bulk-invite-members.dto'),
    ['../../../libs/shared/dist/cjs/dto/workflows/workflow.dto']: await import(
      '../../../libs/shared/dist/cjs/dto/workflows/workflow.dto'
    ),
    ['./app/workflow-overrides/dto/shared']: await import('./app/workflow-overrides/dto/shared'),
    ['../../../libs/shared/dist/cjs/entities/messages/action.enum']: await import(
      '../../../libs/shared/dist/cjs/entities/messages/action.enum'
    ),
    ['./app/environments/dtos/environment-response.dto']: await import(
      './app/environments/dtos/environment-response.dto'
    ),
    ['./app/shared/dtos/api-key']: await import('./app/shared/dtos/api-key'),
    ['./app/notification-groups/dtos/notification-group-response.dto']: await import(
      './app/notification-groups/dtos/notification-group-response.dto'
    ),
    ['./app/notification-groups/dtos/delete-notification-group-response.dto']: await import(
      './app/notification-groups/dtos/delete-notification-group-response.dto'
    ),
    ['./app/layouts/dtos/create-layout.dto']: await import('./app/layouts/dtos/create-layout.dto'),
    ['./app/layouts/dtos/filter-layouts.dto']: await import('./app/layouts/dtos/filter-layouts.dto'),
    ['./app/layouts/dtos/get-layout.dto']: await import('./app/layouts/dtos/get-layout.dto'),
    ['./app/layouts/dtos/update-layout.dto']: await import('./app/layouts/dtos/update-layout.dto'),
    ['./app/integrations/dtos/integration-response.dto']: await import(
      './app/integrations/dtos/integration-response.dto'
    ),
    ['./app/integrations/dtos/get-channel-type-limit.sto']: await import(
      './app/integrations/dtos/get-channel-type-limit.sto'
    ),
    ['../../../libs/application-generic/build/main/usecases/create-execution-details/dtos/execution-details-response.dto']:
      await import(
        '../../../libs/application-generic/build/main/usecases/create-execution-details/dtos/execution-details-response.dto'
      ),
    ['./app/workflows/dto/workflows.response.dto']: await import('./app/workflows/dto/workflows.response.dto'),
    ['./app/workflows/dto/variables.response.dto']: await import('./app/workflows/dto/variables.response.dto'),
    ['./app/events/dtos/trigger-event-response.dto']: await import('./app/events/dtos/trigger-event-response.dto'),
    ['./app/widgets/dtos/session-initialize-response.dto']: await import(
      './app/widgets/dtos/session-initialize-response.dto'
    ),
    ['./app/widgets/dtos/unseen-count-response.dto']: await import('./app/widgets/dtos/unseen-count-response.dto'),
    ['../../../libs/dal/dist/repositories/message/message.entity']: await import(
      '../../../libs/dal/dist/repositories/message/message.entity'
    ),
    ['./app/widgets/dtos/organization-response.dto']: await import('./app/widgets/dtos/organization-response.dto'),
    ['./app/widgets/dtos/log-usage-response.dto']: await import('./app/widgets/dtos/log-usage-response.dto'),
    ['./app/subscribers/dtos/delete-subscriber-response.dto']: await import(
      './app/subscribers/dtos/delete-subscriber-response.dto'
    ),
    ['./app/subscribers/dtos/get-subscriber-preferences-response.dto']: await import(
      './app/subscribers/dtos/get-subscriber-preferences-response.dto'
    ),
    ['./app/topics/dtos/create-topic.dto']: await import('./app/topics/dtos/create-topic.dto'),
    ['./app/topics/dtos/topic-subscriber.dto']: await import('./app/topics/dtos/topic-subscriber.dto'),
    ['./app/topics/dtos/filter-topics.dto']: await import('./app/topics/dtos/filter-topics.dto'),
    ['./app/topics/dtos/get-topic.dto']: await import('./app/topics/dtos/get-topic.dto'),
    ['./app/topics/dtos/rename-topic.dto']: await import('./app/topics/dtos/rename-topic.dto'),
    ['./app/tenant/dtos/get-tenant-response.dto']: await import('./app/tenant/dtos/get-tenant-response.dto'),
    ['./app/tenant/dtos/create-tenant-response.dto']: await import('./app/tenant/dtos/create-tenant-response.dto'),
    ['./app/tenant/dtos/update-tenant-response.dto']: await import('./app/tenant/dtos/update-tenant-response.dto'),
    ['./app/notifications/dtos/activity-stats-response.dto']: await import(
      './app/notifications/dtos/activity-stats-response.dto'
    ),
    ['./app/notifications/dtos/activity-graph-states-response.dto']: await import(
      './app/notifications/dtos/activity-graph-states-response.dto'
    ),
    ['./app/storage/dtos/upload-url-response.dto']: await import('./app/storage/dtos/upload-url-response.dto'),
    ['./app/feeds/dto/feed-response.dto']: await import('./app/feeds/dto/feed-response.dto'),
    ['./app/messages/dtos/delete-message-response.dto']: await import(
      './app/messages/dtos/delete-message-response.dto'
    ),
    ['./app/partner-integrations/dtos/setup-vercel-integration-response.dto']: await import(
      './app/partner-integrations/dtos/setup-vercel-integration-response.dto'
    ),
    ['./app/inbound-parse/dtos/get-mx-record.dto']: await import('./app/inbound-parse/dtos/get-mx-record.dto'),
    ['./app/blueprint/dto/grouped-blueprint.response.dto']: await import(
      './app/blueprint/dto/grouped-blueprint.response.dto'
    ),
    ['./app/blueprint/dto/get-blueprint.response.dto']: await import('./app/blueprint/dto/get-blueprint.response.dto'),
    ['./app/workflow-overrides/dto/create-workflow-override-response.dto']: await import(
      './app/workflow-overrides/dto/create-workflow-override-response.dto'
    ),
    ['./app/workflow-overrides/dto/update-workflow-override-response.dto']: await import(
      './app/workflow-overrides/dto/update-workflow-override-response.dto'
    ),
    ['./app/workflow-overrides/dto/get-workflow-override-response.dto']: await import(
      './app/workflow-overrides/dto/get-workflow-override-response.dto'
    ),
    ['./app/workflow-overrides/dto/get-workflow-overrides-response.dto']: await import(
      './app/workflow-overrides/dto/get-workflow-overrides-response.dto'
    ),
    ['./app/inbox/dtos/subscriber-session-response.dto']: await import(
      './app/inbox/dtos/subscriber-session-response.dto'
    ),
    ['./app/inbox/dtos/get-notifications-response.dto']: await import(
      './app/inbox/dtos/get-notifications-response.dto'
    ),
    ['./app/inbox/dtos/get-notifications-count-response.dto']: await import(
      './app/inbox/dtos/get-notifications-count-response.dto'
    ),
  };
  return {
    '@nestjs/swagger': {
      models: [
        [import('./app/user/usecases/get-my-profile/get-my-profile.dto'), { GetMyProfileCommand: {} }],
        [
          import('./app/user/dtos/user-response.dto'),
          {
            ServicesHashesDto: { intercom: { required: false, type: () => String } },
            UserResponseDto: {
              _id: { required: true, type: () => String },
              resetToken: { required: false, type: () => String },
              resetTokenDate: { required: false, type: () => String },
              firstName: { required: false, type: () => String, nullable: true },
              lastName: { required: false, type: () => String, nullable: true },
              email: { required: false, type: () => String, nullable: true },
              profilePicture: { required: false, type: () => String, nullable: true },
              createdAt: { required: true, type: () => String },
              showOnBoarding: { required: false, type: () => Boolean },
              servicesHashes: { required: false, type: () => t['./app/user/dtos/user-response.dto'].ServicesHashesDto },
              jobTitle: {
                required: false,
                enum: t['../../../libs/shared/dist/cjs/types/organization/index'].JobTitleEnum,
              },
              hasPassword: { required: true, type: () => Boolean },
            },
          },
        ],
        [
          import('./app/user/dtos/user-onboarding-request.dto'),
          { UserOnboardingRequestDto: { showOnBoarding: { required: true, type: () => Boolean } } },
        ],
        [
          import('./app/user/dtos/change-profile-email.dto'),
          { ChangeProfileEmailDto: { email: { required: true, type: () => String } } },
        ],
        [
          import('./app/user/dtos/user-onboarding-tour-request.dto'),
          { UserOnboardingTourRequestDto: { showOnBoardingTour: { required: true, type: () => Number } } },
        ],
        [
          import('./app/user/dtos/update-profile-request.dto'),
          {
            UpdateProfileRequestDto: {
              firstName: { required: true, type: () => String },
              lastName: { required: true, type: () => String },
              profilePicture: { required: false, type: () => String },
            },
          },
        ],
        [
          import('./app/auth/dtos/user-registration.dto'),
          {
            UserRegistrationBodyDto: {
              email: { required: true, type: () => String },
              firstName: { required: true, type: () => String },
              lastName: { required: false, type: () => String },
              organizationName: { required: false, type: () => String },
              origin: {
                required: false,
                enum: t['../../../libs/shared/dist/cjs/types/analytics/index'].SignUpOriginEnum,
              },
              jobTitle: {
                required: false,
                enum: t['../../../libs/shared/dist/cjs/types/organization/index'].JobTitleEnum,
              },
              domain: { required: false, type: () => String },
              productUseCases: { required: false, type: () => Object },
            },
          },
        ],
        [
          import('./app/layouts/dtos/layout.dto'),
          {
            LayoutDto: {
              _id: { required: false, type: () => String },
              _organizationId: { required: true, type: () => String },
              _environmentId: { required: true, type: () => String },
              _creatorId: { required: true, type: () => String },
              name: { required: true, type: () => String },
              identifier: { required: true, type: () => String },
              description: { required: false, type: () => String },
              channel: { required: true, enum: t['../../../libs/shared/dist/cjs/types/channel/index'].ChannelTypeEnum },
              content: { required: true, type: () => String },
              contentType: { required: true, type: () => String },
              variables: { required: false, type: () => [Object] },
              isDefault: { required: true, type: () => Boolean },
              isDeleted: { required: true, type: () => Boolean },
              createdAt: { required: false, type: () => String },
              updatedAt: { required: false, type: () => String },
              _parentId: { required: false, type: () => String },
            },
          },
        ],
        [
          import('./app/layouts/dtos/create-layout.dto'),
          {
            CreateLayoutResponseDto: { _id: { required: true, type: () => String } },
            CreateLayoutRequestDto: {
              name: { required: true, type: () => String },
              identifier: { required: true, type: () => String },
              description: { required: true, type: () => String },
              content: { required: true, type: () => String },
              variables: { required: false, type: () => [Object] },
              isDefault: { required: false, type: () => Boolean },
            },
          },
        ],
        [
          import('./app/layouts/dtos/filter-layouts.dto'),
          {
            FilterLayoutsRequestDto: {
              page: { required: false, type: () => Number, minimum: 0 },
              pageSize: { required: false, type: () => Number, minimum: 0 },
              sortBy: { required: false, type: () => String },
              orderBy: { required: false, type: () => Object },
            },
            FilterLayoutsResponseDto: {
              data: { required: true, type: () => [t['./app/layouts/dtos/layout.dto'].LayoutDto] },
              page: { required: true, type: () => Number },
              pageSize: { required: true, type: () => Number },
              totalCount: { required: true, type: () => Number },
            },
          },
        ],
        [import('./app/layouts/dtos/get-layout.dto'), { GetLayoutResponseDto: {} }],
        [
          import('./app/layouts/dtos/update-layout.dto'),
          {
            UpdateLayoutResponseDto: {},
            UpdateLayoutRequestDto: {
              name: { required: false, type: () => String },
              identifier: { required: true, type: () => String },
              description: { required: false, type: () => String },
              content: { required: false, type: () => String },
              variables: { required: false, type: () => [Object] },
              isDefault: { required: false, type: () => Boolean },
            },
          },
        ],
        [
          import('./app/auth/dtos/login.dto'),
          {
            LoginBodyDto: {
              email: { required: true, type: () => String },
              password: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./app/auth/dtos/password-reset.dto'),
          {
            PasswordResetBodyDto: { token: { required: true, type: () => String } },
            PasswordResetRequestBodyDto: { email: { required: true, type: () => String } },
          },
        ],
        [
          import('./app/auth/dtos/update-password.dto'),
          {
            UpdatePasswordBodyDto: {
              confirmPassword: { required: true, type: () => String },
              currentPassword: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./app/environments/dtos/environment-response.dto'),
          {
            EnvironmentResponseDto: {
              _id: { required: false, type: () => String },
              name: { required: true, type: () => String },
              _organizationId: { required: true, type: () => String },
              identifier: { required: true, type: () => String },
              apiKeys: { required: false, type: () => [Object] },
              _parentId: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./app/inbound-parse/dtos/get-mx-record.dto'),
          { GetMxRecordResponseDto: { mxRecordConfigured: { required: true, type: () => Boolean } } },
        ],
        [
          import('./app/environments/dtos/create-environment-request.dto'),
          {
            CreateEnvironmentRequestDto: {
              name: { required: true, type: () => String },
              parentId: { required: false, type: () => String },
            },
          },
        ],
        [
          import('./app/environments/dtos/update-environment-request.dto'),
          {
            InBoundParseDomainDto: { inboundParseDomain: { required: false, type: () => String } },
            BridgeConfigurationDto: { url: { required: false, type: () => String } },
            UpdateEnvironmentRequestDto: {
              name: { required: false, type: () => String },
              identifier: { required: false, type: () => String },
              parentId: { required: false, type: () => String },
              dns: {
                required: false,
                type: () => t['./app/environments/dtos/update-environment-request.dto'].InBoundParseDomainDto,
              },
              bridge: {
                required: false,
                type: () => t['./app/environments/dtos/update-environment-request.dto'].BridgeConfigurationDto,
              },
            },
          },
        ],
        [
          import('./app/notification-groups/dtos/create-notification-group-request.dto'),
          { CreateNotificationGroupRequestDto: { name: { required: true, type: () => String } } },
        ],
        [
          import('./app/notification-groups/dtos/notification-group-response.dto'),
          {
            NotificationGroupResponseDto: {
              _id: { required: false, type: () => String },
              name: { required: true, type: () => String },
              _environmentId: { required: true, type: () => String },
              _organizationId: { required: true, type: () => String },
              _parentId: { required: false, type: () => String },
            },
          },
        ],
        [
          import('./app/notification-groups/dtos/delete-notification-group-response.dto'),
          {
            DeleteNotificationGroupResponseDto: {
              acknowledged: { required: true, type: () => Boolean },
              status: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./app/change/dtos/change-response.dto'),
          {
            ChangeResponseDto: {
              _id: { required: false, type: () => String },
              _creatorId: { required: true, type: () => String },
              _environmentId: { required: true, type: () => String },
              _organizationId: { required: true, type: () => String },
              _entityId: { required: true, type: () => String },
              enabled: { required: true, type: () => Boolean },
              type: {
                required: true,
                enum: t['../../../libs/shared/dist/cjs/entities/change/change.interface'].ChangeEntityTypeEnum,
              },
              change: { required: true, type: () => Object },
              createdAt: { required: true, type: () => String },
              _parentId: { required: false, type: () => String },
            },
            ChangesResponseDto: {
              totalCount: { required: true, type: () => Number },
              data: { required: true, type: () => [t['./app/change/dtos/change-response.dto'].ChangeResponseDto] },
              pageSize: { required: true, type: () => Number },
              page: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./app/change/dtos/change-request.dto'),
          { ChangesRequestDto: { promoted: { required: true, type: () => String } } },
        ],
        [
          import('./app/change/dtos/bulk-apply-change.dto'),
          { BulkApplyChangeDto: { changeIds: { required: true, type: () => [String] } } },
        ],
        [
          import('./app/integrations/dtos/credentials.dto'),
          {
            CredentialsDto: {
              apiKey: { required: false, type: () => String },
              user: { required: false, type: () => String },
              secretKey: { required: false, type: () => String },
              domain: { required: false, type: () => String },
              password: { required: false, type: () => String },
              host: { required: false, type: () => String },
              port: { required: false, type: () => String },
              secure: { required: false, type: () => Boolean },
              region: { required: false, type: () => String },
              accountSid: { required: false, type: () => String },
              messageProfileId: { required: false, type: () => String },
              token: { required: false, type: () => String },
              from: { required: false, type: () => String },
              senderName: { required: false, type: () => String },
              projectName: { required: false, type: () => String },
              applicationId: { required: false, type: () => String },
              clientId: { required: false, type: () => String },
              requireTls: { required: false, type: () => Boolean },
              ignoreTls: { required: false, type: () => Boolean },
              tlsOptions: { required: false, type: () => Object },
              baseUrl: { required: false, type: () => String },
              webhookUrl: { required: false, type: () => String },
              redirectUrl: { required: false, type: () => String },
              hmac: { required: false, type: () => Boolean },
              serviceAccount: { required: false, type: () => String },
              ipPoolName: { required: false, type: () => String },
              apiKeyRequestHeader: { required: false, type: () => String },
              secretKeyRequestHeader: { required: false, type: () => String },
              idPath: { required: false, type: () => String },
              datePath: { required: false, type: () => String },
              apiToken: { required: false, type: () => String },
              authenticateByToken: { required: false, type: () => Boolean },
              authenticationTokenKey: { required: false, type: () => String },
              instanceId: { required: false, type: () => String },
              alertUid: { required: false, type: () => String },
              title: { required: false, type: () => String },
              imageUrl: { required: false, type: () => String },
              state: { required: false, type: () => String },
              externalLink: { required: false, type: () => String },
              channelId: { required: false, type: () => String },
              phoneNumberIdentification: { required: false, type: () => String },
            },
          },
        ],
        [
          import('./app/integrations/dtos/integration-response.dto'),
          {
            IntegrationResponseDto: {
              _id: { required: false, type: () => String },
              _environmentId: { required: true, type: () => String },
              _organizationId: { required: true, type: () => String },
              name: { required: true, type: () => String },
              identifier: { required: true, type: () => String },
              providerId: { required: true, type: () => String },
              channel: { required: true, enum: t['../../../libs/shared/dist/cjs/types/channel/index'].ChannelTypeEnum },
              credentials: { required: true, type: () => t['./app/integrations/dtos/credentials.dto'].CredentialsDto },
              active: { required: true, type: () => Boolean },
              deleted: { required: true, type: () => Boolean },
              deletedAt: { required: true, type: () => String },
              deletedBy: { required: true, type: () => String },
              primary: { required: true, type: () => Boolean },
              conditions: { required: false, type: () => [t['./app/shared/dtos/step-filter'].StepFilter] },
            },
          },
        ],
        [
          import('./app/integrations/dtos/create-integration-request.dto'),
          {
            CreateIntegrationRequestDto: {
              name: { required: false, type: () => String },
              identifier: { required: false, type: () => String },
              _environmentId: { required: false, type: () => String },
              providerId: { required: true, type: () => String },
              channel: { required: true, enum: t['../../../libs/shared/dist/cjs/types/channel/index'].ChannelTypeEnum },
              credentials: { required: false, type: () => t['./app/integrations/dtos/credentials.dto'].CredentialsDto },
              active: { required: false, type: () => Boolean },
              check: { required: false, type: () => Boolean },
              conditions: { required: false, type: () => [t['./app/shared/dtos/step-filter'].StepFilter] },
            },
          },
        ],
        [
          import('./app/integrations/dtos/update-integration.dto'),
          {
            UpdateIntegrationRequestDto: {
              name: { required: false, type: () => String },
              identifier: { required: false, type: () => String },
              _environmentId: { required: false, type: () => String },
              active: { required: false, type: () => Boolean },
              credentials: { required: false, type: () => t['./app/integrations/dtos/credentials.dto'].CredentialsDto },
              check: { required: false, type: () => Boolean },
              conditions: { required: false, type: () => [t['./app/shared/dtos/step-filter'].StepFilter] },
            },
          },
        ],
        [
          import('./app/organization/dtos/create-organization.dto'),
          {
            CreateOrganizationDto: {
              name: { required: true, type: () => String },
              logo: { required: false, type: () => String },
              jobTitle: {
                required: false,
                enum: t['../../../libs/shared/dist/cjs/types/organization/index'].JobTitleEnum,
              },
              domain: { required: false, type: () => String },
              language: { required: false, type: () => [String] },
            },
          },
        ],
        [
          import('./app/organization/dtos/rename-organization.dto'),
          { RenameOrganizationDto: { name: { required: true, type: () => String } } },
        ],
        [
          import('./app/organization/dtos/update-branding-details.dto'),
          {
            UpdateBrandingDetailsDto: {
              logo: { required: true, type: () => String },
              color: { required: true, type: () => String },
              fontColor: { required: true, type: () => String },
              contentBackground: { required: true, type: () => String },
              fontFamily: { required: false, type: () => String },
            },
          },
        ],
        [
          import('./app/organization/dtos/update-member-roles.dto'),
          {
            UpdateMemberRolesDto: {
              role: {
                required: true,
                type: () => String,
                enum: t['../../../libs/shared/dist/cjs/entities/organization/member.enum'].MemberRoleEnum.ADMIN,
              },
            },
          },
        ],
        [
          import('./app/organization/dtos/organization-response.dto'),
          {
            IPartnerConfigurationResponseDto: {
              projectIds: { required: false, type: () => [String] },
              accessToken: { required: true, type: () => String },
              configurationId: { required: true, type: () => String },
              teamId: { required: true, type: () => String },
              partnerType: {
                required: true,
                type: () => String,
                enum: t['../../../libs/dal/dist/repositories/organization/organization.entity'].PartnerTypeEnum,
              },
            },
            OrganizationBrandingResponseDto: {
              direction: {
                required: false,
                enum: t['../../../libs/dal/dist/repositories/organization/organization.entity'].DirectionEnum,
              },
            },
            OrganizationResponseDto: {
              name: { required: true, type: () => String },
              logo: { required: false, type: () => String },
              branding: {
                required: true,
                type: () => t['./app/organization/dtos/organization-response.dto'].OrganizationBrandingResponseDto,
              },
              partnerConfigurations: {
                required: true,
                type: () => [t['./app/organization/dtos/organization-response.dto'].IPartnerConfigurationResponseDto],
              },
            },
          },
        ],
        [
          import('./app/organization/dtos/member-response.dto'),
          {
            MemberUserDto: {
              _id: { required: true, type: () => String },
              firstName: { required: true, type: () => String },
              lastName: { required: true, type: () => String },
              email: { required: true, type: () => String },
            },
            MemberInviteDTO: {
              email: { required: true, type: () => String },
              token: { required: true, type: () => String },
              invitationDate: { required: true, type: () => Date },
              answerDate: { required: false, type: () => Date },
              _inviterId: { required: true, type: () => String },
            },
            MemberResponseDto: {
              _id: { required: true, type: () => String },
              _userId: { required: true, type: () => String },
              user: { required: false, type: () => t['./app/organization/dtos/member-response.dto'].MemberUserDto },
              roles: {
                required: false,
                enum: t['../../../libs/shared/dist/cjs/entities/organization/member.enum'].MemberRoleEnum,
              },
              invite: { required: false, type: () => t['./app/organization/dtos/member-response.dto'].MemberInviteDTO },
              memberStatus: {
                required: false,
                enum: t['../../../libs/shared/dist/cjs/entities/organization/member.interface'].MemberStatusEnum,
              },
              _organizationId: { required: true, type: () => String },
            },
          },
        ],
        [import('./app/testing/dtos/seed-data.dto'), { SeedDataBodyDto: {} }],
        [
          import('./app/testing/dtos/idempotency.dto'),
          { IdempotencyBodyDto: { data: { required: true, type: () => Number } } },
        ],
        [
          import('./app/execution-details/dtos/execution-details-request.dto'),
          {
            ExecutionDetailsRequestDto: {
              notificationId: { required: true, type: () => String },
              subscriberId: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./app/workflows/dto/workflow-response.dto'),
          {
            NotificationGroup: {
              _id: { required: false, type: () => String },
              name: { required: true, type: () => String },
              _environmentId: { required: true, type: () => String },
              _organizationId: { required: true, type: () => String },
              _parentId: { required: false, type: () => String },
            },
            NotificationTriggerVariable: { name: { required: true, type: () => String } },
            NotificationTrigger: {
              type: {
                required: true,
                type: () => String,
                enum: t['../../../libs/shared/dist/cjs/entities/notification-template/notification-template.interface']
                  .TriggerTypeEnum,
              },
              identifier: { required: true, type: () => String },
              variables: {
                required: true,
                type: () => [t['./app/workflows/dto/workflow-response.dto'].NotificationTriggerVariable],
              },
              subscriberVariables: {
                required: false,
                type: () => [t['./app/workflows/dto/workflow-response.dto'].NotificationTriggerVariable],
              },
            },
            WorkflowResponse: {
              _id: { required: false, type: () => String },
              name: { required: true, type: () => String },
              description: { required: true, type: () => String },
              active: { required: true, type: () => Boolean },
              draft: { required: true, type: () => Boolean },
              preferenceSettings: {
                required: true,
                type: () => t['./app/shared/dtos/preference-channels'].PreferenceChannels,
              },
              critical: { required: true, type: () => Boolean },
              tags: { required: true, type: () => [String] },
              steps: { required: true, type: () => [t['./app/shared/dtos/notification-step'].NotificationStep] },
              _organizationId: { required: true, type: () => String },
              _creatorId: { required: true, type: () => String },
              _environmentId: { required: true, type: () => String },
              triggers: {
                required: true,
                type: () => [t['./app/workflows/dto/workflow-response.dto'].NotificationTrigger],
              },
              _notificationGroupId: { required: true, type: () => String },
              _parentId: { required: false, type: () => String },
              deleted: { required: true, type: () => Boolean },
              deletedAt: { required: true, type: () => String },
              deletedBy: { required: true, type: () => String },
              notificationGroup: {
                required: false,
                type: () => t['./app/workflows/dto/workflow-response.dto'].NotificationGroup,
              },
              data: { required: false, type: () => Object },
              workflowIntegrationStatus: { required: false, type: () => Object },
            },
          },
        ],
        [
          import('./app/workflows/dto/workflows.response.dto'),
          {
            WorkflowsResponseDto: {
              totalCount: { required: true, type: () => Number },
              data: { required: true, type: () => [t['./app/workflows/dto/workflow-response.dto'].WorkflowResponse] },
              pageSize: { required: true, type: () => Number },
              page: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./app/workflows/dto/change-workflow-status-request.dto'),
          { ChangeWorkflowStatusRequestDto: { active: { required: true, type: () => Boolean } } },
        ],
        [
          import('./app/workflows/dto/create-workflow.request.dto'),
          {
            CreateWorkflowRequestDto: {
              name: { required: true, type: () => String },
              notificationGroupId: { required: true, type: () => String },
              notificationGroup: { required: false, type: () => Object },
              tags: { required: true, type: () => [String] },
              description: { required: true, type: () => String, maxLength: 1000 },
              steps: { required: true, type: () => [t['./app/shared/dtos/notification-step'].NotificationStep] },
              active: { required: false, type: () => Boolean },
              draft: { required: false, type: () => Boolean },
              critical: { required: false, type: () => Boolean },
              blueprintId: { required: false, type: () => String },
              data: { required: false, type: () => Object },
            },
          },
        ],
        [
          import('./app/workflows/dto/update-workflow-request.dto'),
          {
            UpdateWorkflowRequestDto: {
              name: { required: true, type: () => String },
              tags: { required: true, type: () => [String] },
              description: { required: true, type: () => String, maxLength: 300 },
              identifier: { required: false, type: () => String },
              steps: { required: true, type: () => [t['./app/shared/dtos/notification-step'].NotificationStep] },
              notificationGroupId: { required: true, type: () => String },
              critical: { required: false, type: () => Boolean },
              data: { required: false, type: () => Object },
            },
          },
        ],
        [
          import('./app/workflows/dto/variables.response.dto'),
          {
            VariablesResponseDto: {
              translations: { required: true, type: () => Object },
              system: { required: true, type: () => Object },
            },
          },
        ],
        [import('./app/workflows/dto/workflows-request.dto'), { WorkflowsRequestDto: {} }],
        [
          import('./app/events/dtos/test-email-request.dto'),
          {
            TestSendEmailRequestDto: {
              contentType: { required: true, type: () => Object },
              payload: { required: true, type: () => Object },
              subject: { required: true, type: () => String },
              preheader: { required: false, type: () => String },
              content: { required: true, type: () => Object },
              to: { required: true, type: () => Object },
              layoutId: { required: false, type: () => String, nullable: true },
              bridge: { required: false, type: () => Boolean, default: false },
              stepId: { required: false, type: () => String, nullable: true },
              workflowId: { required: false, type: () => String, nullable: true },
              inputs: { required: true, type: () => Object },
              controls: { required: true, type: () => Object },
            },
          },
        ],
        [
          import('./app/events/dtos/trigger-event-response.dto'),
          {
            TriggerEventResponseDto: {
              acknowledged: { required: true, type: () => Boolean },
              status: {
                required: true,
                enum: t['../../../libs/shared/dist/cjs/types/events/index'].TriggerEventStatusEnum,
              },
              error: { required: false, type: () => [String] },
              transactionId: { required: false, type: () => String },
            },
          },
        ],
        [
          import('./app/subscribers/dtos/create-subscriber-request.dto'),
          {
            CreateSubscriberRequestDto: {
              subscriberId: { required: true, type: () => String },
              email: { required: false, type: () => String },
              firstName: { required: false, type: () => String },
              lastName: { required: false, type: () => String },
              phone: { required: false, type: () => String },
              avatar: { required: false, type: () => String },
              locale: { required: false, type: () => String },
              data: { required: false, type: () => Object },
              channels: {
                required: false,
                type: () => [t['./app/subscribers/dtos/create-subscriber-request.dto'].SubscriberChannelDto],
              },
            },
            SubscriberChannelDto: {
              providerId: { required: true, type: () => Object },
              integrationIdentifier: { required: false, type: () => String },
              credentials: {
                required: true,
                type: () => t['./app/subscribers/dtos/create-subscriber-request.dto'].ChannelCredentialsDto,
              },
            },
            ChannelCredentialsDto: {
              webhookUrl: { required: false, type: () => String },
              deviceTokens: { required: false, type: () => [String] },
            },
            BulkSubscriberCreateDto: {
              subscribers: {
                required: true,
                type: () => [t['./app/subscribers/dtos/create-subscriber-request.dto'].CreateSubscriberRequestDto],
              },
            },
          },
        ],
        [
          import('./app/subscribers/dtos/delete-subscriber-response.dto'),
          {
            DeleteSubscriberResponseDto: {
              acknowledged: { required: true, type: () => Boolean },
              status: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./app/subscribers/dtos/update-subscriber-channel-request.dto'),
          {
            UpdateSubscriberChannelRequestDto: {
              providerId: { required: true, type: () => Object },
              integrationIdentifier: { required: false, type: () => String },
              credentials: { required: true, type: () => t['./app/shared/dtos/subscriber-channel'].ChannelCredentials },
            },
          },
        ],
        [
          import('./app/subscribers/dtos/subscriber-response.dto'),
          {
            ChannelSettings: { _integrationId: { required: true, type: () => String } },
            SubscriberResponseDto: {
              _id: { required: false, type: () => String },
              firstName: { required: false, type: () => String },
              lastName: { required: false, type: () => String },
              email: { required: false, type: () => String },
              phone: { required: false, type: () => String },
              avatar: { required: false, type: () => String },
              locale: { required: false, type: () => String },
              subscriberId: { required: true, type: () => String },
              channels: {
                required: false,
                type: () => [t['./app/subscribers/dtos/subscriber-response.dto'].ChannelSettings],
              },
              isOnline: { required: false, type: () => Boolean },
              lastOnlineAt: { required: false, type: () => String },
              _organizationId: { required: true, type: () => String },
              _environmentId: { required: true, type: () => String },
              deleted: { required: true, type: () => Boolean },
              createdAt: { required: true, type: () => String },
              updatedAt: { required: true, type: () => String },
              __v: { required: false, type: () => Number },
            },
          },
        ],
        [import('./app/subscribers/dtos/subscribers-response.dto'), { SubscribersResponseDto: {} }],
        [
          import('./app/subscribers/dtos/update-subscriber-request.dto'),
          {
            UpdateSubscriberRequestDto: {
              email: { required: false, type: () => String },
              firstName: { required: false, type: () => String },
              lastName: { required: false, type: () => String },
              phone: { required: false, type: () => String },
              avatar: { required: false, type: () => String },
              locale: { required: false, type: () => String },
              data: { required: false, type: () => Object },
            },
          },
        ],
        [
          import('./app/subscribers/dtos/get-subscriber-preferences-response.dto'),
          { GetSubscriberPreferencesResponseDto: {} },
        ],
        [
          import('./app/subscribers/dtos/update-subscriber-global-preferences-request.dto'),
          {
            UpdateSubscriberGlobalPreferencesRequestDto: {
              enabled: { required: false, type: () => Boolean },
              preferences: {
                required: false,
                type: () => [t['./app/shared/dtos/channel-preference'].ChannelPreference],
              },
            },
          },
        ],
        [
          import('./app/tenant/dtos/create-tenant-request.dto'),
          {
            CreateTenantRequestDto: {
              identifier: { required: true, type: () => String },
              name: { required: true, type: () => String },
              data: { required: false, type: () => Object },
            },
          },
        ],
        [
          import('./app/tenant/dtos/create-tenant-response.dto'),
          {
            CreateTenantResponseDto: {
              _id: { required: true, type: () => String },
              identifier: { required: true, type: () => String },
              name: { required: false, type: () => String },
              data: { required: false, type: () => Object },
              _environmentId: { required: true, type: () => String },
              createdAt: { required: true, type: () => String },
              updatedAt: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./app/tenant/dtos/get-tenant-response.dto'),
          {
            GetTenantResponseDto: {
              _id: { required: true, type: () => String },
              identifier: { required: true, type: () => String },
              name: { required: false, type: () => String },
              data: { required: false, type: () => Object },
              _environmentId: { required: true, type: () => String },
              createdAt: { required: true, type: () => String },
              updatedAt: { required: true, type: () => String },
            },
          },
        ],
        [import('./app/tenant/dtos/get-tenants-request.dto'), { GetTenantsRequestDto: {} }],
        [
          import('./app/tenant/dtos/update-tenant-request.dto'),
          {
            UpdateTenantRequestDto: {
              identifier: { required: false, type: () => String },
              name: { required: false, type: () => String },
              data: { required: false, type: () => Object },
            },
          },
        ],
        [
          import('./app/tenant/dtos/update-tenant-response.dto'),
          {
            UpdateTenantResponseDto: {
              _id: { required: true, type: () => String },
              identifier: { required: true, type: () => String },
              name: { required: false, type: () => String },
              data: { required: false, type: () => Object },
              _environmentId: { required: true, type: () => String },
              createdAt: { required: true, type: () => String },
              updatedAt: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./app/events/dtos/trigger-event-request.dto'),
          {
            SubscriberPayloadDto: {},
            TenantPayloadDto: {},
            TopicPayloadDto: {
              topicKey: { required: true, type: () => String },
              type: {
                required: true,
                enum: t['../../../libs/shared/dist/cjs/types/events/index'].TriggerRecipientsTypeEnum,
              },
            },
            TriggerEventRequestDto: {
              name: { required: true, type: () => String },
              payload: { required: false, type: () => Object },
              bridgeUrl: { required: false, type: () => String },
              overrides: { required: false, type: () => Object },
              to: { required: true, type: () => [Object] },
              transactionId: { required: false, type: () => String },
              actor: { required: false, type: () => Object },
              tenant: { required: false, type: () => Object },
              controls: { required: false, type: () => Object },
            },
            BulkTriggerEventDto: {
              events: {
                required: true,
                type: () => [t['./app/events/dtos/trigger-event-request.dto'].TriggerEventRequestDto],
              },
            },
          },
        ],
        [
          import('./app/events/dtos/trigger-event-to-all-request.dto'),
          {
            TriggerEventToAllRequestDto: {
              name: { required: true, type: () => String },
              payload: { required: true, type: () => Object },
              overrides: { required: false, type: () => Object },
              transactionId: { required: false, type: () => String },
              actor: { required: false, type: () => Object },
              tenant: { required: false, type: () => Object },
            },
          },
        ],
        [
          import('./app/widgets/dtos/organization-response.dto'),
          {
            OrganizationResponseDto: {
              _id: { required: true, type: () => String },
              name: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./app/widgets/dtos/message-response.dto'),
          {
            EmailBlock: {
              type: {
                required: true,
                enum: t['../../../libs/shared/dist/cjs/types/message-template/index'].EmailBlockTypeEnum,
              },
              content: { required: true, type: () => String },
              url: { required: false, type: () => String },
            },
            MessageCTA: {
              type: {
                required: true,
                type: () => String,
                enum: t['../../../libs/shared/dist/cjs/types/channel/index'].ChannelCTATypeEnum,
              },
            },
            MessageResponseDto: {
              _id: { required: true, type: () => String },
              _templateId: { required: true, type: () => String },
              _environmentId: { required: true, type: () => String },
              _messageTemplateId: { required: true, type: () => String },
              _organizationId: { required: true, type: () => String },
              _notificationId: { required: true, type: () => String },
              _subscriberId: { required: true, type: () => String },
              subscriber: {
                required: false,
                type: () => t['./app/subscribers/dtos/subscriber-response.dto'].SubscriberResponseDto,
              },
              template: {
                required: false,
                type: () => t['./app/workflows/dto/workflow-response.dto'].WorkflowResponse,
              },
              templateIdentifier: { required: false, type: () => String },
              createdAt: { required: true, type: () => String },
              lastSeenDate: { required: false, type: () => String },
              lastReadDate: { required: false, type: () => String },
              content: { required: true, type: () => Object },
              transactionId: { required: true, type: () => String },
              subject: { required: false, type: () => String },
              channel: { required: true, enum: t['../../../libs/shared/dist/cjs/types/channel/index'].ChannelTypeEnum },
              read: { required: true, type: () => Boolean },
              seen: { required: true, type: () => Boolean },
              email: { required: false, type: () => String },
              phone: { required: false, type: () => String },
              directWebhookUrl: { required: false, type: () => String },
              providerId: { required: false, type: () => String },
              deviceTokens: { required: false, type: () => [String] },
              title: { required: false, type: () => String },
              cta: { required: true, type: () => t['./app/widgets/dtos/message-response.dto'].MessageCTA },
              _feedId: { required: false, type: () => String, nullable: true },
              status: { required: true, type: () => Object },
              errorId: { required: true, type: () => String },
              errorText: { required: true, type: () => String },
              payload: { required: true, type: () => Object },
              overrides: { required: true, type: () => Object },
            },
            MessagesResponseDto: {
              totalCount: { required: false, type: () => Number },
              hasMore: { required: true, type: () => Boolean },
              data: { required: true, type: () => [t['./app/widgets/dtos/message-response.dto'].MessageResponseDto] },
              pageSize: { required: true, type: () => Number },
              page: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./app/widgets/dtos/feeds-response.dto'),
          {
            NotificationDto: {
              _id: { required: true, type: () => String },
              _templateId: { required: true, type: () => String },
              _environmentId: { required: true, type: () => String },
              _messageTemplateId: { required: true, type: () => String },
              _organizationId: { required: true, type: () => String },
              _notificationId: { required: true, type: () => String },
              _subscriberId: { required: true, type: () => String },
              _feedId: { required: true, type: () => String },
              _jobId: { required: true, type: () => String },
              createdAt: { required: true, type: () => String },
              updatedAt: { required: true, type: () => String },
              expireAt: { required: true, type: () => String },
              subscriber: {
                required: false,
                type: () => t['./app/subscribers/dtos/subscriber-response.dto'].SubscriberResponseDto,
              },
              transactionId: { required: true, type: () => String },
              templateIdentifier: { required: true, type: () => String },
              providerId: { required: true, type: () => String },
              content: { required: true, type: () => String },
              subject: { required: false, type: () => String },
              channel: { required: true, enum: t['../../../libs/shared/dist/cjs/types/channel/index'].ChannelTypeEnum },
              read: { required: true, type: () => Boolean },
              seen: { required: true, type: () => Boolean },
              deleted: { required: true, type: () => Boolean },
              deviceTokens: { required: false, type: () => [String] },
              cta: { required: true, type: () => t['./app/widgets/dtos/message-response.dto'].MessageCTA },
              status: { required: true, type: () => Object },
              payload: { required: true, type: () => Object },
              overrides: { required: true, type: () => Object },
            },
            FeedResponseDto: {
              totalCount: { required: false, type: () => Number },
              hasMore: { required: true, type: () => Boolean },
              data: { required: true, type: () => [t['./app/widgets/dtos/feeds-response.dto'].NotificationDto] },
              pageSize: { required: true, type: () => Number },
              page: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./app/widgets/dtos/session-initialize-response.dto'),
          { SessionInitializeResponseDto: { token: { required: true, type: () => String } } },
        ],
        [
          import('./app/widgets/dtos/log-usage-request.dto'),
          {
            LogUsageRequestDto: {
              name: { required: true, type: () => String },
              payload: { required: true, type: () => Object },
            },
          },
        ],
        [
          import('./app/widgets/dtos/log-usage-response.dto'),
          { LogUsageResponseDto: { success: { required: true, type: () => Boolean } } },
        ],
        [
          import('./app/widgets/dtos/session-initialize-request.dto'),
          {
            SessionInitializeRequestDto: {
              subscriberId: { required: true, type: () => String },
              applicationIdentifier: { required: true, type: () => String },
              firstName: { required: false, type: () => String },
              lastName: { required: false, type: () => String },
              email: { required: false, type: () => String },
              phone: { required: false, type: () => String },
              hmacHash: { required: false, type: () => String },
            },
          },
        ],
        [
          import('./app/widgets/dtos/unseen-count-response.dto'),
          { UnseenCountResponse: { count: { required: true, type: () => Number } } },
        ],
        [
          import('./app/widgets/dtos/update-subscriber-preference-response.dto'),
          {
            NotificationTriggerVariableResponse: {
              name: { required: true, type: () => String },
              value: { required: false, type: () => Object },
              type: {
                required: false,
                enum: t['../../../libs/shared/dist/cjs/types/channel/index'].TemplateVariableTypeEnum,
              },
            },
            TriggerReservedVariableResponse: {
              type: {
                required: true,
                enum: t['../../../libs/shared/dist/cjs/entities/notification-template/notification-template.interface']
                  .TriggerContextTypeEnum,
              },
              variables: {
                required: true,
                type: () => [
                  t['./app/widgets/dtos/update-subscriber-preference-response.dto'].NotificationTriggerVariableResponse,
                ],
              },
            },
            NotificationTriggerResponse: {
              type: {
                required: true,
                type: () => String,
                enum: t['../../../libs/shared/dist/cjs/entities/notification-template/notification-template.interface']
                  .TriggerTypeEnum,
              },
              identifier: { required: true, type: () => String },
              variables: {
                required: true,
                type: () => [
                  t['./app/widgets/dtos/update-subscriber-preference-response.dto'].NotificationTriggerVariableResponse,
                ],
              },
              subscriberVariables: {
                required: false,
                type: () => [
                  t['./app/widgets/dtos/update-subscriber-preference-response.dto'].NotificationTriggerVariableResponse,
                ],
              },
              reservedVariables: {
                required: false,
                type: () => [
                  t['./app/widgets/dtos/update-subscriber-preference-response.dto'].TriggerReservedVariableResponse,
                ],
              },
            },
            UpdateSubscriberPreferenceResponseDto: {},
          },
        ],
        [
          import('./app/widgets/dtos/update-subscriber-preference-request.dto'),
          {
            UpdateSubscriberPreferenceRequestDto: {
              channel: { required: false, type: () => t['./app/shared/dtos/channel-preference'].ChannelPreference },
              enabled: { required: false, type: () => Boolean },
            },
          },
        ],
        [
          import('./app/subscribers/dtos/get-in-app-notification-feed-for-subscriber.dto'),
          {
            GetInAppNotificationsFeedForSubscriberDto: {
              feedIdentifier: { required: true, type: () => Object },
              read: { required: true, type: () => Boolean },
              seen: { required: true, type: () => Boolean },
              payload: { required: false, type: () => String },
            },
          },
        ],
        [import('./app/widgets/dtos/get-notifications-feed-request.dto'), { GetNotificationsFeedDto: {} }],
        [
          import('./app/widgets/dtos/remove-all-messages.dto'),
          { RemoveAllMessagesDto: { feedId: { required: true, type: () => String } } },
        ],
        [
          import('./app/widgets/dtos/remove-messages-bulk-request.dto'),
          { RemoveMessagesBulkRequestDto: { messageIds: { required: true, type: () => [String] } } },
        ],
        [
          import('./app/widgets/dtos/mark-as-request.dto'),
          {
            MessageMarkAsRequestDto: {
              messageId: { required: true, type: () => Object },
              markAs: {
                required: true,
                enum: t['../../../libs/shared/dist/cjs/types/messages/index'].MessagesStatusEnum,
              },
            },
          },
        ],
        [
          import('./app/subscribers/dtos/update-subscriber-online-flag-request.dto'),
          { UpdateSubscriberOnlineFlagRequestDto: { isOnline: { required: true, type: () => Boolean } } },
        ],
        [
          import('./app/widgets/dtos/mark-message-as-request.dto'),
          { MarkMessageAsRequestDto: { messageId: { required: true, type: () => Object } } },
        ],
        [
          import('./app/widgets/dtos/mark-message-action-as-seen.dto'),
          {
            MarkMessageActionAsSeenDto: {
              status: {
                required: true,
                enum: t['../../../libs/shared/dist/cjs/entities/messages/messages.interface'].MessageActionStatusEnum,
              },
              payload: { required: true, type: () => Object },
            },
          },
        ],
        [import('./app/subscribers/dtos/get-subscribers.dto'), { GetSubscribersDto: {} }],
        [
          import('./app/subscribers/dtos/chat-oauth-request.dto'),
          {
            ChatOauthRequestDto: {
              hmacHash: { required: true, type: () => String },
              environmentId: { required: true, type: () => String },
              integrationIdentifier: { required: false, type: () => String },
            },
            ChatOauthCallbackRequestDto: { code: { required: true, type: () => String } },
          },
        ],
        [
          import('./app/subscribers/dtos/mark-all-messages-as-request.dto'),
          {
            MarkAllMessageAsRequestDto: {
              feedIdentifier: { required: false, type: () => Object },
              markAs: {
                required: true,
                enum: t['../../../libs/shared/dist/cjs/types/messages/index'].MessagesStatusEnum,
              },
            },
          },
        ],
        [
          import('./app/topics/dtos/topic.dto'),
          {
            TopicDto: {
              _id: { required: true, type: () => String },
              _organizationId: { required: true, type: () => String },
              _environmentId: { required: true, type: () => String },
              key: { required: true, type: () => String },
              name: { required: true, type: () => String },
              subscribers: { required: true, type: () => [String] },
            },
          },
        ],
        [
          import('./app/topics/dtos/add-subscribers.dto'),
          { AddSubscribersRequestDto: { subscribers: { required: true, type: () => [String] } } },
        ],
        [
          import('./app/topics/dtos/create-topic.dto'),
          {
            CreateTopicResponseDto: {},
            CreateTopicRequestDto: {
              key: { required: true, type: () => String },
              name: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./app/topics/dtos/filter-topics.dto'),
          {
            FilterTopicsRequestDto: {
              page: { required: false, type: () => Number, default: 0, minimum: 0 },
              pageSize: { required: false, type: () => Number, default: 10, minimum: 0 },
              key: { required: false, type: () => String },
            },
            FilterTopicsResponseDto: {
              data: { required: true, type: () => [t['./app/topics/dtos/topic.dto'].TopicDto] },
              page: { required: true, type: () => Number },
              pageSize: { required: true, type: () => Number },
              totalCount: { required: true, type: () => Number },
            },
          },
        ],
        [import('./app/topics/dtos/get-topic.dto'), { GetTopicResponseDto: {} }],
        [
          import('./app/topics/dtos/remove-subscribers.dto'),
          { RemoveSubscribersRequestDto: { subscribers: { required: true, type: () => [String] } } },
        ],
        [
          import('./app/topics/dtos/rename-topic.dto'),
          { RenameTopicResponseDto: {}, RenameTopicRequestDto: { name: { required: true, type: () => String } } },
        ],
        [
          import('./app/topics/dtos/topic-subscriber.dto'),
          {
            TopicSubscriberDto: {
              _organizationId: { required: true, type: () => String },
              _environmentId: { required: true, type: () => String },
              _subscriberId: { required: true, type: () => String },
              _topicId: { required: true, type: () => String },
              topicKey: { required: true, type: () => String },
              externalSubscriberId: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./app/notifications/dtos/activity-stats-response.dto'),
          {
            ActivityStatsResponseDto: {
              weeklySent: { required: true, type: () => Number },
              monthlySent: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./app/notifications/dtos/activities-response.dto'),
          {
            ActivityNotificationStepResponseDto: {
              _id: { required: true, type: () => String },
              active: { required: true, type: () => Boolean },
              filters: {
                required: true,
                type: () =>
                  t['../../../libs/dal/dist/repositories/notification-template/notification-template.entity']
                    .StepFilter,
              },
              template: {
                required: false,
                type: () =>
                  t['../../../libs/shared/dist/cjs/dto/message-template/message-template.dto'].MessageTemplateDto,
              },
            },
            ActivityNotificationExecutionDetailResponseDto: {
              _id: { required: true, type: () => String },
              _jobId: { required: true, type: () => String },
              status: {
                required: true,
                enum: t['../../../libs/shared/dist/cjs/entities/execution-details/execution-details.interface']
                  .ExecutionDetailsStatusEnum,
              },
              detail: { required: true, type: () => String },
              isRetry: { required: true, type: () => Boolean },
              isTest: { required: true, type: () => Boolean },
              providerId: { required: true, type: () => Object },
              raw: { required: false, type: () => String },
              source: {
                required: true,
                enum: t['../../../libs/shared/dist/cjs/entities/execution-details/execution-details.interface']
                  .ExecutionDetailsSourceEnum,
              },
            },
            ActivityNotificationJobResponseDto: {
              _id: { required: true, type: () => String },
              type: { required: true, type: () => String },
              digest: { required: false, type: () => Object },
              executionDetails: {
                required: true,
                type: () => [
                  t['./app/notifications/dtos/activities-response.dto'].ActivityNotificationExecutionDetailResponseDto,
                ],
              },
              step: {
                required: true,
                type: () => t['./app/notifications/dtos/activities-response.dto'].ActivityNotificationStepResponseDto,
              },
              payload: { required: false, type: () => Object },
              providerId: { required: true, type: () => Object },
              status: { required: true, type: () => String },
            },
            ActivityNotificationSubscriberResponseDto: {
              firstName: { required: false, type: () => String },
              _id: { required: true, type: () => String },
              lastName: { required: false, type: () => String },
              email: { required: false, type: () => String },
              phone: { required: false, type: () => String },
            },
            NotificationTriggerVariable: { name: { required: true, type: () => String } },
            NotificationTrigger: {
              type: {
                required: true,
                type: () => String,
                enum: t['../../../libs/shared/dist/cjs/entities/notification-template/notification-template.interface']
                  .TriggerTypeEnum,
              },
              identifier: { required: true, type: () => String },
              variables: {
                required: true,
                type: () => [t['./app/notifications/dtos/activities-response.dto'].NotificationTriggerVariable],
              },
              subscriberVariables: {
                required: false,
                type: () => [t['./app/notifications/dtos/activities-response.dto'].NotificationTriggerVariable],
              },
            },
            ActivityNotificationResponseDto: {
              _id: { required: false, type: () => String },
              _environmentId: { required: true, type: () => String },
              _organizationId: { required: true, type: () => String },
              transactionId: { required: true, type: () => String },
              createdAt: { required: false, type: () => String },
              channels: {
                required: false,
                enum: t['../../../libs/shared/dist/cjs/types/channel/index'].StepTypeEnum,
                isArray: true,
              },
              subscriber: {
                required: false,
                type: () =>
                  t['./app/notifications/dtos/activities-response.dto'].ActivityNotificationSubscriberResponseDto,
              },
              jobs: {
                required: false,
                type: () => [t['./app/notifications/dtos/activities-response.dto'].ActivityNotificationJobResponseDto],
              },
            },
            ActivitiesResponseDto: {
              hasMore: { required: true, type: () => Boolean },
              data: {
                required: true,
                type: () => [t['./app/notifications/dtos/activities-response.dto'].ActivityNotificationResponseDto],
              },
              pageSize: { required: true, type: () => Number },
              page: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./app/notifications/dtos/activity-graph-states-response.dto'),
          {
            ActivityGraphStatesResponse: {
              _id: { required: true, type: () => String },
              count: { required: true, type: () => Number },
              templates: { required: true, type: () => [String] },
              channels: {
                required: true,
                enum: t['../../../libs/shared/dist/cjs/types/channel/index'].ChannelTypeEnum,
                isArray: true,
              },
            },
          },
        ],
        [
          import('./app/notifications/dtos/activities-request.dto'),
          {
            ActivitiesRequestDto: {
              channels: { required: true, type: () => Object },
              templates: { required: true, type: () => Object },
              emails: { required: true, type: () => Object },
              search: { required: true, type: () => String },
              subscriberIds: { required: true, type: () => Object },
              page: { required: false, type: () => Number, default: 0 },
              transactionId: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./app/storage/dtos/upload-url-response.dto'),
          {
            UploadUrlResponse: {
              signedUrl: { required: true, type: () => String },
              path: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./app/invites/dtos/invite-member.dto'),
          {
            InviteMemberDto: { email: { required: true, type: () => String } },
            InviteWebhookDto: {
              subscriber: {
                required: true,
                type: () => t['../../../libs/dal/dist/repositories/subscriber/subscriber.entity'].SubscriberEntity,
              },
              payload: { required: true, type: () => ({ organizationId: { required: true, type: () => String } }) },
            },
          },
        ],
        [
          import('./app/invites/dtos/bulk-invite-members.dto'),
          {
            EmailInvitee: { email: { required: true, type: () => String } },
            BulkInviteMembersDto: {
              invitees: { required: true, type: () => [t['./app/invites/dtos/bulk-invite-members.dto'].EmailInvitee] },
            },
          },
        ],
        [
          import('./app/invites/dtos/resend-invite.dto'),
          { ResendInviteDto: { memberId: { required: true, type: () => String } } },
        ],
        [
          import('./app/feeds/dto/create-feed-request.dto'),
          { CreateFeedRequestDto: { name: { required: true, type: () => String } } },
        ],
        [
          import('./app/feeds/dto/feed-response.dto'),
          {
            FeedResponseDto: {
              _id: { required: false, type: () => String },
              name: { required: true, type: () => String },
              identifier: { required: true, type: () => String },
              _environmentId: { required: true, type: () => String },
              _organizationId: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./app/messages/dtos/delete-message-response.dto'),
          {
            DeleteMessageResponseDto: {
              acknowledged: { required: true, type: () => Boolean },
              status: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./app/messages/dtos/get-messages-requests.dto'),
          {
            GetMessagesRequestDto: {
              channel: {
                required: false,
                enum: t['../../../libs/shared/dist/cjs/types/channel/index'].ChannelTypeEnum,
              },
              subscriberId: { required: false, type: () => String },
              transactionId: { required: false, type: () => Object },
              page: { required: false, type: () => Number, default: 0 },
              limit: { required: false, type: () => Number, default: 10 },
            },
          },
        ],
        [
          import('./app/messages/dtos/remove-messages-by-transactionId-request.dto'),
          {
            DeleteMessageByTransactionIdRequestDto: {
              channel: {
                required: false,
                enum: t['../../../libs/shared/dist/cjs/types/channel/index'].ChannelTypeEnum,
              },
            },
          },
        ],
        [
          import('./app/partner-integrations/dtos/setup-vercel-integration-response.dto'),
          { SetupVercelConfigurationResponseDto: { success: { required: true, type: () => Boolean } } },
        ],
        [
          import('./app/partner-integrations/dtos/complete-and-update-vercel-integration-request.dto'),
          {
            CompleteAndUpdateVercelIntegrationRequestDto: {
              data: { required: true, type: () => Object },
              configurationId: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./app/partner-integrations/dtos/setup-vercel-integration-request.dto'),
          {
            SetVercelConfigurationRequestDto: {
              vercelIntegrationCode: { required: true, type: () => String },
              configurationId: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./app/blueprint/dto/get-blueprint.response.dto'),
          {
            GetBlueprintResponse: {
              _id: { required: true, type: () => String },
              name: { required: true, type: () => String },
              description: { required: true, type: () => String },
              active: { required: true, type: () => Boolean },
              draft: { required: true, type: () => Boolean },
              critical: { required: true, type: () => Boolean },
              tags: { required: true, type: () => [String] },
              steps: {
                required: true,
                type: () => [t['../../../libs/shared/dist/cjs/dto/workflows/workflow.dto'].NotificationStepDto],
              },
              _organizationId: { required: true, type: () => String },
              _creatorId: { required: true, type: () => String },
              _environmentId: { required: true, type: () => String },
              triggers: { required: true, type: () => [Object] },
              _notificationGroupId: { required: true, type: () => String },
              _parentId: { required: false, type: () => String },
              deleted: { required: true, type: () => Boolean },
              deletedAt: { required: true, type: () => String },
              deletedBy: { required: true, type: () => String },
              createdAt: { required: false, type: () => String },
              updatedAt: { required: false, type: () => String },
              notificationGroup: { required: false, type: () => Object },
              isBlueprint: { required: true, type: () => Boolean },
              blueprintId: { required: false, type: () => String },
            },
          },
        ],
        [
          import('./app/blueprint/dto/grouped-blueprint.response.dto'),
          {
            GroupedBlueprintResponse: {
              general: {
                required: true,
                type: () => [
                  t['../../../libs/shared/dist/cjs/entities/notification-template/notification-template.interface']
                    .IGroupedBlueprint,
                ],
              },
              popular: {
                required: true,
                type: () =>
                  t['../../../libs/shared/dist/cjs/entities/notification-template/notification-template.interface']
                    .IGroupedBlueprint,
              },
            },
          },
        ],
        [
          import('./app/workflow-overrides/dto/create-workflow-override-response.dto'),
          { CreateWorkflowOverrideResponseDto: {} },
        ],
        [
          import('./app/workflow-overrides/dto/create-workflow-override-request.dto'),
          {
            CreateWorkflowOverrideRequestDto: {
              workflowId: { required: true, type: () => String },
              tenantId: { required: true, type: () => String },
              active: { required: false, type: () => Boolean },
              preferenceSettings: {
                required: false,
                type: () => t['./app/shared/dtos/preference-channels'].PreferenceChannels,
              },
            },
          },
        ],
        [
          import('./app/workflow-overrides/dto/get-workflow-override-response.dto'),
          { GetWorkflowOverrideResponseDto: {} },
        ],
        [
          import('./app/workflow-overrides/dto/get-workflow-overrides-request.dto'),
          { GetWorkflowOverridesRequestDto: {} },
        ],
        [
          import('./app/workflow-overrides/dto/get-workflow-overrides-response.dto'),
          {
            GetWorkflowOverridesResponseDto: {
              hasMore: { required: true, type: () => Boolean },
              data: { required: true, type: () => [t['./app/workflow-overrides/dto/shared'].OverrideResponseDto] },
              pageSize: { required: true, type: () => Number },
              page: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./app/workflow-overrides/dto/update-workflow-override-request.dto'),
          {
            UpdateWorkflowOverrideRequestDto: {
              active: { required: false, type: () => Boolean },
              preferenceSettings: {
                required: false,
                type: () => t['./app/shared/dtos/preference-channels'].PreferenceChannels,
              },
            },
          },
        ],
        [
          import('./app/workflow-overrides/dto/update-workflow-override-response.dto'),
          { UpdateWorkflowOverrideResponseDto: {} },
        ],
        [
          import('./app/inbox/dtos/subscriber-session-response.dto'),
          {
            SubscriberSessionResponseDto: {
              token: { required: true, type: () => String },
              totalUnreadCount: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./app/inbox/dtos/get-notifications-response.dto'),
          {
            GetNotificationsResponseDto: {
              data: { required: true, type: () => [Object] },
              hasMore: { required: true, type: () => Boolean },
              filter: { required: true, type: () => Object },
            },
          },
        ],
        [
          import('./app/inbox/dtos/subscriber-session-request.dto'),
          {
            SubscriberSessionRequestDto: {
              applicationIdentifier: { required: true, type: () => String },
              subscriberId: { required: true, type: () => String },
              subscriberHash: { required: false, type: () => String },
            },
          },
        ],
        [
          import('./app/inbox/dtos/get-notifications-request.dto'),
          {
            GetNotificationsRequestDto: {
              tags: { required: false, type: () => [String] },
              read: { required: false, type: () => Boolean },
              archived: { required: false, type: () => Boolean },
            },
          },
        ],
        [
          import('./app/inbox/dtos/get-notifications-count-request.dto'),
          {
            GetNotificationsCountRequestDto: {
              tags: { required: false, type: () => [String] },
              read: { required: false, type: () => Boolean },
              archived: { required: false, type: () => Boolean },
            },
          },
        ],
        [
          import('./app/inbox/dtos/get-notifications-count-response.dto'),
          {
            GetNotificationsCountResponseDto: {
              data: { required: true, type: () => ({ count: { required: true, type: () => Number } }) },
              filter: { required: true, type: () => Object },
            },
          },
        ],
        [
          import('./app/inbox/dtos/action-type-request.dto'),
          {
            ActionTypeRequestDto: {
              actionType: {
                required: true,
                enum: t['../../../libs/shared/dist/cjs/entities/messages/action.enum'].ButtonTypeEnum,
              },
            },
          },
        ],
        [
          import('./app/inbox/dtos/update-all-notifications-request.dto'),
          { UpdateAllNotificationsRequestDto: { tags: { required: false, type: () => [String] } } },
        ],
        [
          import('./app/partner-integrations/dtos/get-vercel-projects-request.dto'),
          { SetVercelConfigurationRequestDto: { configurationId: { required: true, type: () => String } } },
        ],
        [
          import('./app/inbox/dtos/button-type-request.dto'),
          {
            ButtonTypeRequestDto: {
              buttonType: {
                required: true,
                enum: t['../../../libs/shared/dist/cjs/entities/messages/action.enum'].ButtonTypeEnum,
              },
            },
          },
        ],
      ],
      controllers: [
        [
          import('./app/user/user.controller'),
          {
            UsersController: {
              getMyProfile: { type: t['./app/user/dtos/user-response.dto'].UserResponseDto },
              updateProfileEmail: { type: t['./app/user/dtos/user-response.dto'].UserResponseDto },
              updateOnBoarding: { type: t['./app/user/dtos/user-response.dto'].UserResponseDto },
              updateOnBoardingTour: { type: t['./app/user/dtos/user-response.dto'].UserResponseDto },
              updateProfile: { type: t['./app/user/dtos/user-response.dto'].UserResponseDto },
            },
          },
        ],
        [
          import('./app/auth/auth.controller'),
          {
            AuthController: {
              githubAuth: {},
              githubCallback: { type: Object },
              refreshToken: { type: String },
              userRegistration: {},
              forgotPasswordRequest: {},
              passwordReset: {},
              userLogin: {},
              organizationSwitch: { type: String },
              projectSwitch: {},
              updatePassword: {},
              authenticateTest: { type: String },
            },
          },
        ],
        [
          import('./app/environments/environments.controller'),
          {
            EnvironmentsController: {
              getCurrentEnvironment: {
                type: t['./app/environments/dtos/environment-response.dto'].EnvironmentResponseDto,
              },
              createEnvironment: { type: t['./app/environments/dtos/environment-response.dto'].EnvironmentResponseDto },
              listMyEnvironments: {
                type: [t['./app/environments/dtos/environment-response.dto'].EnvironmentResponseDto],
              },
              updateMyEnvironment: {},
              listOrganizationApiKeys: { type: [t['./app/shared/dtos/api-key'].ApiKey] },
              regenerateOrganizationApiKeys: { type: [t['./app/shared/dtos/api-key'].ApiKey] },
            },
          },
        ],
        [
          import('./app/notification-groups/notification-groups.controller'),
          {
            NotificationGroupsController: {
              createNotificationGroup: {
                type: t['./app/notification-groups/dtos/notification-group-response.dto'].NotificationGroupResponseDto,
              },
              listNotificationGroups: {
                type: [
                  t['./app/notification-groups/dtos/notification-group-response.dto'].NotificationGroupResponseDto,
                ],
              },
              getNotificationGroup: {
                type: t['./app/notification-groups/dtos/notification-group-response.dto'].NotificationGroupResponseDto,
              },
              updateNotificationGroup: {
                type: t['./app/notification-groups/dtos/notification-group-response.dto'].NotificationGroupResponseDto,
              },
              deleteNotificationGroup: {
                type: t['./app/notification-groups/dtos/delete-notification-group-response.dto']
                  .DeleteNotificationGroupResponseDto,
              },
            },
          },
        ],
        [
          import('./app/change/changes.controller'),
          {
            ChangesController: {
              getChanges: { type: t['./app/change/dtos/change-response.dto'].ChangesResponseDto },
              getChangesCount: { type: Number },
              bulkApplyDiff: { type: [[t['./app/change/dtos/change-response.dto'].ChangeResponseDto]] },
              applyDiff: { type: [t['./app/change/dtos/change-response.dto'].ChangeResponseDto] },
            },
          },
        ],
        [
          import('./app/layouts/layouts.controller'),
          {
            LayoutsController: {
              createLayout: { type: t['./app/layouts/dtos/create-layout.dto'].CreateLayoutResponseDto },
              listLayouts: { type: t['./app/layouts/dtos/filter-layouts.dto'].FilterLayoutsResponseDto },
              getLayout: { type: t['./app/layouts/dtos/get-layout.dto'].GetLayoutResponseDto },
              deleteLayout: {},
              updateLayout: { type: t['./app/layouts/dtos/update-layout.dto'].UpdateLayoutResponseDto },
              setDefaultLayout: {},
            },
          },
        ],
        [
          import('./app/integrations/integrations.controller'),
          {
            IntegrationsController: {
              listIntegrations: {
                type: [t['./app/integrations/dtos/integration-response.dto'].IntegrationResponseDto],
              },
              getActiveIntegrations: {
                type: [t['./app/integrations/dtos/integration-response.dto'].IntegrationResponseDto],
              },
              getWebhookSupportStatus: { type: Boolean },
              createIntegration: { type: t['./app/integrations/dtos/integration-response.dto'].IntegrationResponseDto },
              updateIntegrationById: {
                type: t['./app/integrations/dtos/integration-response.dto'].IntegrationResponseDto,
              },
              setIntegrationAsPrimary: {
                type: t['./app/integrations/dtos/integration-response.dto'].IntegrationResponseDto,
              },
              removeIntegration: {
                type: [t['./app/integrations/dtos/integration-response.dto'].IntegrationResponseDto],
              },
              getProviderLimit: { type: t['./app/integrations/dtos/get-channel-type-limit.sto'].ChannelTypeLimitDto },
              getInAppActivated: {},
            },
          },
        ],
        [
          import('./app/organization/organization.controller'),
          {
            OrganizationController: {
              createOrganization: {
                type: t['../../../libs/dal/dist/repositories/organization/organization.entity'].OrganizationEntity,
              },
              listOrganizations: {
                type: [t['../../../libs/dal/dist/repositories/organization/organization.entity'].OrganizationEntity],
              },
              getSelfOrganizationData: {
                type: t['../../../libs/dal/dist/repositories/organization/organization.entity'].OrganizationEntity,
              },
              remove: { type: Object },
              updateMemberRoles: { type: Object },
              listOrganizationMembers: { type: [Object] },
              updateBrandingDetails: {},
              rename: {},
            },
          },
        ],
        [
          import('./app/organization/ee.organization.controller'),
          {
            EEOrganizationController: {
              getMyOrganization: {
                type: t['../../../libs/dal/dist/repositories/organization/organization.entity'].OrganizationEntity,
              },
              updateBrandingDetails: {},
              renameOrganization: {},
            },
          },
        ],
        [
          import('./app/testing/testing.controller'),
          {
            TestingController: {
              clearDB: {},
              getSession: {
                description:
                  'Used for seeding data for client e2e tests,\nCurrently just creates a new user session and returns signed JWT',
                type: Object,
              },
              idempotency: {},
              idempotencyGet: {},
              productFeatureGet: {},
              resourceLimitingDefaultGet: {},
              resourceLimitingEventsGet: {},
            },
          },
        ],
        [
          import('./app/testing/rate-limiting.controller'),
          {
            TestApiRateLimitController: {
              noCategoryNoCost: { type: Boolean },
              noCategorySingleCost: { type: Boolean },
              globalCategoryNoCost: { type: Boolean },
              globalCategorySingleCost: { type: Boolean },
              global: { type: Boolean },
              triggerCategoryNoCost: { type: Boolean },
              triggerCategorySingleCost: { type: Boolean },
              triggerCategoryBulkCost: { type: Boolean },
            },
            TestApiRateLimitBulkController: {
              noCategoryNoCostOverride: { type: Boolean },
              noCategorySingleCostOverride: { type: Boolean },
              globalCategoryNoCostOverride: { type: Boolean },
            },
          },
        ],
        [
          import('./app/testing/auth.controller'),
          { TestApiAuthController: { userRoute: { type: Boolean }, userInaccessibleRoute: { type: Boolean } } },
        ],
        [import('./app/health/health.controller'), { HealthController: { healthCheck: { type: Object } } }],
        [
          import('./app/execution-details/execution-details.controller'),
          {
            ExecutionDetailsController: {
              getExecutionDetailsForNotification: {
                type: [
                  t[
                    '../../../libs/application-generic/build/main/usecases/create-execution-details/dtos/execution-details-response.dto'
                  ].ExecutionDetailsResponseDto,
                ],
              },
            },
          },
        ],
        [
          import('./app/workflows/notification-template.controller'),
          {
            NotificationTemplateController: {
              getNotificationTemplates: { type: t['./app/workflows/dto/workflows.response.dto'].WorkflowsResponseDto },
              updateTemplateById: { type: t['./app/workflows/dto/workflow-response.dto'].WorkflowResponse },
              deleteTemplateById: { type: Boolean },
              getNotificationTemplateById: { type: t['./app/workflows/dto/workflow-response.dto'].WorkflowResponse },
              create: { type: t['./app/workflows/dto/workflow-response.dto'].WorkflowResponse },
              changeActiveStatus: { type: t['./app/workflows/dto/workflow-response.dto'].WorkflowResponse },
            },
          },
        ],
        [
          import('./app/workflows/workflow.controller'),
          {
            WorkflowController: {
              listWorkflows: { type: t['./app/workflows/dto/workflows.response.dto'].WorkflowsResponseDto },
              updateWorkflowById: { type: t['./app/workflows/dto/workflow-response.dto'].WorkflowResponse },
              deleteWorkflowById: { type: Boolean },
              getWorkflowVariables: { type: t['./app/workflows/dto/variables.response.dto'].VariablesResponseDto },
              getWorkflowById: { type: t['./app/workflows/dto/workflow-response.dto'].WorkflowResponse },
              create: { type: t['./app/workflows/dto/workflow-response.dto'].WorkflowResponse },
              updateActiveStatus: { type: t['./app/workflows/dto/workflow-response.dto'].WorkflowResponse },
            },
          },
        ],
        [
          import('./app/events/events.controller'),
          {
            EventsController: {
              trigger: { type: t['./app/events/dtos/trigger-event-response.dto'].TriggerEventResponseDto },
              triggerBulk: { type: [t['./app/events/dtos/trigger-event-response.dto'].TriggerEventResponseDto] },
              broadcastEventToAll: { type: t['./app/events/dtos/trigger-event-response.dto'].TriggerEventResponseDto },
              testEmailMessage: {},
              cancel: { type: Boolean },
            },
          },
        ],
        [
          import('./app/widgets/widgets.controller'),
          {
            WidgetsController: {
              sessionInitialize: {
                type: t['./app/widgets/dtos/session-initialize-response.dto'].SessionInitializeResponseDto,
              },
              getNotificationsFeed: { type: t['./app/widgets/dtos/feeds-response.dto'].FeedResponseDto },
              getUnseenCount: { type: t['./app/widgets/dtos/unseen-count-response.dto'].UnseenCountResponse },
              getUnreadCount: { type: t['./app/widgets/dtos/unseen-count-response.dto'].UnseenCountResponse },
              getCount: { type: t['./app/widgets/dtos/unseen-count-response.dto'].UnseenCountResponse },
              markMessageAs: { type: [t['../../../libs/dal/dist/repositories/message/message.entity'].MessageEntity] },
              markMessagesAs: { type: [t['../../../libs/dal/dist/repositories/message/message.entity'].MessageEntity] },
              removeMessage: { type: t['../../../libs/dal/dist/repositories/message/message.entity'].MessageEntity },
              removeAllMessages: {},
              removeMessagesBulk: {},
              markAllUnreadAsRead: { type: Number },
              markAllUnseenAsSeen: { type: Number },
              markActionAsSeen: { type: t['../../../libs/dal/dist/repositories/message/message.entity'].MessageEntity },
              getOrganizationData: { type: t['./app/widgets/dtos/organization-response.dto'].OrganizationResponseDto },
              getSubscriberPreference: { type: [Object] },
              getSubscriberPreferenceByLevel: {},
              updateSubscriberPreference: {
                type: t['./app/widgets/dtos/update-subscriber-preference-response.dto']
                  .UpdateSubscriberPreferenceResponseDto,
              },
              updateSubscriberGlobalPreference: {},
              logUsage: { type: t['./app/widgets/dtos/log-usage-response.dto'].LogUsageResponseDto },
            },
          },
        ],
        [
          import('./app/subscribers/subscribers.controller'),
          {
            SubscribersController: {
              listSubscribers: {},
              getSubscriber: { type: t['./app/subscribers/dtos/subscriber-response.dto'].SubscriberResponseDto },
              createSubscriber: { type: t['./app/subscribers/dtos/subscriber-response.dto'].SubscriberResponseDto },
              bulkCreateSubscribers: {},
              updateSubscriber: { type: t['./app/subscribers/dtos/subscriber-response.dto'].SubscriberResponseDto },
              updateSubscriberChannel: {
                type: t['./app/subscribers/dtos/subscriber-response.dto'].SubscriberResponseDto,
              },
              modifySubscriberChannel: {
                type: t['./app/subscribers/dtos/subscriber-response.dto'].SubscriberResponseDto,
              },
              deleteSubscriberCredentials: {},
              updateSubscriberOnlineFlag: {
                type: t['./app/subscribers/dtos/subscriber-response.dto'].SubscriberResponseDto,
              },
              removeSubscriber: {
                type: t['./app/subscribers/dtos/delete-subscriber-response.dto'].DeleteSubscriberResponseDto,
              },
              listSubscriberPreferences: {
                type: [
                  t['./app/widgets/dtos/update-subscriber-preference-response.dto']
                    .UpdateSubscriberPreferenceResponseDto,
                ],
              },
              getSubscriberPreferenceByLevel: {
                type: [
                  t['./app/subscribers/dtos/get-subscriber-preferences-response.dto']
                    .GetSubscriberPreferencesResponseDto,
                ],
              },
              updateSubscriberPreference: {
                type: t['./app/widgets/dtos/update-subscriber-preference-response.dto']
                  .UpdateSubscriberPreferenceResponseDto,
              },
              updateSubscriberGlobalPreferences: {},
              getNotificationsFeed: { type: t['./app/widgets/dtos/feeds-response.dto'].FeedResponseDto },
              getUnseenCount: { type: t['./app/widgets/dtos/unseen-count-response.dto'].UnseenCountResponse },
              markMessageAs: { type: [t['../../../libs/dal/dist/repositories/message/message.entity'].MessageEntity] },
              markMessagesAs: { type: [t['../../../libs/dal/dist/repositories/message/message.entity'].MessageEntity] },
              markAllUnreadAsRead: { type: Number },
              markActionAsSeen: { type: t['./app/widgets/dtos/message-response.dto'].MessageResponseDto },
              chatOauthCallback: { type: Object },
              chatAccessOauth: {},
            },
          },
        ],
        [
          import('./app/content-templates/content-templates.controller'),
          {
            ContentTemplatesController: {
              previewEmail: {},
              previewInApp: {},
              previewSms: {},
              previewChat: {},
              previewPush: {},
            },
          },
        ],
        [
          import('./app/topics/topics.controller'),
          {
            TopicsController: {
              createTopic: { type: t['./app/topics/dtos/create-topic.dto'].CreateTopicResponseDto },
              addSubscribers: {},
              getTopicSubscriber: { type: t['./app/topics/dtos/topic-subscriber.dto'].TopicSubscriberDto },
              removeSubscribers: {},
              listTopics: { type: t['./app/topics/dtos/filter-topics.dto'].FilterTopicsResponseDto },
              deleteTopic: {},
              getTopic: { type: t['./app/topics/dtos/get-topic.dto'].GetTopicResponseDto },
              renameTopic: { type: t['./app/topics/dtos/rename-topic.dto'].RenameTopicResponseDto },
            },
          },
        ],
        [
          import('./app/tenant/tenant.controller'),
          {
            TenantController: {
              listTenants: {},
              getTenantById: { type: t['./app/tenant/dtos/get-tenant-response.dto'].GetTenantResponseDto },
              createTenant: { type: t['./app/tenant/dtos/create-tenant-response.dto'].CreateTenantResponseDto },
              updateTenant: { type: t['./app/tenant/dtos/update-tenant-response.dto'].UpdateTenantResponseDto },
              removeTenant: {},
            },
          },
        ],
        [
          import('./app/notifications/notification.controller'),
          {
            NotificationsController: {
              listNotifications: { type: t['./app/notifications/dtos/activities-response.dto'].ActivitiesResponseDto },
              getActivityStats: {
                type: t['./app/notifications/dtos/activity-stats-response.dto'].ActivityStatsResponseDto,
              },
              getActivityGraphStats: {
                type: [t['./app/notifications/dtos/activity-graph-states-response.dto'].ActivityGraphStatesResponse],
              },
              getNotification: {
                type: t['./app/notifications/dtos/activities-response.dto'].ActivityNotificationResponseDto,
              },
            },
          },
        ],
        [
          import('./app/storage/storage.controller'),
          {
            StorageController: {
              signedUrl: { type: t['./app/storage/dtos/upload-url-response.dto'].UploadUrlResponse },
            },
          },
        ],
        [
          import('./app/invites/invites.controller'),
          {
            InvitesController: {
              getInviteData: { type: Object },
              acceptInviteToken: { type: String },
              inviteMember: {},
              resendInviteMember: {},
              bulkInviteMembers: { type: [Object] },
              inviteCheckWebhook: {},
            },
          },
        ],
        [
          import('./app/feeds/feeds.controller'),
          {
            FeedsController: {
              createFeed: { type: t['./app/feeds/dto/feed-response.dto'].FeedResponseDto },
              getFeeds: { type: [t['./app/feeds/dto/feed-response.dto'].FeedResponseDto] },
              deleteFeedById: { type: [t['./app/feeds/dto/feed-response.dto'].FeedResponseDto] },
            },
          },
        ],
        [
          import('./app/messages/messages.controller'),
          {
            MessagesController: {
              getMessages: { type: t['./app/widgets/dtos/message-response.dto'].MessagesResponseDto },
              deleteMessage: { type: t['./app/messages/dtos/delete-message-response.dto'].DeleteMessageResponseDto },
              deleteMessagesByTransactionId: {},
            },
          },
        ],
        [
          import('./app/partner-integrations/partner-integrations.controller'),
          {
            PartnerIntegrationsController: {
              setupVercelIntegration: {
                type: t['./app/partner-integrations/dtos/setup-vercel-integration-response.dto']
                  .SetupVercelConfigurationResponseDto,
              },
              getVercelProjects: {},
              completeVercelIntegration: {},
              getVercelConfigurationDetails: {},
              updateVercelConfiguration: {},
            },
          },
        ],
        [
          import('./app/inbound-parse/inbound-parse.controller'),
          {
            InboundParseController: {
              getMxRecordStatus: { type: t['./app/inbound-parse/dtos/get-mx-record.dto'].GetMxRecordResponseDto },
            },
          },
        ],
        [
          import('./app/blueprint/blueprint.controller'),
          {
            BlueprintController: {
              getGroupedBlueprints: {
                type: t['./app/blueprint/dto/grouped-blueprint.response.dto'].GroupedBlueprintResponse,
              },
              getBlueprintById: { type: t['./app/blueprint/dto/get-blueprint.response.dto'].GetBlueprintResponse },
            },
          },
        ],
        [
          import('./app/workflow-overrides/workflow-overrides.controller'),
          {
            WorkflowOverridesController: {
              create: {
                type: t['./app/workflow-overrides/dto/create-workflow-override-response.dto']
                  .CreateWorkflowOverrideResponseDto,
              },
              updateWorkflowOverrideById: {
                type: t['./app/workflow-overrides/dto/update-workflow-override-response.dto']
                  .UpdateWorkflowOverrideResponseDto,
              },
              updateWorkflowOverride: {
                type: t['./app/workflow-overrides/dto/update-workflow-override-response.dto']
                  .UpdateWorkflowOverrideResponseDto,
              },
              getWorkflowOverrideById: {
                type: t['./app/workflow-overrides/dto/get-workflow-override-response.dto']
                  .GetWorkflowOverrideResponseDto,
              },
              getWorkflowOverride: {
                type: t['./app/workflow-overrides/dto/get-workflow-override-response.dto']
                  .GetWorkflowOverrideResponseDto,
              },
              deleteWorkflowOverride: { type: Boolean },
              getWorkflowOverrides: {
                type: t['./app/workflow-overrides/dto/get-workflow-overrides-response.dto']
                  .GetWorkflowOverridesResponseDto,
              },
            },
          },
        ],
        [import('./app/analytics/analytics.controller'), { AnalyticsController: { trackEvent: { type: Object } } }],
        [
          import('./app/inbox/inbox.controller'),
          {
            InboxController: {
              sessionInitialize: {
                type: t['./app/inbox/dtos/subscriber-session-response.dto'].SubscriberSessionResponseDto,
              },
              getNotifications: {
                type: t['./app/inbox/dtos/get-notifications-response.dto'].GetNotificationsResponseDto,
              },
              getNotificationsCount: {
                type: t['./app/inbox/dtos/get-notifications-count-response.dto'].GetNotificationsCountResponseDto,
              },
              markNotificationAsRead: { type: Object },
              markNotificationAsUnread: { type: Object },
              markNotificationAsArchived: { type: Object },
              markNotificationAsUnarchived: { type: Object },
              completeAction: { type: Object },
              revertAction: { type: Object },
              markAllAsRead: {},
              markAllAsArchived: {},
              markAllAsReadArchived: {},
            },
          },
        ],
        [
          import('./app/auth/legacy-ee-auth/auth.controller'),
          { AuthController: { googleAuth: {}, googleCallback: { type: Object } } },
        ],
      ],
    },
  };
};
