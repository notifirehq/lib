import { Injectable } from '@nestjs/common';
import { ChangeRepository, DalException, NotificationTemplateEntity, NotificationTemplateRepository } from '@novu/dal';
import { ChangeEntityTypeEnum } from '@novu/shared';
import {
  AnalyticsService,
  CreateChange,
  CreateChangeCommand,
  DeleteWorkflowUseCase,
  DeleteWorkflowCommand,
  GetWorkflowByIdsUseCase,
  GetWorkflowByIdsCommand,
} from '@novu/application-generic';

import { DeleteNotificationTemplateCommand } from './delete-notification-template.command';
import { ApiException } from '../../../shared/exceptions/api.exception';

/**
 * @deprecated
 * This usecase is deprecated and will be removed in the future.
 * Please use the DeleteWorkflow usecase instead.
 */
@Injectable()
export class DeleteNotificationTemplate {
  constructor(
    private createChange: CreateChange,
    private changeRepository: ChangeRepository,
    private analyticsService: AnalyticsService,
    private deleteWorkflowUseCase: DeleteWorkflowUseCase,
    private notificationTemplateRepository: NotificationTemplateRepository
  ) {}

  async execute(command: DeleteNotificationTemplateCommand) {
    try {
      await this.deleteWorkflowUseCase.execute(
        DeleteWorkflowCommand.create({
          workflowIdOrInternalId: command.templateId,
          environmentId: command.environmentId,
          organizationId: command.organizationId,
          userId: command.userId,
        })
      );

      const parentChangeId: string = await this.changeRepository.getChangeId(
        command.environmentId,
        ChangeEntityTypeEnum.NOTIFICATION_TEMPLATE,
        command.templateId
      );

      const item: NotificationTemplateEntity = (
        await this.notificationTemplateRepository.findDeleted({
          _environmentId: command.environmentId,
          _id: command.templateId,
        })
      )?.[0];

      await this.createChange.execute(
        CreateChangeCommand.create({
          organizationId: command.organizationId,
          environmentId: command.environmentId,
          userId: command.userId,
          item,
          type: ChangeEntityTypeEnum.NOTIFICATION_TEMPLATE,
          changeId: parentChangeId,
        })
      );

      this.analyticsService.track(`Removed Notification Template`, command.userId, {
        _organization: command.organizationId,
        _environment: command.environmentId,
        _templateId: command.templateId,
        data: {
          draft: item.draft,
          critical: item.critical,
        },
      });
    } catch (e) {
      if (e instanceof DalException) {
        throw new ApiException(e.message);
      }
      throw e;
    }

    return true;
  }
}
