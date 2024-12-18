import { useState } from 'react';
import { toast } from 'sonner';
import { useFetchIntegrations } from '@/hooks/use-fetch-integrations';
import { useUpdateIntegration } from '@/hooks/use-update-integration';
import { useSetPrimaryIntegration } from '@/hooks/use-set-primary-integration';
import { IntegrationConfiguration } from './integration-configuration';
import { Button } from '@/components/primitives/button';
import { DeleteIntegrationModal } from './modals/delete-integration-modal';
import { SelectPrimaryIntegrationModal } from './modals/select-primary-integration-modal';
import { IntegrationSheet } from './integration-sheet';
import { ChannelTypeEnum, providers as novuProviders } from '@novu/shared';
import { IntegrationFormData } from '../types';
import { useDeleteIntegration } from '../../../hooks/use-delete-integration';
import { handleIntegrationError } from './utils/handle-integration-error';
import { useIntegrationPrimaryModal } from './hooks/use-integration-primary-modal';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../utils/routes';

type UpdateIntegrationSidebarProps = {
  isOpened: boolean;
  onClose: () => void;
};

export function UpdateIntegrationSidebar({ isOpened, onClose }: UpdateIntegrationSidebarProps) {
  const navigate = useNavigate();
  const { integrationId } = useParams();
  const { integrations } = useFetchIntegrations();
  const integration = integrations?.find((i) => i._id === integrationId);
  const provider = novuProviders?.find((p) => p.id === integration?.providerId);

  const { deleteIntegration, isLoading: isDeleting } = useDeleteIntegration();
  const { mutateAsync: updateIntegration, isPending: isUpdating } = useUpdateIntegration();
  const { mutateAsync: setPrimaryIntegration, isPending: isSettingPrimary } = useSetPrimaryIntegration();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const {
    isPrimaryModalOpen,
    setIsPrimaryModalOpen,
    pendingData,
    handleSubmitWithPrimaryCheck,
    handlePrimaryConfirm,
    existingPrimaryIntegration,
    isChannelSupportPrimary,
  } = useIntegrationPrimaryModal({
    onSubmit,
    integrations,
    integration,
    mode: 'update',
  });

  async function onSubmit(data: IntegrationFormData) {
    if (!integration) return;

    /**
     * We don't want to check the integration if it's a demo integration
     * Since we don't have credentials for it
     */
    if (integration?.providerId === 'novu-email' || integration?.providerId === 'novu-sms') {
      data.check = false;
    }

    try {
      await updateIntegration({
        integrationId: integration._id,
        data: {
          name: data.name,
          identifier: data.identifier,
          active: data.active,
          primary: data.primary,
          credentials: data.credentials,
          check: data.check,
        },
      });

      if (data.primary && data.active && isChannelSupportPrimary) {
        await setPrimaryIntegration({ integrationId: integration._id });
      }

      onClose();
    } catch (error: unknown) {
      handleIntegrationError(error, 'update');
    }
  }

  const onDelete = async () => {
    if (!integration) return;

    try {
      await deleteIntegration({ id: integration._id });
      toast.success('Integration deleted successfully');
      setIsDeleteDialogOpen(false);
      onClose();
    } catch (error: unknown) {
      handleIntegrationError(error, 'delete');
    }
  };

  const handleClose = () => {
    onClose();
    navigate(ROUTES.INTEGRATIONS);
  };

  if (!integration || !provider) return null;

  return (
    <>
      <IntegrationSheet isOpened={isOpened} onClose={handleClose} provider={provider} mode="update">
        <div className="scrollbar-custom flex-1 overflow-y-auto">
          <IntegrationConfiguration
            isChannelSupportPrimary={isChannelSupportPrimary}
            provider={provider}
            integration={integration}
            onSubmit={handleSubmitWithPrimaryCheck}
            mode="update"
          />
        </div>

        <div className="bg-background flex justify-between gap-2 border-t p-3">
          {integration.channel !== ChannelTypeEnum.IN_APP && (
            <Button
              variant="ghostDestructive"
              size="sm"
              isLoading={isDeleting}
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              Delete Integration
            </Button>
          )}
          <Button
            type="submit"
            form="integration-configuration-form"
            className="ml-auto"
            isLoading={isUpdating || isSettingPrimary}
            size="sm"
          >
            Save Changes
          </Button>
        </div>
      </IntegrationSheet>

      <DeleteIntegrationModal
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={onDelete}
        isPrimary={integration.primary}
      />

      <SelectPrimaryIntegrationModal
        isOpen={isPrimaryModalOpen}
        onOpenChange={setIsPrimaryModalOpen}
        onConfirm={handlePrimaryConfirm}
        currentPrimaryName={existingPrimaryIntegration?.name}
        newPrimaryName={pendingData?.name ?? ''}
        isLoading={isUpdating || isSettingPrimary}
      />
    </>
  );
}
