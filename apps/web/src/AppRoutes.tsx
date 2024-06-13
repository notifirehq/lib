import { FeatureFlagsKeysEnum } from '@novu/shared';
import { PrivatePageLayout } from './components/layout/components/PrivatePageLayout';
import { PublicPageLayout } from './components/layout/components/PublicPageLayout';
import { EnsureOnboardingComplete } from './components/layout/components/EnsureOnboardingComplete';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import { useFeatureFlag } from './hooks';
import { ActivitiesPage } from './pages/activities/ActivitiesPage';
import InvitationPage from './pages/auth/InvitationPage';
import LoginPage from './pages/auth/LoginPage';
import { PasswordResetPage } from './pages/auth/PasswordResetPage';
import QuestionnairePage from './pages/auth/QuestionnairePage';
import SignUpPage from './pages/auth/SignUpPage';
import { BrandPage } from './pages/brand/BrandPage';
import { BrandingForm, LayoutsListPage } from './pages/brand/tabs';
import { PromoteChangesPage } from './pages/changes/PromoteChangesPage';
import { GetStartedPage } from './pages/get-started/GetStartedPage';
import HomePage from './pages/HomePage';
import { SelectProviderPage } from './pages/integrations/components/SelectProviderPage';
import { CreateProviderPage } from './pages/integrations/CreateProviderPage';
import { IntegrationsListPage } from './pages/integrations/IntegrationsListPage';
import { UpdateProviderPage } from './pages/integrations/UpdateProviderPage';
import { MembersInvitePage } from './pages/invites/MembersInvitePage';
import { LayoutsPage } from './pages/layouts/v2/LayoutsPage';
import { LinkVercelProjectPage } from './pages/partner-integrations/LinkVercelProjectPage';
import { DigestPreview } from './pages/quick-start/steps/DigestPreview';
import { FrameworkSetup } from './pages/quick-start/steps/FrameworkSetup';
import { GetStarted } from './pages/quick-start/steps/GetStarted';
import { InAppSuccess } from './pages/quick-start/steps/InAppSuccess';
import { NotificationCenter } from './pages/quick-start/steps/NotificationCenter';
import { Setup } from './pages/quick-start/steps/Setup';
import { ApiKeysPage, WebhookPage } from './pages/settings/index';
import SubscribersList from './pages/subscribers/SubscribersListPage';
import { ChannelPreview } from './pages/templates/components/ChannelPreview';
import { ChannelStepEditor } from './pages/templates/components/ChannelStepEditor';
import { ProvidersPage } from './pages/templates/components/ProvidersPage';
import { SnippetPage } from './pages/templates/components/SnippetPage';
import { TemplateSettings } from './pages/templates/components/TemplateSettings';
import { TestWorkflowPage } from './pages/templates/components/TestWorkflowPage';
import { UserPreference } from './pages/templates/components/UserPreference';
import { VariantsPage } from './pages/templates/components/VariantsPage';
import TemplateEditorPage from './pages/templates/editor/TemplateEditorPage';
import { TemplatesDigestPlaygroundPage } from './pages/templates/TemplatesDigestPlaygroundPage';
import { Sidebar } from './pages/templates/workflow/SideBar/Sidebar';
import WorkflowListPage from './pages/templates/WorkflowListPage';
import { CreateTenantPage } from './pages/tenants/CreateTenantPage';
import { TenantsPage } from './pages/tenants/TenantsPage';
import { UpdateTenantPage } from './pages/tenants/UpdateTenantPage';
import { TranslationRoutes } from './pages/TranslationPages';
import { useSettingsRoutes } from './SettingsRoutes';
import { WorkflowsListPage } from './studio/components/workflows/WorkflowsListPage';
import { WorkflowsDetailPage } from './studio/components/workflows/WorkflowsDetailPage';

