// eslint-disable-next-line no-restricted-imports
import { DalService, IntegrationRepository, NotificationGroupRepository, NotificationTemplateEntity } from '@novu/dal';
import {
  ChannelTypeEnum,
  getGetStartedTemplateIds,
  getPopularTemplateIds,
  MemberStatusEnum,
  ProvidersIdEnum,
  StepTypeEnum,
  TriggerTypeEnum,
} from '@novu/shared';
import {
  CreateTemplatePayload,
  EnvironmentService,
  JobsService,
  NotificationsService,
  NotificationTemplateService,
  OrganizationService,
  SubscribersService,
  UserService,
  UserSession,
} from '@novu/testing';
import { EnvironmentEntity, OrganizationEntity, UserEntity } from '@novu/dal/src';
import { Page } from '@playwright/test';

export interface SessionData {
  token: string;
  user: UserEntity;
  organization: OrganizationEntity;
  environment: EnvironmentEntity;
  templates: NotificationTemplateEntity[]; // You can replace 'any' with a more specific type if needed
}

export interface OverrideSessionOptions {
  singleTokenInjection?: boolean;
  page?: Page;
}

export interface ISessionOptions {
  noEnvironment?: boolean;
  partialTemplate?: Partial<NotificationTemplateEntity>;
  noTemplates?: boolean;
  showOnBoardingTour?: boolean;
  overrideSessionOptions?: OverrideSessionOptions;
  shouldSkipLogin?: boolean;
}

export async function getSession(settings: ISessionOptions = {}): Promise<SessionData> {
  const dal = new DalService();
  await dal.connect(process.env.MONGODB_URL ?? '');

  const session = new UserSession('http://127.0.0.1:1336');
  await session.initialize({
    noEnvironment: settings?.noEnvironment,
    showOnBoardingTour: settings?.showOnBoardingTour,
  });

  const notificationTemplateService = new NotificationTemplateService(
    session.user._id,
    session.organization._id,
    session.environment._id as string
  );

  let templates;
  if (!settings?.noTemplates) {
    const templatePartial = settings?.partialTemplate || {};

    templates = await Promise.all([
      notificationTemplateService.createTemplate({ ...(templatePartial as any) }),
      notificationTemplateService.createTemplate({
        active: false,
        draft: true,
      }),
      notificationTemplateService.createTemplate(),
      notificationTemplateService.createTemplate(),
      notificationTemplateService.createTemplate(),
      notificationTemplateService.createTemplate(),
    ]);
  }

  return {
    token: session.token.split(' ')[1],
    user: session.user,
    organization: session.organization,
    environment: session.environment,
    templates,
  };
}

export async function deleteProvider(query: {
  providerId: ProvidersIdEnum;
  channel: ChannelTypeEnum;
  environmentId: string;
  organizationId: string;
}) {
  const dal = new DalService();
  await dal.connect(process.env.MONGODB_URL ?? '');

  const repository = new IntegrationRepository();

  return await repository.deleteMany({
    channel: query.channel,
    providerId: query.providerId,
    _environmentId: query.environmentId,
    _organizationId: query.organizationId,
  });
}

export async function createNotifications({
  identifier,
  token,
  count = 1,
  subscriberId,
  environmentId,
  organizationId,
  templateId,
}: {
  identifier: string;
  token: string;
  count?: number;
  subscriberId?: string;
  environmentId: string;
  organizationId: string;
  templateId?: string;
}) {
  const jobsService = new JobsService();
  let subId = subscriberId;
  if (!subId) {
    const subscribersService = new SubscribersService(organizationId, environmentId);
    const subscriber = await subscribersService.createSubscriber();
    subId = subscriber.subscriberId;
  }

  const triggerIdentifier = identifier;
  const service = new NotificationsService(token);
  const session = new UserSession(process.env.API_URL);

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < count; i++) {
    await service.triggerEvent(triggerIdentifier, subId, {});
  }

  if (organizationId) {
    await session.awaitRunningJobs(templateId, undefined, 0, organizationId);
  }

  while ((await jobsService.standardQueue.getWaitingCount()) || (await jobsService.standardQueue.getActiveCount())) {
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  return 'ok';
}

export async function clearDatabase() {
  const dal = new DalService();
  await dal.connect(process.env.MONGODB_URL ?? '');
  await dal.destroy();

  return true;
}

export async function seedDatabase(): Promise<UserEntity> {
  const dal = new DalService();
  await dal.connect(process.env.MONGODB_URL ?? '');

  const userService = new UserService();

  return await userService.createTestUser();
}

export async function addOrganization(userId: string) {
  const dal = new DalService();
  await dal.connect(process.env.MONGODB_URL ?? '');
  const organizationService = new OrganizationService();

  const organization = await organizationService.createOrganization();
  await organizationService.addMember(organization._id as string, userId);

  return organization;
}

export async function createWorkflows({
  userId,
  organizationId,
  environmentId,
  workflows,
}: {
  userId: string;
  organizationId: string;
  environmentId: string;
  workflows: Partial<CreateTemplatePayload>[];
}) {
  const dal = new DalService();
  await dal.connect(process.env.MONGODB_URL ?? '');

  const notificationTemplateService = new NotificationTemplateService(userId, organizationId, environmentId);

  return Promise.all(workflows.map((workflow) => notificationTemplateService.createTemplate(workflow)));
}

