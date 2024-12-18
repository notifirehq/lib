import { useForm, useWatch } from 'react-hook-form';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/primitives/accordion';
import { Form } from '@/components/primitives/form/form';
import { Label } from '@/components/primitives/label';
import { Separator } from '@/components/primitives/separator';
import { RiGitBranchLine, RiInputField } from 'react-icons/ri';
import { IIntegration, IProviderConfig } from '@novu/shared';
import { useEffect } from 'react';
import { InlineToast } from '../../../components/primitives/inline-toast';
import { SegmentedControl, SegmentedControlList } from '../../../components/primitives/segmented-control';
import { SegmentedControlTrigger } from '../../../components/primitives/segmented-control';
import { useEnvironment, useFetchEnvironments } from '@/context/environment/hooks';
import { useAuth } from '@/context/auth/hooks';
import { GeneralSettings } from './integration-general-settings';
import { CredentialsSection } from './integration-credentials';
import { isDemoIntegration } from './utils/helpers';

type IntegrationFormData = {
  name: string;
  identifier: string;
  credentials: Record<string, string>;
  active: boolean;
  check: boolean;
  primary: boolean;
  environmentId: string;
};

type IntegrationConfigurationProps = {
  provider: IProviderConfig;
  integration?: IIntegration;
  onSubmit: (data: IntegrationFormData) => void;
  mode: 'create' | 'update';
  isChannelSupportPrimary?: boolean;
  hasOtherProviders?: boolean;
};

function generateSlug(name: string): string {
  return name
    ?.toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function IntegrationConfiguration({
  provider,
  integration,
  onSubmit,
  mode,
  isChannelSupportPrimary,
  hasOtherProviders,
}: IntegrationConfigurationProps) {
  const { currentOrganization } = useAuth();
  const { environments } = useFetchEnvironments({ organizationId: currentOrganization?._id });
  const { currentEnvironment } = useEnvironment();

  const form = useForm<IntegrationFormData>({
    defaultValues: integration
      ? {
          name: integration.name,
          identifier: integration.identifier,
          active: integration.active,
          primary: integration.primary ?? false,
          credentials: integration.credentials as Record<string, string>,
          environmentId: integration._environmentId,
        }
      : {
          name: provider?.displayName ?? '',
          identifier: generateSlug(provider?.displayName ?? ''),
          active: true,
          primary: true,
          credentials: {},
          environmentId: currentEnvironment?._id ?? '',
        },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = form;

  const name = useWatch({ control, name: 'name' });
  const environmentId = useWatch({ control, name: 'environmentId' });

  useEffect(() => {
    if (mode === 'create') {
      setValue('identifier', generateSlug(name));
    }
  }, [name, mode, setValue]);

  const isDemo = integration && isDemoIntegration(integration.providerId);

  return (
    <Form {...form}>
      <form id="integration-configuration-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex items-center justify-between gap-2 p-3">
          <Label className="text-sm" htmlFor="environmentId">
            Environment
          </Label>
          <SegmentedControl
            value={environmentId}
            onValueChange={(value) => setValue('environmentId', value)}
            className="w-full max-w-[260px]"
          >
            <SegmentedControlList>
              {environments?.map((env) => (
                <SegmentedControlTrigger key={env._id} value={env._id} disabled={mode === 'update'}>
                  <RiGitBranchLine
                    className={`size-4 ${env.name.toLowerCase() === 'production' ? 'text-feature' : 'text-warning'}`}
                  />
                  {env.name}
                </SegmentedControlTrigger>
              ))}
            </SegmentedControlList>
          </SegmentedControl>
        </div>

        <Accordion type="single" collapsible defaultValue="layout" className="p-3">
          <AccordionItem value="layout">
            <AccordionTrigger>
              <div className="flex items-center gap-1 text-xs">
                <RiInputField className="text-feature size-5" />
                General Settings
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <GeneralSettings
                control={control}
                mode={mode}
                hidePrimarySelector={!isChannelSupportPrimary}
                disabledPrimary={!hasOtherProviders && integration?.primary}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Separator className="mb-0 mt-0" />

        {isDemo ? (
          <div className="p-3">
            <InlineToast
              variant={'warning'}
              title="Demo Integration"
              description={`This is a demo integration intended for testing purposes only. It is limited to 300 ${
                provider?.channel === 'email' ? 'emails' : 'sms'
              } per month.`}
            />
          </div>
        ) : (
          <div className="p-3">
            <Accordion type="single" collapsible defaultValue="credentials">
              <AccordionItem value="credentials">
                <AccordionTrigger>
                  <div className="flex items-center gap-1 text-xs">
                    <RiInputField className="text-feature size-5" />
                    Integration Credentials
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <CredentialsSection provider={provider} register={register} control={control} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <InlineToast
              variant={'tip'}
              className="mt-3"
              title="Configure Integration"
              description="To learn more about how to configure your integration, please refer to the documentation."
              ctaLabel="View Guide"
              onCtaClick={() => {
                window.open(provider?.docReference ?? '', '_blank');
              }}
            />
          </div>
        )}
      </form>
    </Form>
  );
}
