import {
  ContentIssue,
  RuntimeIssue,
  StepCreateAndUpdateKeys,
  StepIssue,
  StepIssueEnum,
  StepIssues,
  StepIssuesDto,
  WorkflowIssueTypeEnum,
  WorkflowResponseDto,
  WorkflowStatusEnum,
} from '@novu/shared';
import { NotificationStepEntity, NotificationTemplateRepository } from '@novu/dal';
import { Injectable } from '@nestjs/common';
import { WorkflowInternalResponseDto } from '@novu/application-generic';

import { PostProcessWorkflowUpdateCommand } from './post-process-workflow-update.command';
import { OverloadContentDataOnWorkflowUseCase } from '../overload-content-data';

@Injectable()
export class PostProcessWorkflowUpdate {
  constructor(
    private notificationTemplateRepository: NotificationTemplateRepository,
    private overloadContentDataOnWorkflowUseCase: OverloadContentDataOnWorkflowUseCase
  ) {}

  async execute(command: PostProcessWorkflowUpdateCommand): Promise<WorkflowInternalResponseDto> {
    const workflowIssues = await this.validateWorkflow(command);
    const stepIssues = this.validateSteps(command.workflow.steps);
    let transientWorkflow = this.updateIssuesOnWorkflow(command.workflow, workflowIssues, stepIssues);

    transientWorkflow = await this.overloadContentDataOnWorkflowUseCase.execute({
      user: command.user,
      workflow: transientWorkflow,
    });
    transientWorkflow = this.overloadStatusOnWorkflow(transientWorkflow);

    return transientWorkflow;
  }

  private overloadStatusOnWorkflow(workflowWithIssues: WorkflowInternalResponseDto) {
    // eslint-disable-next-line no-param-reassign
    workflowWithIssues.status = this.computeStatus(workflowWithIssues);

    return workflowWithIssues;
  }

  private computeStatus(workflowWithIssues: WorkflowInternalResponseDto) {
    const isWorkflowCompleteAndValid = this.isWorkflowCompleteAndValid(workflowWithIssues);

    return this.calculateStatus(isWorkflowCompleteAndValid, workflowWithIssues);
  }

  private calculateStatus(isGoodWorkflow: boolean, workflowWithIssues: WorkflowInternalResponseDto) {
    if (workflowWithIssues.active === false) {
      return WorkflowStatusEnum.INACTIVE;
    }

    if (isGoodWorkflow) {
      return WorkflowStatusEnum.ACTIVE;
    }

    return WorkflowStatusEnum.ERROR;
  }

  private isWorkflowCompleteAndValid(workflowWithIssues: WorkflowInternalResponseDto) {
    const workflowIssues = workflowWithIssues.issues && Object.keys(workflowWithIssues.issues).length > 0;
    const hasInnerIssues =
      workflowWithIssues.steps
        .map((step) => step.issues)
        .filter((issue) => issue != null)
        .filter((issue) => this.hasBodyIssues(issue) || this.hasControlIssues(issue)).length > 0;

    return !hasInnerIssues && !workflowIssues;
  }

  private hasControlIssues(issue: StepIssues) {
    return issue.controls && Object.keys(issue.controls).length > 0;
  }

  private hasBodyIssues(issue: StepIssues) {
    return issue.body && Object.keys(issue.body).length > 0;
  }
  private validateSteps(steps: NotificationStepEntity[]): Record<string, StepIssuesDto> {
    const stepIdToIssues: Record<string, StepIssuesDto> = {};
    for (const step of steps) {
      stepIdToIssues[step._templateId] = {
        body: this.addStepBodyIssues(step),
        controls: step.issues?.controls,
      };
    }

    return stepIdToIssues;
  }

  private async validateWorkflow(
    command: PostProcessWorkflowUpdateCommand
  ): Promise<Record<keyof WorkflowResponseDto, RuntimeIssue[]>> {
    // @ts-ignore
    const issues: Record<keyof WorkflowResponseDto, RuntimeIssue[]> = {};
    await this.addTriggerIdentifierNotUniqueIfApplicable(command, issues);

    return issues;
  }

  private async addTriggerIdentifierNotUniqueIfApplicable(
    command: PostProcessWorkflowUpdateCommand,
    issues: Record<keyof WorkflowResponseDto, RuntimeIssue[]>
  ) {
    const findAllByTriggerIdentifier = await this.notificationTemplateRepository.findAllByTriggerIdentifier(
      command.user.environmentId,
      command.workflow.triggers[0].identifier
    );
    if (findAllByTriggerIdentifier && findAllByTriggerIdentifier.length > 1) {
      // eslint-disable-next-line no-param-reassign
      command.workflow.triggers[0].identifier = `${command.workflow.triggers[0].identifier}-${command.workflow._id}`;
      // eslint-disable-next-line no-param-reassign
      issues.workflowId = [
        {
          issueType: WorkflowIssueTypeEnum.WORKFLOW_ID_ALREADY_EXISTS,
          message: 'Trigger identifier is not unique',
        },
      ];
    }
  }

  private addStepBodyIssues(step: NotificationStepEntity) {
    // @ts-ignore
    const issues: Record<StepCreateAndUpdateKeys, StepIssue> = {};
    if (!step.name || step.name.trim() === '') {
      issues.name = {
        issueType: StepIssueEnum.MISSING_REQUIRED_VALUE,
        message: 'Step name is missing',
      };
    }

    return issues;
  }

  private updateIssuesOnWorkflow(
    workflow: WorkflowInternalResponseDto,
    workflowIssues: Record<keyof WorkflowResponseDto, RuntimeIssue[]>,
    stepIssuesMap: Record<string, StepIssues>
  ): WorkflowInternalResponseDto {
    const issues = workflowIssues as unknown as Record<string, ContentIssue[]>;
    for (const step of workflow.steps) {
      if (stepIssuesMap[step._templateId]) {
        step.issues = stepIssuesMap[step._templateId];
      } else {
        step.issues = undefined;
      }
    }

    return { ...workflow, issues };
  }
}