export async function inviteUser(
  session: SessionData,
  email: string
): Promise<{ token: string; inviter: any; organization: any }> {
  const apiUrl = process.env.API_URL;

  const inviteResponse = await fetch(`${apiUrl}/v1/invites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.token}`,
    },
    body: JSON.stringify({
      email,
      role: 'ADMIN',
    }),
  });

  if (!inviteResponse.ok) {
    throw new Error(`Failed to send invite: ${await inviteResponse.text()}`);
  }

  const membersResponse = await fetch(`${apiUrl}/v1/organizations/members`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });

  if (!membersResponse.ok) {
    throw new Error(`Failed to fetch members: ${await membersResponse.text()}`);
  }

  const membersData = await membersResponse.json();
  const invitedMember = membersData.data.find((member) => member.memberStatus === MemberStatusEnum.INVITED);

  if (!invitedMember || !invitedMember.invite.token) {
    throw new Error('No invited member found or no token available');
  }

  return {
    token: invitedMember.invite.token,
    inviter: session.user,
    organization: session.organization,
  };
}

export async function makeBlueprints() {
  const dal = new DalService();
  await dal.connect(process.env.MONGODB_URL ?? '');

  const userService = new UserService();
  const user = await userService.createUser();

  const notificationGroupRepository = new NotificationGroupRepository();
  const organizationService = new OrganizationService();
  const environmentService = new EnvironmentService();

  let organization = await organizationService.getOrganization(process.env.BLUEPRINT_CREATOR ?? '');

  if (!organization) {
    organization = await organizationService.createOrganization({ _id: process.env.BLUEPRINT_CREATOR });
  }

  const organizationId = organization._id;

  let developmentEnvironment = await environmentService.getDevelopmentEnvironment(organizationId);
  if (!developmentEnvironment) {
    developmentEnvironment = await environmentService.createDevelopmentEnvironment(organizationId, user._id);
  }

  let productionEnvironment = await environmentService.getProductionEnvironment(organizationId);
  if (!productionEnvironment) {
    productionEnvironment = await environmentService.createProductionEnvironment(
      organizationId,
      user._id,
      developmentEnvironment._id
    );
  }

  const productionEnvironmentId = productionEnvironment._id;

  const productionGeneralGroup = await notificationGroupRepository.findOne({
    name: 'General',
    _environmentId: productionEnvironmentId,
    _organizationId: organizationId,
  });
  const productionGetStartedGroup = await notificationGroupRepository.findOne({
    name: 'Get started',
    _environmentId: productionEnvironmentId,
    _organizationId: organizationId,
  });

  if (!productionGeneralGroup) {
    await notificationGroupRepository.create({
      name: 'General',
      _environmentId: productionEnvironmentId,
      _organizationId: organizationId,
    });
  }
  if (!productionGetStartedGroup) {
    await notificationGroupRepository.create({
      name: 'Get started',
      _environmentId: productionEnvironmentId,
      _organizationId: organizationId,
    });
  }

  const productionNotificationTemplateService = new NotificationTemplateService(
    user._id,
    organizationId,
    productionEnvironmentId
  );

  const popularTemplateIds = getPopularTemplateIds({ production: false });
  const getStartedTemplateIds = getGetStartedTemplateIds({ production: false });

  const blueprintTemplates = await productionNotificationTemplateService.getBlueprintTemplates(
    organizationId,
    productionEnvironmentId
  );

  if (blueprintTemplates.length === 0) {
    return await Promise.all([
      productionNotificationTemplateService.createTemplate({
        _id: popularTemplateIds[0],
        noFeedId: true,
        noLayoutId: true,
        name: ':fa-solid fa-star: Super cool workflow',
        isBlueprint: true,
      }),
      productionNotificationTemplateService.createTemplate({
        _id: popularTemplateIds[1],
        noFeedId: true,
        noLayoutId: true,
        name: ':fa-solid fa-lock: Password reset',
        isBlueprint: true,
      }),
      productionNotificationTemplateService.createTemplate({
        _id: getStartedTemplateIds[0],
        noFeedId: true,
        noLayoutId: true,
        name: ':fa-solid fa-clock: Delay',
        isBlueprint: true,
        steps: [
          {
            type: StepTypeEnum.DELAY,
            name: 'Delay',
            content: '',
          },
        ],
        triggers: [
          {
            identifier: 'get-started-delay',
            type: TriggerTypeEnum.EVENT,
            variables: [],
          },
        ],
      }),
      productionNotificationTemplateService.createTemplate({
        _id: getStartedTemplateIds[1],
        noFeedId: true,
        noLayoutId: true,
        name: ':fa-solid fa-layer-group: Digest',
        isBlueprint: true,
        steps: [
          {
            type: StepTypeEnum.DIGEST,
            name: 'Digest',
            content: '',
          },
        ],
        triggers: [
          {
            identifier: 'get-started-digest',
            type: TriggerTypeEnum.EVENT,
            variables: [],
          },
        ],
      }),
      productionNotificationTemplateService.createTemplate({
        _id: getStartedTemplateIds[2],
        noFeedId: true,
        noLayoutId: true,
        name: ':fa-solid fa-bell: In-App',
        isBlueprint: true,
        triggers: [
          {
            identifier: 'get-started-in-app',
            type: TriggerTypeEnum.EVENT,
            variables: [],
          },
        ],
      }),
      productionNotificationTemplateService.createTemplate({
        _id: getStartedTemplateIds[3],
        noFeedId: true,
        noLayoutId: true,
        name: ':fa-solid fa-earth-americas: Multi-channel',
        isBlueprint: true,
        triggers: [
          {
            identifier: 'get-started-multi-channel',
            type: TriggerTypeEnum.EVENT,
            variables: [],
          },
        ],
      }),
    ]);
  }

  return blueprintTemplates;
}
