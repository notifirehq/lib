import React, { createContext, useContext, useEffect, useCallback, useMemo, useState } from 'react';
import { useLDClient } from 'launchdarkly-react-client-sdk';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import * as Sentry from '@sentry/react';
import type { IOrganizationEntity, IUserEntity } from '@novu/shared';
import { useAuth, useUser, useOrganization, useOrganizationList } from '@clerk/clerk-react';
import { OrganizationResource, UserResource } from '@clerk/types';
import { useSegment } from '../../../components/providers/SegmentProvider';
import { PUBLIC_ROUTES_PREFIXES, ROUTES } from '../../../constants/routes';
import { CLERK_PUBLISHABLE_KEY, IS_EE_AUTH_ENABLED } from '../../../config/index';
import { ClerkProvider } from '@clerk/clerk-react';
import { useColorScheme } from '@novu/design-system';
import { dark } from '@clerk/themes';

interface AuthEnterpriseContextProps {
  inPublicRoute: boolean;
  inPrivateRoute: boolean;
  isLoading: boolean;
  currentUser: IUserEntity | undefined;
  organizations: IOrganizationEntity[];
  currentOrganization: IOrganizationEntity | undefined;
  login: (...args: any[]) => void;
  logout: () => void;
  environmentId: string | null;
}

// TODO: styles of Clerk components will get updated according to custom design
const ClerkModalElement = {
  modalContent: {
    width: '80rem',
    display: 'block',
  },
  cardBox: {
    width: '100%',
  },
  rootBox: {
    width: 'auto',
  },
};

const localization = {
  userProfile: {
    navbar: {
      title: 'Settings',
      description: 'Manage your account settings',
    },
  },
};

const toUserEntity = (clerkUser: UserResource): IUserEntity => ({
  _id: clerkUser.id,
  firstName: clerkUser.firstName,
  lastName: clerkUser.lastName,
  email: clerkUser.emailAddresses[0].emailAddress,
  profilePicture: clerkUser.imageUrl,
  createdAt: clerkUser.createdAt?.toString() ?? '',
  showOnBoarding: clerkUser.publicMetadata.showOnBoarding,
  showOnBoardingTour: clerkUser.publicMetadata.showOnBoardingTour,
  servicesHashes: clerkUser.publicMetadata.servicesHashes,
  jobTitle: clerkUser.publicMetadata.jobTitle,
  hasPassword: clerkUser.passwordEnabled,
});

const toOrganizationEntity = (clerkOrganization: OrganizationResource): IOrganizationEntity => ({
  _id: clerkOrganization.id,
  name: clerkOrganization.name,
  createdAt: clerkOrganization.createdAt.toString(),
  updatedAt: clerkOrganization.updatedAt.toString(),
  apiServiceLevel: clerkOrganization.publicMetadata.apiServiceLevel,
  defaultLocale: clerkOrganization.publicMetadata.defaultLocale,
  domain: clerkOrganization.publicMetadata.domain,
  productUseCases: clerkOrganization.publicMetadata.productUseCases,
});

const AuthEnterpriseContext = createContext<AuthEnterpriseContextProps | undefined>(undefined);

export const useAuthEnterpriseContext = () => {
  const context = useContext(AuthEnterpriseContext);
  if (!context) {
    throw new Error('useAuthEnterpriseContext must be used within an AuthEnterpriseProvider');
  }

  return context;
};

