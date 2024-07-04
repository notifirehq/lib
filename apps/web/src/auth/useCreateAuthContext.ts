import type { IOrganizationEntity, IUserEntity } from '@novu/shared';
import * as Sentry from '@sentry/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLDClient } from 'launchdarkly-react-client-sdk';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../api/index';
import { useSegment } from '../components/providers/SegmentProvider';
import { PUBLIC_ROUTES_PREFIXES, ROUTES } from '../constants/routes';
import { getToken } from './getToken';
import { getTokenClaims } from './getTokenClaims';

// TODO: Add a novu prefix to the local storage key
export const LOCAL_STORAGE_AUTH_TOKEN_KEY = 'auth_token';
const UNAUTHENTICATED_STATUS_CODE = 401;

export interface IUserWithContext extends IUserEntity {
  organizationId?: string;
  environmentId?: string;
}

function getUser() {
  return api.get('/v1/users/me');
}

function getOrganizations() {
  return api.get(`/v1/organizations`);
}

function saveToken(token: string | null) {
  if (token) {
    localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
  }
}

function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

/**
 * TODO: this function should be decomposed into smaller, more focused pieces of functionality.
 */
export function useCreateAuthContext() {
  const ldClient = useLDClient();
  const segment = useSegment();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const [organizationId, setOrganizationId] = useState<string | undefined>();
  const [environmentId, setEnvironmentId] = useState<string | undefined>();
  const inPublicRoute = Array.from(PUBLIC_ROUTES_PREFIXES.values()).find((prefix) =>
    location.pathname.startsWith(prefix)
  );
  const inPrivateRoute = !inPublicRoute;
  const hasToken = !!getToken();

  useEffect(() => {
    if (!getToken() && inPrivateRoute && !inIframe()) {
      navigate(ROUTES.AUTH_LOGIN, { state: { redirectTo: location } });
    }
  }, [navigate, inPrivateRoute, location]);

  const { data: user, isLoading: isUserLoading } = useQuery<IUserEntity>(['/v1/users/me'], getUser, {
    enabled: hasToken,
    retry: false,
    onError: (error: any) => {
      if (error?.statusCode === UNAUTHENTICATED_STATUS_CODE) {
        logout();
      }
    },
  });

  const {
    data: organizations,
    isLoading: isOrganizationLoading,
    refetch: refetchOrganizations,
  } = useQuery<IOrganizationEntity[]>(['/v1/organizations'], getOrganizations, {
    enabled: hasToken,
    retry: false,
    onError: (error: any) => {
      if (error?.statusCode === UNAUTHENTICATED_STATUS_CODE) {
        logout();
      }
    },
  });

  const login = useCallback(
    async (newToken: string, redirectUrl?: string) => {
      if (!newToken) {
        return;
      }

      saveToken(newToken);
      await refetchOrganizations();
      setOrgAndEnv();

      redirectUrl ? navigate(redirectUrl) : void 0;
    },
    [navigate, refetchOrganizations]
  );

  const logout = useCallback(() => {
    saveToken(null);
    setOrgAndEnv();
    queryClient.clear();
    segment.reset();
    navigate(ROUTES.AUTH_LOGIN);
  }, [navigate, queryClient, segment]);

  const redirectTo = useCallback(({ url, redirectURL }: { url: string; redirectURL?: string }) => {
    const finalURL = new URL(url, window.location.origin);

    if (redirectURL) {
      finalURL.searchParams.append('redirect_url', redirectURL);
    }

    // Note: Do not use react-router-dom. The version we have doesn't do instant cross origin redirects.
    window.location.replace(finalURL.href);
  }, []);

  const redirectToLogin = useCallback(
    ({ redirectURL }: { redirectURL?: string } = {}) => redirectTo({ url: ROUTES.AUTH_LOGIN, redirectURL }),
    [redirectTo]
  );

  const redirectToSignUp = useCallback(
    ({ redirectURL }: { redirectURL?: string } = {}) => redirectTo({ url: ROUTES.AUTH_SIGNUP, redirectURL }),
    [redirectTo]
  );

  const setOrgAndEnv = () => {
    const { organizationId: newOrgId, environmentId: newEnvId } = getTokenClaims() || {
      organizationId: undefined,
      environmentId: undefined,
    };
    setOrganizationId(newOrgId);
    setEnvironmentId(newEnvId);
  };

  useEffect(() => {
    setOrgAndEnv();
  }, []);

  const currentOrganization = useMemo(() => {
    if (organizationId && organizations && organizations?.length > 0) {
      return organizations.find((org) => org._id === organizationId);
    }

    return null;
  }, [organizations, organizationId]);

  useEffect(() => {
    if (user && currentOrganization) {
      segment.identify(user);

      Sentry.setUser({
        email: user.email ?? '',
        username: `${user.firstName} ${user.lastName}`,
        id: user._id,
        organizationId: currentOrganization._id,
        organizationName: currentOrganization.name,
      });
    } else {
      Sentry.configureScope((scope) => scope.setUser(null));
    }
  }, [user, currentOrganization, segment]);

  useEffect(() => {
    if (!ldClient) {
      return;
    }

    if (currentOrganization) {
      ldClient.identify({
        kind: 'organization',
        key: currentOrganization._id,
        name: currentOrganization.name,
        createdAt: currentOrganization.createdAt,
      });
    } else {
      ldClient.identify({
        kind: 'user',
        anonymous: true,
      });
    }
  }, [ldClient, currentOrganization]);

  return {
    inPublicRoute,
    inPrivateRoute,
    isLoading: hasToken && (isUserLoading || isOrganizationLoading),
    currentUser: user,
    organizations,
    currentOrganization,
    login,
    logout,
    environmentId,
    organizationId,
    redirectToLogin,
    redirectToSignUp,
  };
}
