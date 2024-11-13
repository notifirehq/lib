import { WorkflowList } from '@/components/workflow-list';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Input } from '@/components/primitives/input';
import { Button } from '@/components/primitives/button';
import { RiSearch2Line } from 'react-icons/ri';
import { CreateWorkflowButton } from '@/components/create-workflow-button';
import { OptInModal } from '@/components/opt-in-modal';
import { PageMeta } from '@/components/page-meta';

export const WorkflowsPage = () => {
  return (
    <>
      <PageMeta title="Workflows" />
      <DashboardLayout headerStartItems={<h1 className="text-foreground-950">Workflows</h1>}>
        <OptInModal />
        <div className="mt-3 flex justify-between px-2.5 py-2">
          <div className="flex w-[20ch] items-center gap-2 rounded-lg bg-neutral-50 p-2">
            <RiSearch2Line className="text-foreground-400 size-5" />
            <Input placeholder="Search workflows" />
          </div>

          <CreateWorkflowButton asChild>
            <Button variant="primary">Create workflow</Button>
          </CreateWorkflowButton>
        </div>
        <WorkflowList />
      </DashboardLayout>
    </>
  );
};
