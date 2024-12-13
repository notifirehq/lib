import { NotificationGroupRepository, NotificationStepEntity, NotificationTemplateEntity } from '@novu/dal';
import {
  CreateWorkflowDto,
  DEFAULT_WORKFLOW_PREFERENCES,
  slugify,
  StepCreateDto,
  StepDto,
  StepUpdateDto,
  UpdateWorkflowDto,
  UserSessionData,
  WorkflowCreationSourceEnum,
  WorkflowOriginEnum,
  WorkflowResponseDto,
  WorkflowTypeEnum,
} from '@novu/shared';
import {
  CreateWorkflow as CreateWorkflowGeneric,
  CreateWorkflowCommand,
  GetWorkflowByIdsCommand,
  GetWorkflowByIdsUseCase,
  Instrument,
  InstrumentUsecase,
  NotificationStep,
  shortId,
  UpdateWorkflow as UpdateWorkflowGeneric,
  UpdateWorkflowCommand,
  WorkflowInternalResponseDto,
} from '@novu/application-generic';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UpsertWorkflowCommand } from './upsert-workflow.command';
import { stepTypeToControlSchema } from '../../shared';
import { PostProcessWorkflowUpdate } from '../post-process-workflow-update';
import { GetWorkflowCommand, GetWorkflowUseCase } from '../get-workflow';
import { UpsertWorkflowDataCommand } from './upsert-workflow-data.command';

@Injectable()
export class UpsertWorkflowUseCase {
  constructor(
    private createWorkflowGenericUsecase: CreateWorkflowGeneric,
    private updateWorkflowGenericUsecase: UpdateWorkflowGeneric,
    private notificationGroupRepository: NotificationGroupRepository,
    private workflowUpdatePostProcess: PostProcessWorkflowUpdate,
    private getWorkflowByIdsUseCase: GetWorkflowByIdsUseCase,
    private getWorkflowUseCase: GetWorkflowUseCase
  ) {}

  @InstrumentUsecase()
  async execute(command: UpsertWorkflowCommand): Promise<WorkflowResponseDto> {
    const workflowForUpdate = await this.queryWorkflow(command);
    const persistedWorkflow = await this.createOrUpdateWorkflow(workflowForUpdate, command);
    const validatedWorkflowWithIssues = await this.workflowUpdatePostProcess.execute({
      user: command.user,
      workflow: persistedWorkflow,
    });
    await this.persistWorkflow(validatedWorkflowWithIssues);

    return await this.getWorkflowUseCase.execute(
      GetWorkflowCommand.create({
        workflowIdOrInternalId: validatedWorkflowWithIssues._id,
        user: command.user,
      })
    );
  }

  @Instrument()
  private async getWorkflow(workflowId: string, command: UpsertWorkflowCommand): Promise<WorkflowInternalResponseDto> {
    return await this.getWorkflowByIdsUseCase.execute(
      GetWorkflowByIdsCommand.create({
        environmentId: command.user.environmentId,
        organizationId: command.user.organizationId,
        userId: command.user._id,
        workflowIdOrInternalId: workflowId,
      })
    );
  }

  @Instrument()
  private async persistWorkflow(workflowWithIssues: WorkflowInternalResponseDto) {
    const command = UpdateWorkflowCommand.create({
      id: workflowWithIssues._id,
      environmentId: workflowWithIssues._environmentId,
      organizationId: workflowWithIssues._organizationId,
      userId: workflowWithIssues._creatorId,
      type: workflowWithIssues.type!,
      ...workflowWithIssues,
    });

    await this.updateWorkflowGenericUsecase.execute(command);
  }

  @Instrument()
  private async queryWorkflow(command: UpsertWorkflowCommand): Promise<WorkflowInternalResponseDto | null> {
    if (!command.workflowIdOrInternalId) {
      return null;
    }

    return await this.getWorkflowByIdsUseCase.execute(
      GetWorkflowByIdsCommand.create({
        environmentId: command.user.environmentId,
        organizationId: command.user.organizationId,
        userId: command.user._id,
        workflowIdOrInternalId: command.workflowIdOrInternalId,
      })
    );
  }

  @Instrument()
  private async createOrUpdateWorkflow(
    existingWorkflow: NotificationTemplateEntity | null,
    command: UpsertWorkflowCommand
  ): Promise<WorkflowInternalResponseDto> {
    if (existingWorkflow && isWorkflowUpdateDto(command.workflowDto, command.workflowIdOrInternalId)) {
      return await this.updateWorkflowGenericUsecase.execute(
        UpdateWorkflowCommand.create(
          this.convertCreateToUpdateCommand(command.workflowDto, command.user, existingWorkflow)
        )
      );
    }

    return await this.createWorkflowGenericUsecase.execute(
      CreateWorkflowCommand.create(await this.buildCreateWorkflowGenericCommand(command))
    );
  }

