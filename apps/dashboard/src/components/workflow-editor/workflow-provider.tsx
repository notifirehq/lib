import { PatchWorkflowDto, UpdateWorkflowDto, WorkflowResponseDto } from '@novu/shared';
import { createContext, ReactNode, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useBlocker, useNavigate, useParams } from 'react-router-dom';

import { useEnvironment } from '@/context/environment/hooks';
import { useFetchWorkflow, useUpdateWorkflow } from '@/hooks';
import { usePatchWorkflow } from '@/hooks/use-patch-workflow';
import { createContextHook } from '@/utils/context';
import { buildRoute, ROUTES } from '@/utils/routes';
import { toast } from 'sonner';
import { RiCloseFill } from 'react-icons/ri';
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from '@/components/primitives/alert-dialog';
import { RiAlertFill } from 'react-icons/ri';
import { CheckCircleIcon } from 'lucide-react';
import { useInvocationQueue } from '@/hooks/use-invocation-queue';
import { showErrorToast, showSavingToast, showSuccessToast } from './toasts';

export type WorkflowContextType = {
  isPending: boolean;
  workflow?: WorkflowResponseDto;
  update: (data: UpdateWorkflowDto) => void;
  patch: (data: PatchWorkflowDto) => void;
};

export const WorkflowContext = createContext<WorkflowContextType>({} as WorkflowContextType);

export const WorkflowProvider = ({ children }: { children: ReactNode }) => {
  const { currentEnvironment } = useEnvironment();
  const { workflowSlug = '' } = useParams<{ workflowSlug?: string; stepSlug?: string }>();
  const [toastId, setToastId] = useState<string | number>('');
  const navigate = useNavigate();

  const { workflow, isPending, error } = useFetchWorkflow({
    workflowSlug,
  });

  const { enqueue, hasPendingItems } = useInvocationQueue();
  const blocker = useBlocker(({ nextLocation }) => {
    const workflowEditorBasePath = buildRoute(ROUTES.EDIT_WORKFLOW, {
      workflowSlug,
      environmentSlug: currentEnvironment?.slug ?? '',
    });

    const isLeavingEditor = !nextLocation.pathname.startsWith(workflowEditorBasePath);

    return isLeavingEditor && isUpdatePatchPending;
  });
  const isBlocked = blocker.state === 'blocked';
  const isAllowedToUnblock = isBlocked && !hasPendingItems;

  const { patchWorkflow, isPending: isPatchPending } = usePatchWorkflow({
    onMutate: () => {
      // when the navigation is blocked, we don't want to show the toast
      if (isBlocked) {
        return;
      }

      showSavingToast(setToastId);
    },
    onSuccess: async () => {
      // when the navigation is blocked, we don't want to show the toast
      if (isBlocked) {
        return;
      }

      showSuccessToast(toastId);
    },
    onError: () => {
      showErrorToast(toastId);
    },
  });

  const { updateWorkflow, isPending: isUpdatePending } = useUpdateWorkflow({
    onMutate: () => {
      // when the navigation is blocked, we don't want to show the toast
      if (isBlocked) {
        return;
      }

      showSavingToast(setToastId);
    },
    onSuccess: async () => {
      // when the navigation is blocked, we don't want to show the toast
      if (isBlocked) {
        return;
      }

      showSuccessToast(toastId);
    },
    onError: () => {
      showErrorToast(toastId);
    },
  });

  const isUpdatePatchPending = isPatchPending || isUpdatePending || hasPendingItems;

  const update = useCallback(
    (data: UpdateWorkflowDto) => {
      if (workflow) {
        enqueue(() => updateWorkflow({ workflowId: workflow.workflowId, workflow: { ...data } }));
      }
    },
    [enqueue, updateWorkflow, workflow]
  );

  const patch = useCallback(
    (data: PatchWorkflowDto) => {
      if (workflow) {
        enqueue(() => patchWorkflow({ workflowId: workflow.workflowId, workflow: { ...data } }));
      }
    },
    [enqueue, patchWorkflow, workflow]
  );

  useLayoutEffect(() => {
    if (error) {
      navigate(buildRoute(ROUTES.WORKFLOWS, { environmentSlug: currentEnvironment?.slug ?? '' }));
    }

    if (!workflow) {
      return;
    }
  }, [workflow, error, navigate, currentEnvironment]);

  const handleCancelNavigation = useCallback(() => {
    if (blocker.state === 'blocked') {
      blocker.reset();
    }
  }, [blocker]);

  /*
   * If there was a pending navigation when saving was in progress,
   * proceed with that navigation now that changes are saved
   *
   * small timeout to briefly show the success dialog before navigating
   */
  useEffect(() => {
    if (isAllowedToUnblock) {
      toast.dismiss();
      setTimeout(() => {
        blocker.proceed?.();
      }, 500);
    }
  }, [isAllowedToUnblock, blocker]);

  const value = useMemo(() => ({ update, patch, isPending, workflow }), [update, patch, isPending, workflow]);

  return (
    <>
      <SavingChangesDialog
        isOpen={blocker.state === 'blocked'}
        isUpdatePatchPending={isUpdatePatchPending}
        onCancel={handleCancelNavigation}
      />
      <WorkflowContext.Provider value={value}>{children}</WorkflowContext.Provider>
    </>
  );
};

const SavingChangesDialog = ({
  isOpen,
  isUpdatePatchPending,
  onCancel,
}: {
  isOpen: boolean;
  isUpdatePatchPending: boolean;
  onCancel: () => void;
}) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="w-[26rem]">
        <AlertDialogHeader className="flex flex-row items-start gap-4">
          <div
            className={`rounded-lg p-3 transition-all duration-300 ${
              isUpdatePatchPending ? 'bg-warning/10' : 'bg-success/10 scale-110'
            }`}
          >
            <div className="transition-opacity duration-300">
              {isUpdatePatchPending ? (
                <RiAlertFill className="text-warning animate-in fade-in size-6" />
              ) : (
                <CheckCircleIcon className="text-success animate-in fade-in size-6" />
              )}
            </div>
          </div>
          <div className="space-y-1">
            <div>
              <AlertDialogTitle className="transition-all duration-300">
                {isUpdatePatchPending ? 'Saving changes' : 'Changes saved!'}
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="transition-all duration-300">
              {isUpdatePatchPending ? 'Please wait while we save your changes' : 'Workflow has been saved successfully'}
            </AlertDialogDescription>
          </div>
          {isUpdatePatchPending && (
            <button onClick={onCancel} className="text-gray-500">
              <RiCloseFill className="size-4" />
            </button>
          )}
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const useWorkflow = createContextHook(WorkflowContext);
