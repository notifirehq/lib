import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { RiPlayCircleLine } from 'react-icons/ri';
// eslint-disable-next-line
// @ts-ignore
import { TestWorkflowLogsSidebar } from './test-workflow-logs-sidebar';
import { useFeatureFlag } from '@/hooks/use-feature-flag';
import { createMockObjectFromSchema, FeatureFlagsKeysEnum } from '@novu/shared';
import { ToastClose, ToastIcon } from '@/components/primitives/sonner';
import { useFetchWorkflow } from '@/hooks/use-fetch-workflow';
import { useTriggerWorkflow } from '@/hooks/use-trigger-workflow';
import { buildRoute, LEGACY_ROUTES, ROUTES } from '@/utils/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { type WorkflowTestDataResponseDto } from '@novu/shared';
import { toast } from 'sonner';
import { Button } from '../../primitives/button';
import { Form } from '../../primitives/form/form';
import { showToast } from '../../primitives/sonner-helpers';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../primitives/tabs';
import { buildDynamicFormSchema, TestWorkflowFormType } from '../schema';
import { TestWorkflowForm } from './test-workflow-form';

export const TestWorkflowTabs = ({ testData }: { testData?: WorkflowTestDataResponseDto }) => {
  const { environmentSlug = '', workflowSlug = '' } = useParams<{ environmentSlug: string; workflowSlug: string }>();

  const { workflow } = useFetchWorkflow({
    workflowSlug,
  });
  const [transactionId, setTransactionId] = useState<string>();
  const isNewActivityFeedEnabled = useFeatureFlag(FeatureFlagsKeysEnum.IS_NEW_DASHBOARD_ACTIVITY_FEED_ENABLED);
  const to = useMemo(() => createMockObjectFromSchema(testData?.to ?? {}), [testData]);
  const payload = useMemo(() => createMockObjectFromSchema(testData?.payload ?? {}), [testData]);
  const form = useForm<TestWorkflowFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(buildDynamicFormSchema({ to: testData?.to ?? {} })),
    values: { to, payload: JSON.stringify(payload, null, 2) },
  });

  const { handleSubmit } = form;
  const { triggerWorkflow, isPending } = useTriggerWorkflow();

  const onSubmit = async (data: TestWorkflowFormType) => {
    try {
      const {
        data: { transactionId: newTransactionId },
      } = await triggerWorkflow({ name: workflow?.workflowId ?? '', to: data.to, payload: data.payload });
      if (!newTransactionId) {
        return showToast({
          variant: 'lg',
          children: ({ close }) => (
            <>
              <ToastIcon variant="error" />
              <div className="flex flex-col gap-2">
                <span className="font-medium">Test workflow failed</span>
                <span className="text-foreground-600 inline">
                  Workflow <span className="font-bold">{workflow?.name}</span> cannot be triggered. Ensure that it is
                  active and requires not further actions.
                </span>
              </div>
              <ToastClose onClick={close} />
            </>
          ),
          options: {
            position: 'bottom-right',
          },
        });
      }
      setTransactionId(newTransactionId);

      if (!isNewActivityFeedEnabled) {
        showToast({
          variant: 'lg',
          children: ({ close }) => (
            <>
              <ToastIcon variant="success" />
              <div className="flex flex-col gap-2">
                <span className="font-medium">Test workflow succeeded</span>
                <span className="text-foreground-600 inline">
                  Workflow <span className="font-bold">{workflow?.name}</span> was triggered successfully.
                </span>
                <Link
                  to={`${LEGACY_ROUTES.ACTIVITY_FEED}?transactionId=${transactionId}`}
                  reloadDocument
                  className="text-primary text-sm font-medium"
                >
                  View activity feed
                </Link>
              </div>
              <ToastClose onClick={close} />
            </>
          ),
          options: {
            position: 'bottom-right',
          },
        });
      }
    } catch (e) {
      toast.error('Failed to trigger workflow', {
        description: e instanceof Error ? e.message : 'There was an error triggering the workflow.',
      });
    }
  };

  return (
    <div className="h-full w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="roun flex h-full flex-1 flex-nowrap">
          <Tabs defaultValue="workflow" className="-mt-[1px] flex flex-1 flex-col" value="trigger">
            <TabsList variant="regular" className="items-center">
              <TabsTrigger value="workflow" asChild variant="regular">
                <Link
                  to={buildRoute(ROUTES.EDIT_WORKFLOW, {
                    environmentSlug,
                    workflowSlug,
                  })}
                >
                  Workflow
                </Link>
              </TabsTrigger>
              <TabsTrigger value="trigger" asChild variant="regular">
                <Link
                  to={buildRoute(ROUTES.TEST_WORKFLOW, {
                    environmentSlug,
                    workflowSlug,
                  })}
                >
                  Trigger
                </Link>
              </TabsTrigger>
              <div className="my-auto ml-auto flex items-center gap-2">
                <Button type="submit" variant="primary" size="sm" className="flex gap-1" isLoading={isPending}>
                  <RiPlayCircleLine className="size-5" />
                  <span>Test workflow</span>
                </Button>
              </div>
            </TabsList>
            <TabsContent value="trigger" className="mt-0 flex w-full flex-1 flex-col overflow-hidden" variant="regular">
              <TestWorkflowForm workflow={workflow} />
            </TabsContent>
          </Tabs>
          {isNewActivityFeedEnabled && <TestWorkflowLogsSidebar transactionId={transactionId} />}
        </form>
      </Form>
    </div>
  );
};
