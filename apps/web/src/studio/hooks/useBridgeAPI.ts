import { useMemo } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  buildBridgeHTTPClient,
  type StepPreviewParams,
  type TriggerParams,
  type BridgeStatus,
} from '../../bridgeApi/bridgeApi.client';
import { useStudioState } from '../StudioStateProvider';

function useBridgeAPI() {
  const { bridgeURL } = useStudioState();

  return useMemo(() => buildBridgeHTTPClient(bridgeURL), [bridgeURL]);
}

const BRIDGE_STATUS_REFRESH_INTERVAL_IN_MS = 3 * 1000;

export const useDiscover = (options?: any) => {
  const api = useBridgeAPI();

  return useQuery(
    ['bridge-workflows'],
    async () => {
      return api.discover();
    },
    options
  );
};

export const useHealthCheck = (options?: any) => {
  const api = useBridgeAPI();
  const { bridgeURL } = useStudioState();

  const res = useQuery<BridgeStatus>(
    ['bridge-health-check', bridgeURL],
    async () => {
      try {
        return await api.healthCheck();
      } catch (error) {
        throw error;
      }
    },
    {
      enabled: !!bridgeURL,
      networkMode: 'always',
      refetchOnWindowFocus: true,
      refetchInterval: BRIDGE_STATUS_REFRESH_INTERVAL_IN_MS,
      ...options,
    }
  );

  return {
    ...res,
    bridgeURL,
  };
};

export const useWorkflow = (templateId: string, options?: any) => {
  const api = useBridgeAPI();

  return useQuery(
    ['workflow', templateId],
    async () => {
      return api.getWorkflow(templateId);
    },
    options
  );
};

export const useWorkflowPreview = (
  { workflowId, stepId, controls = {}, payload = {} }: StepPreviewParams,
  options?: any
) => {
  const api = useBridgeAPI();

  return useQuery(
    ['workflow-preview', workflowId, stepId, controls, payload],
    async () => {
      return api.getStepPreview({ workflowId, stepId, payload, controls });
    },
    options
  );
};

export const useWorkflowTrigger = () => {
  const api = useBridgeAPI();
  const state = useStudioState();

  const { mutateAsync, ...rest } = useMutation(api.trigger);

  const bridgeUrl = state.local ? state.tunnelBridgeURL : state.storedBridgeURL;

  async function trigger(params: TriggerParams): Promise<{ data: { transactionId: string } }> {
    return mutateAsync({ ...params, bridgeUrl });
  }

  return {
    ...rest,
    mutateAsync,
    trigger,
  };
};
