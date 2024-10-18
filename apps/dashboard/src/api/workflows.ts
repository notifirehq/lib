import type { CreateWorkflowDto, UpdateWorkflowDto, WorkflowResponseDto } from '@novu/shared';
import { getV2, postV2, putV2 } from './api.client';

export const fetchWorkflow = async ({ workflowId }: { workflowId?: string }): Promise<WorkflowResponseDto> => {
  const { data } = await getV2<{ data: WorkflowResponseDto }>(`/workflows/${workflowId}`);

  return data;
};

export async function createWorkflow(payload: CreateWorkflowDto) {
  return postV2<{ data: WorkflowResponseDto }>(`/workflows`, payload);
}

export const updateWorkflow = async ({
  id,
  workflow,
}: {
  id: string;
  workflow: UpdateWorkflowDto;
}): Promise<WorkflowResponseDto> => {
  const { data } = await putV2<{ data: WorkflowResponseDto }>(`/workflows/${id}`, workflow);

  return data;
};
