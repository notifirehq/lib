import { OrganizationList } from '@clerk/clerk-react';
import { useEffect } from 'react';
import AuthLayout from '../../../components/layout/components/AuthLayout';
import { ROUTES } from '../../../constants/routes';
import { useRedirectURL } from '../../../hooks/useRedirectURL';
import { navigateToAuthApplication } from '../../../utils/playground-navigation';

export default function OrganizationListPage() {
  const { setRedirectURL } = useRedirectURL();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setRedirectURL(), []);

  return (
    <AuthLayout
      title="Select or create organization"
      description="Please select or create an organization to continue."
    >
      <OrganizationList
        appearance={{
          elements: {
            organizationAvatarUploaderContainer: {
              display: 'none',
            },
          },
        }}
        hidePersonal
        skipInvitationScreen
        afterSelectOrganizationUrl={ROUTES.GET_STARTED}
        afterCreateOrganizationUrl={() => {
          navigateToAuthApplication();

          return '';
        }}
      />
    </AuthLayout>
  );
}