  @Instrument()
  private async buildCreateWorkflowGenericCommand(command: UpsertWorkflowCommand): Promise<CreateWorkflowCommand> {
    const { user } = command;
    // It's safe to assume we're dealing with CreateWorkflowDto on the creation path
    const workflowDto = command.workflowDto as CreateWorkflowDto;
    const isWorkflowActive = workflowDto?.active ?? true;
    const notificationGroupId = await this.getNotificationGroup(command.user.environmentId);

    if (!notificationGroupId) {
      throw new BadRequestException('Notification group not found');
    }

    return {
      notificationGroupId,
      environmentId: user.environmentId,
      organizationId: user.organizationId,
      userId: user._id,
      name: workflowDto.name,
      __source: workflowDto.__source || WorkflowCreationSourceEnum.DASHBOARD,
      type: WorkflowTypeEnum.BRIDGE,
      origin: WorkflowOriginEnum.NOVU_CLOUD,
      steps: this.mapSteps(workflowDto.steps),
      active: isWorkflowActive,
      description: workflowDto.description || '',
      tags: workflowDto.tags || [],
      userPreferences: command.workflowDto.preferences?.user ?? null,
      defaultPreferences: command.workflowDto.preferences?.workflow ?? DEFAULT_WORKFLOW_PREFERENCES,
      triggerIdentifier: slugify(workflowDto.name),
    };
  }

  private convertCreateToUpdateCommand(
    workflowDto: UpdateWorkflowDto,
    user: UserSessionData,
    existingWorkflow: NotificationTemplateEntity
  ): UpdateWorkflowCommand {
    return {
      id: existingWorkflow._id,
      environmentId: existingWorkflow._environmentId,
      organizationId: user.organizationId,
      userId: user._id,
      name: workflowDto.name,
      steps: this.mapSteps(workflowDto.steps, existingWorkflow),
      rawData: workflowDto,
      type: WorkflowTypeEnum.BRIDGE,
      description: workflowDto.description,
      userPreferences: workflowDto.preferences?.user ?? null,
      defaultPreferences: workflowDto.preferences?.workflow ?? DEFAULT_WORKFLOW_PREFERENCES,
      tags: workflowDto.tags,
      active: workflowDto.active ?? true,
    };
  }
  private mapSteps(
    commandWorkflowSteps: Array<StepCreateDto | StepUpdateDto>,
    persistedWorkflow?: NotificationTemplateEntity | undefined
  ): NotificationStep[] {
    const steps: NotificationStep[] = [];

    for (const step of commandWorkflowSteps) {
      const mappedStep = this.mapSingleStep(persistedWorkflow, step);
      const baseStepId = mappedStep.stepId;

      if (baseStepId) {
        const previousStepIds = steps.map((stepX) => stepX.stepId).filter((id) => id != null);
        mappedStep.stepId = this.generateUniqueStepId(baseStepId, previousStepIds);
      }

      steps.push(mappedStep);
    }

    return steps;
  }

  private generateUniqueStepId(baseStepId: string, previousStepIds: string[]): string {
    let currentStepId = baseStepId;
    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
      if (isUniqueStepId(currentStepId, previousStepIds)) {
        break;
      }
      currentStepId = `${baseStepId}-${shortId()}`;
      attempts += 1;
    }

    if (attempts === maxAttempts && !isUniqueStepId(currentStepId, previousStepIds)) {
      throw new BadRequestException({
        message: 'Failed to generate unique stepId',
        stepId: baseStepId,
      });
    }

    return currentStepId;
  }

  private mapSingleStep(
    persistedWorkflow: NotificationTemplateEntity | undefined,
    step: StepUpdateDto | StepCreateDto
  ): NotificationStep {
    const foundPersistedStep = this.getPersistedStepIfFound(persistedWorkflow, step);
    const stepEntityToReturn = this.buildBaseStepEntity(step, foundPersistedStep);
    if (foundPersistedStep) {
      return {
        ...stepEntityToReturn,
        _id: foundPersistedStep._templateId,
        _templateId: foundPersistedStep._templateId,
        template: { ...stepEntityToReturn.template, _id: foundPersistedStep._templateId },
      };
    }

    return stepEntityToReturn;
  }

  private buildBaseStepEntity(
    step: StepDto | StepUpdateDto,
    foundPersistedStep?: NotificationStepEntity
  ): NotificationStep {
    return {
      template: {
        type: step.type,
        name: step.name,
        controls: foundPersistedStep?.template?.controls || stepTypeToControlSchema[step.type],
        content: '',
      },
      stepId: foundPersistedStep?.stepId || slugify(step.name),
      name: step.name,
    };
  }

  private getPersistedStepIfFound(
    persistedWorkflow: NotificationTemplateEntity | undefined,
    stepUpdateRequest: StepUpdateDto | StepCreateDto
  ) {
    if (!persistedWorkflow?.steps) {
      return;
    }

    for (const persistedStep of persistedWorkflow.steps) {
      if (this.isStepUpdateDto(stepUpdateRequest) && persistedStep._templateId === stepUpdateRequest._id) {
        return persistedStep;
      }
    }
  }

  private isStepUpdateDto(obj: StepUpdateDto | StepCreateDto): obj is StepUpdateDto {
    return typeof obj === 'object' && obj !== null && !!(obj as StepUpdateDto)._id;
  }

  private async getNotificationGroup(environmentId: string): Promise<string | undefined> {
    return (
      await this.notificationGroupRepository.findOne(
        {
          name: 'General',
          _environmentId: environmentId,
        },
        '_id'
      )
    )?._id;
  }
}

function isWorkflowUpdateDto(workflowDto: UpsertWorkflowDataCommand, id?: string): workflowDto is UpdateWorkflowDto {
  return !!id;
}

const isUniqueStepId = (stepIdToValidate: string, otherStepsIds: string[]) => {
  return !otherStepsIds.some((stepId) => stepId === stepIdToValidate);
};