export const AppRoutes = () => {
  const isImprovedOnboardingEnabled = useFeatureFlag(FeatureFlagsKeysEnum.IS_IMPROVED_ONBOARDING_ENABLED);
  const isInformationArchitectureEnabled = useFeatureFlag(FeatureFlagsKeysEnum.IS_INFORMATION_ARCHITECTURE_ENABLED);

  return (
    <Routes>
      <Route element={<PublicPageLayout />}>
        <Route path={ROUTES.AUTH_SIGNUP} element={<SignUpPage />} />
        <Route path={ROUTES.AUTH_LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.AUTH_RESET_REQUEST} element={<PasswordResetPage />} />
        <Route path={ROUTES.AUTH_RESET_TOKEN} element={<PasswordResetPage />} />
        <Route path={ROUTES.AUTH_INVITATION_TOKEN} element={<InvitationPage />} />
        <Route path={ROUTES.AUTH_APPLICATION} element={<QuestionnairePage />} />
        <Route
          path={ROUTES.PARTNER_INTEGRATIONS_VERCEL_LINK_PROJECTS}
          element={
            <EnsureOnboardingComplete>
              <LinkVercelProjectPage type="create" />
            </EnsureOnboardingComplete>
          }
        />
        <Route
          path={ROUTES.PARTNER_INTEGRATIONS_VERCEL_LINK_PROJECTS_EDIT}
          element={
            <EnsureOnboardingComplete>
              <LinkVercelProjectPage type="edit" />
            </EnsureOnboardingComplete>
          }
        />
      </Route>
      <Route element={<PrivatePageLayout />}>
        <Route path={ROUTES.WORKFLOWS_DIGEST_PLAYGROUND} element={<TemplatesDigestPlaygroundPage />} />
        <Route path={ROUTES.WORKFLOWS_CREATE} element={<TemplateEditorPage />} />
        <Route path={ROUTES.WORKFLOWS_EDIT_TEMPLATEID} element={<TemplateEditorPage />}>
          <Route path="" element={<Sidebar />} />
          <Route path="settings" element={<TemplateSettings />} />
          <Route path="channels" element={<UserPreference />} />
          <Route path="test-workflow" element={<TestWorkflowPage />} />
          <Route path="snippet" element={<SnippetPage />} />
          <Route path="providers" element={<ProvidersPage />} />
          <Route path=":channel/:stepUuid" element={<ChannelStepEditor />} />
          <Route path=":channel/:stepUuid/preview" element={<ChannelPreview />} />
          <Route path=":channel/:stepUuid/variants/:variantUuid/preview" element={<VariantsPage />} />
          <Route path=":channel/:stepUuid/variants/:variantUuid" element={<ChannelStepEditor />} />
          <Route path=":channel/:stepUuid/variants/create" element={<VariantsPage />} />
        </Route>
        <Route path={ROUTES.WORKFLOWS} element={<WorkflowListPage />} />
        <Route path={ROUTES.TENANTS} element={<TenantsPage />}>
          <Route path="create" element={<CreateTenantPage />} />
          <Route path=":identifier" element={<UpdateTenantPage />} />
        </Route>
        {isImprovedOnboardingEnabled ? (
          <Route path={ROUTES.GET_STARTED} element={<GetStartedPage />} />
        ) : (
          <Route path={ROUTES.GET_STARTED} element={<GetStarted />} />
        )}
        <Route path={ROUTES.GET_STARTED_PREVIEW} element={<DigestPreview />} />
        <Route path={ROUTES.QUICK_START_NOTIFICATION_CENTER} element={<NotificationCenter />} />
        <Route path={ROUTES.QUICK_START_SETUP} element={<FrameworkSetup />} />
        <Route path={ROUTES.QUICK_START_SETUP_FRAMEWORK} element={<Setup />} />
        <Route path={ROUTES.QUICK_START_SETUP_SUCCESS} element={<InAppSuccess />} />
        <Route path={ROUTES.ACTIVITIES} element={<ActivitiesPage />} />
        {useSettingsRoutes()}
        <Route path={ROUTES.INTEGRATIONS} element={<IntegrationsListPage />}>
          <Route path="create" element={<SelectProviderPage />} />
          <Route path="create/:channel/:providerId" element={<CreateProviderPage />} />
          <Route path=":integrationId" element={<UpdateProviderPage />} />
        </Route>
        <Route path={ROUTES.TEAM} element={<MembersInvitePage />} />
        <Route path={ROUTES.CHANGES} element={<PromoteChangesPage />} />
        <Route path={ROUTES.SUBSCRIBERS} element={<SubscribersList />} />
        {!isInformationArchitectureEnabled ? (
          <Route path={ROUTES.BRAND} element={<BrandPage />}>
            <Route path="" element={<BrandingForm />} />
            <Route path="layouts" element={<LayoutsListPage />} />
          </Route>
        ) : (
          <>
            <Route path={ROUTES.LAYOUT} element={<LayoutsPage />}>
              <Route path="" element={<LayoutsListPage />} />
            </Route>
            {/* routes previously under settings */}
            <Route path={ROUTES.API_KEYS} element={<ApiKeysPage />} />
            <Route path={ROUTES.WEBHOOK} element={<WebhookPage />} />
          </>
        )}
        {isInformationArchitectureEnabled && (
          <Route path={ROUTES.BRAND} element={<Navigate to={ROUTES.BRAND_SETTINGS} replace />} />
        )}
        <Route path={ROUTES.STUDIO}>
          <Route path="" element={<Navigate to={ROUTES.STUDIO_FLOWS} replace />} />
          <Route path={ROUTES.STUDIO_FLOWS} element={<WorkflowsListPage />} />
          <Route path={'/studio/flows/:templateId'} element={<WorkflowsDetailPage />} />
        </Route>

        <Route path="/translations/*" element={<TranslationRoutes />} />
        <Route path={ROUTES.ANY} element={<HomePage />} />
      </Route>
    </Routes>
  );
};
