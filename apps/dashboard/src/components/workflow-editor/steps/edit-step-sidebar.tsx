import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Sheet,
  SheetContentBase,
  SheetDescription,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
} from '@/components/primitives/sheet';
import { useFetchWorkflow } from '@/hooks/use-fetch-workflow';
import { StepEditor } from '@/components/workflow-editor/steps/step-editor';
import { useFetchStep } from '@/hooks/use-fetch-step';
import { VisuallyHidden } from '@/components/primitives/visually-hidden';
import { PageMeta } from '@/components/page-meta';
import { getStepBase62Id } from '@/utils/step';
import { EXCLUDED_EDITOR_TYPES } from '@/utils/constants';

const transitionSetting = { ease: [0.29, 0.83, 0.57, 0.99], duration: 0.4 };

export const EditStepSidebar = () => {
  const { workflowSlug = '', stepSlug = '' } = useParams<{ workflowSlug: string; stepSlug: string }>();
  const navigate = useNavigate();

  const { workflow } = useFetchWorkflow({
    workflowSlug,
  });

  const { step } = useFetchStep({ workflowSlug, stepSlug });
  const stepType = useMemo(
    () => workflow?.steps.find((el) => getStepBase62Id(el.slug) === getStepBase62Id(stepSlug))?.type,
    [stepSlug, workflow]
  );

  const handleCloseSidebar = () => {
    navigate('..', { relative: 'path' });
  };

  const isNotSupportedEditorType = EXCLUDED_EDITOR_TYPES.includes(stepType ?? '');

  useEffect(() => {
    if (isNotSupportedEditorType) {
      navigate('..', { relative: 'path' });
    }
  }, [isNotSupportedEditorType, navigate]);

  if (isNotSupportedEditorType) {
    return null;
  }

  return (
    <>
      <PageMeta title={`Edit ${step?.name}`} />
      <Sheet open>
        <SheetPortal>
          <SheetOverlay asChild>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={transitionSetting}
            />
          </SheetOverlay>
          <SheetContentBase asChild onInteractOutside={handleCloseSidebar} onEscapeKeyDown={handleCloseSidebar}>
            <motion.div
              initial={{
                x: '100%',
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: '100%',
              }}
              transition={transitionSetting}
              className={
                'bg-background fixed inset-y-0 right-0 z-50 flex h-full w-3/4 flex-col border-l shadow-lg outline-none sm:max-w-[600px]'
              }
            >
              <VisuallyHidden>
                <SheetTitle />
                <SheetDescription />
              </VisuallyHidden>
              {/* TODO: show loading indicator */}
              {workflow && step && stepType && <StepEditor workflow={workflow} step={step} stepType={stepType} />}
            </motion.div>
          </SheetContentBase>
        </SheetPortal>
      </Sheet>
    </>
  );
};
