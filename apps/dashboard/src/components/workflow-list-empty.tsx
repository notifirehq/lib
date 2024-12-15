import { RiBookMarkedLine, RiRouteFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { Button } from '@/components/primitives/button';
import { VersionControlProd } from '@/components/icons/version-control-prod';
import { VersionControlDev } from '@/components/icons/version-control-dev';
import { CreateWorkflowButton } from '@/components/create-workflow-button';
import { useEnvironment } from '@/context/environment/hooks';
import { LinkButtonIcon, linkButtonVariants } from './primitives/link-button';
import { cn } from '../utils/ui';

export const WorkflowListEmpty = () => {
  const { currentEnvironment, switchEnvironment, oppositeEnvironment } = useEnvironment();

  const isProd = currentEnvironment?.name === 'Production';

  return isProd ? (
    <WorkflowListEmptyProd switchToDev={() => switchEnvironment(oppositeEnvironment?.slug)} />
  ) : (
    <WorkflowListEmptyDev />
  );
};

const WorkflowListEmptyProd = ({ switchToDev }: { switchToDev: () => void }) => (
  <div className="flex h-full w-full flex-col items-center justify-center gap-6">
    <VersionControlProd />
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="text-foreground-900 block font-medium">No workflows in production</span>
      <p className="text-foreground-400 max-w-[60ch] text-sm">
        To sync workflows to production, switch to Development environment, select a workflow and click on 'Sync to
        Production,' or sync via novu CLI for code-first workflows.
      </p>
    </div>

    <div className="flex items-center justify-center gap-6">
      <Link
        to={'https://docs.novu.co/concepts/workflows'}
        target="_blank"
        className={cn(linkButtonVariants({}).root, 'text-foreground-600 gap-1')}
      >
        <RiBookMarkedLine className="size-4" />
        View docs
      </Link>
      <Button variant="primary" className="gap-2" leadingIcon={RiRouteFill} onClick={switchToDev}>
        Switch to Development
      </Button>
    </div>
  </div>
);

const WorkflowListEmptyDev = () => (
  <div className="flex h-full w-full flex-col items-center justify-center gap-6">
    <VersionControlDev />
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="text-foreground-900 block font-medium">
        Create your first workflow to orchestrate notifications
      </span>
      <p className="text-foreground-400 max-w-[60ch] text-sm">
        Workflows in Novu handle event-driven notifications across multiple channels in a single, version-controlled
        flow, with the ability to manage preference for each subscriber.
      </p>
    </div>

    <div className="flex items-center justify-center gap-6">
      <Link
        to={'https://docs.novu.co/concepts/workflows'}
        target="_blank"
        className={cn(linkButtonVariants({}).root, 'text-foreground-600 gap-1')}
      >
        <LinkButtonIcon as={RiBookMarkedLine} className="size-4" />
        View docs
      </Link>
      <CreateWorkflowButton asChild>
        <Button variant="primary" leadingIcon={RiRouteFill} className="gap-2">
          Create workflow
        </Button>
      </CreateWorkflowButton>
    </div>
  </div>
);