const _AuthEnterpriseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { signOut, orgId } = useAuth();
  const { user: clerkUser, isLoaded: isUserLoaded } = useUser();
  const { organization: clerkOrganization, isLoaded: isOrganizationLoaded } = useOrganization();
  const { setActive, isLoaded: isOrgListLoaded } = useOrganizationList();

  const [user, setUser] = useState<IUserEntity | undefined>(undefined);
  const [organization, setOrganization] = useState<IOrganizationEntity | undefined>(undefined);

  const ldClient = useLDClient();
  const segment = useSegment();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const inPublicRoute = useMemo(
    () => Array.from(PUBLIC_ROUTES_PREFIXES.values()).some((prefix) => location.pathname.startsWith(prefix)),
    [location.pathname]
  );
  const inPrivateRoute = !inPublicRoute;

  const logout = useCallback(() => {
    queryClient.clear();
    segment.reset();
    navigate(ROUTES.AUTH_LOGIN);
    signOut();
  }, [navigate, queryClient, segment, signOut]);

  const switchOrgCallback = useCallback(async () => {
    await queryClient.refetchQueries();
  }, [queryClient]);

  // check if user has active organization
  useEffect(() => {
    if (orgId) {
      return;
    }

    if (isOrgListLoaded && clerkUser) {
      const hasOrgs = clerkUser.organizationMemberships.length > 0;

      if (hasOrgs) {
        const firstOrg = clerkUser.organizationMemberships[0].organization;
        setActive({ organization: firstOrg });
      } else {
        navigate(ROUTES.AUTH_SIGNUP_ORGANIZATION_LIST);
      }
    }
  }, [navigate, setActive, isOrgListLoaded, clerkUser, orgId]);

  // transform Clerk user to internal user entity
  useEffect(() => {
    if (isUserLoaded && clerkUser) {
      setUser(toUserEntity(clerkUser));
    }
  }, [clerkUser, isUserLoaded]);

  // transform Clerk organization to internal organization entity
  useEffect(() => {
    if (isOrganizationLoaded && clerkOrganization) {
      setOrganization(toOrganizationEntity(clerkOrganization));
    }
  }, [clerkOrganization, isOrganizationLoaded]);

  // refetch queries on organization switch
  useEffect(() => {
    if (organization && organization._id !== clerkOrganization?.id) {
      switchOrgCallback();
    }
  }, [organization, clerkOrganization, switchOrgCallback]);

  // sentry tracking
  useEffect(() => {
    if (user && organization) {
      segment.identify(user);

      Sentry.setUser({
        email: user.email ?? '',
        username: `${user.firstName} ${user.lastName}`,
        id: user._id,
        organizationId: organization._id,
        organizationName: organization.name,
      });
    } else {
      Sentry.configureScope((scope) => scope.setUser(null));
    }
  }, [user, organization, segment]);

  // launch darkly
  useEffect(() => {
    if (!ldClient) return;

    if (organization) {
      ldClient.identify({
        kind: 'organization',
        key: organization._id,
        name: organization.name,
      });
    } else {
      ldClient.identify({
        kind: 'user',
        anonymous: true,
      });
    }
  }, [ldClient, organization]);

  const memoizedValues = useMemo(
    () => ({
      inPublicRoute,
      inPrivateRoute,
      isLoading: inPrivateRoute && (!isUserLoaded || !isOrganizationLoaded),
      currentUser: user,
      // TODO: (to decide) either remove/rework places where "organizations" is used or fetch from Clerk
      organizations: isOrganizationLoaded && organization ? [organization] : [],
      currentOrganization: organization,
      login: (...args: any[]) => new Error('login() not implemented in enterprise version'),
      logout,
      // TODO: implement proper environment switch
      environmentId: null,
    }),
    [inPublicRoute, inPrivateRoute, isUserLoaded, isOrganizationLoaded, user, organization, logout]
  );

  return <AuthEnterpriseContext.Provider value={memoizedValues}>{children}</AuthEnterpriseContext.Provider>;
};

export const AuthEnterpriseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { colorScheme } = useColorScheme();

  if (!IS_EE_AUTH_ENABLED) {
    return <>{children}</>;
  }

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={CLERK_PUBLISHABLE_KEY}
      appearance={{
        baseTheme: colorScheme === 'dark' ? dark : undefined,
        elements: ClerkModalElement,
      }}
      localization={localization}
    >
      <_AuthEnterpriseProvider>{children}</_AuthEnterpriseProvider>;
    </ClerkProvider>
  );
};
