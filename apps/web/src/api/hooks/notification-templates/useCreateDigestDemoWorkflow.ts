import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ICreateNotificationTemplateDto, INotificationTemplate, StepTypeEnum } from '@novu/shared';

import { createTemplate } from '../../notification-templates';
import { parseUrl } from '../../../utils/routeUtils';
import { ROUTES } from '../../../constants/routes.enum';
import { errorMessage } from '../../../utils/notifications';
import { useNotificationGroup } from '../../../hooks';

export const useCreateDigestDemoWorkflow = () => {
  const navigate = useNavigate();
  const { groups, loading: areNotificationGroupLoading } = useNotificationGroup();
  const { mutateAsync: createNotificationTemplate, isLoading: isCreating } = useMutation<
    INotificationTemplate,
    { error: string; message: string; statusCode: number },
    ICreateNotificationTemplateDto
  >(createTemplate, {
    onSuccess: (template) => {
      navigate(parseUrl(ROUTES.TEMPLATES_DIGEST_PLAYGROUND, { templateId: template._id as string }));
    },
    onError: () => {
      errorMessage('Failed to create Digest Workflow');
    },
  });

  const createDigestDemoWorkflow = useCallback(() => {
    const payload = {
      name: 'Digest Workflow Example',
      notificationGroupId: groups[0]._id,
      active: true,
      draft: false,
      critical: false,
      tags: [],
      steps: [
        {
          template: { type: StepTypeEnum.DIGEST, content: '' },
          metadata: { amount: '10', unit: 'seconds', type: 'regular', digestKey: '' },
          active: true,
          filters: [],
        },
        {
          template: {
            subject: 'Digest Workflow Example',
            senderName: 'Novu',
            type: StepTypeEnum.EMAIL,
            contentType: 'customHtml',
            variables: [{ type: 'String', name: 'step.digest', defaultValue: '1', required: false }],
            preheader: '',
            content: `Hi {{subscriber.firstName}}! 👋 You've sent {{step.total_count}} events!`,
          },
          active: true,
        },
      ],
    };

    createNotificationTemplate(payload as any);
  }, [createNotificationTemplate, groups]);

  return {
    createDigestDemoWorkflow,
    isLoading: isCreating,
    isDisabled: areNotificationGroupLoading || isCreating,
  };
};
