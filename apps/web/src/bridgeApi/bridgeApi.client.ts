import axios from 'axios';

export type StepPreviewParams = {
  workflowId: string;
  stepId: string;
  payload: Record<string, unknown>;
  controls: Record<string, unknown>;
};

export type TriggerParams = {
  workflowId: string;
  bridgeUrl?: string;
  to: { subscriberId: string; email: string };
  payload: Record<string, unknown>;
};

export type BridgeStatus = {
  status: 'ok';
  bridgeUrl?: string;
};

export function buildBridgeHTTPClient(baseURL: string) {
  const httpClient = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const get = async (url, params = {}) => {
    try {
      const response = await httpClient.get(url, { params });

      return response.data;
    } catch (error) {
      // TODO: Handle error?.response?.data || error?.response || error;
      throw error;
    }
  };

  // POST method
  const post = async (url, data = {}) => {
    try {
      const response = await httpClient.post(url, data);

      return response.data;
    } catch (error) {
      // TODO: Handle error?.response?.data || error?.response || error;
      throw error;
    }
  };

  return {
    /**
     * TODO: Use framework shared types
     */
    async discover(): Promise<{ workflows: any[] }> {
      return get('', {
        action: 'discover',
      });
    },

    async healthCheck(): Promise<BridgeStatus> {
      return get('', {
        action: 'health-check',
      });
    },

    /**
     * TODO: Use framework shared types
     */
    async getWorkflow(workflowId: string): Promise<any> {
      const { workflows } = await this.discover();

      return workflows.find((workflow) => workflow.workflowId === workflowId);
    },

    /**
     * TODO: Use framework shared types
     */
    async getStepPreview({ workflowId, stepId, controls, payload }: StepPreviewParams): Promise<any> {
      return post(`${baseURL}?action=preview&workflowId=${workflowId}&stepId=${stepId}`, {
        // TODO: Rename to controls
        inputs: controls || {},
        // TODO: Rename to payload
        data: payload || {},
      });
    },

    /**
     * TODO: Use framework shared types
     */
    async trigger({ workflowId, bridgeUrl, to, payload }: TriggerParams): Promise<any> {
      payload = payload || {};
      payload.__source = 'studio-test-workflow';

      return post(`${baseURL}?action=trigger&workflowId=${workflowId}`, {
        bridgeUrl,
        to,
        payload,
      });
    },
  };
}
