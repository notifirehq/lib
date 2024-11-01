import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { EnvironmentEnum, type IEnvironment } from '@novu/shared';

import { getEnvironmentId, saveEnvironmentId } from '@/utils/environment';
import { buildRoute, ROUTES } from '@/utils/routes';
import { useAuth } from '@/context/auth/hooks';
import { useFetchEnvironments } from '@/context/environment/hooks';
import { EnvironmentContext } from '@/context/environment/environment-context';

function selectEnvironment(environments: IEnvironment[], selectedEnvironmentSlug?: string | null) {
  let environment: IEnvironment | undefined;

  // Find the environment based on the current user's last environment
  if (selectedEnvironmentSlug) {
    environment = environments.find((env) => env.slug === selectedEnvironmentSlug);
  }

  // Or pick the development environment
  if (!environment) {
    environment = environments.find((env) => env.name === EnvironmentEnum.DEVELOPMENT);
  }

  if (!environment) {
    throw new Error('Missing development environment');
  }

  saveEnvironmentId(environment._id);

  return environment;
}

export function EnvironmentProvider({ children }: { children: React.ReactNode }) {
  const { currentOrganization } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { environmentSlug: paramsEnvironmentSlug } = useParams<{ environmentSlug?: string }>();
  const [currentEnvironment, setCurrentEnvironment] = useState<IEnvironment>();

  const switchEnvironmentInternal = useCallback(
    (allEnvironments: IEnvironment[], environmentSlug?: string | null) => {
      const selectedEnvironment = selectEnvironment(allEnvironments, environmentSlug);
      setCurrentEnvironment(selectedEnvironment);
      const newEnvironmentSlug = selectedEnvironment.slug;
      const isNewEnvironmentDifferent = paramsEnvironmentSlug !== selectedEnvironment.slug;

      if (pathname === ROUTES.ROOT || pathname === ROUTES.ENV || pathname === `${ROUTES.ENV}/`) {
        // TODO: check if this ROUTES is correct
        navigate(buildRoute(ROUTES.WORKFLOWS, { environmentSlug: newEnvironmentSlug ?? '' }));
      } else if (pathname.includes(ROUTES.ENV) && isNewEnvironmentDifferent) {
        const newPath = pathname.replace(/\/env\/[^/]+(\/|$)/, `${ROUTES.ENV}/${newEnvironmentSlug}$1`);
        navigate(newPath);
      }
    },
    [navigate, pathname, paramsEnvironmentSlug]
  );

  const { environments, areEnvironmentsInitialLoading } = useFetchEnvironments({
    organizationId: currentOrganization?._id,
  });

  useLayoutEffect(() => {
    if (!environments) {
      return;
    }

    const environmentId = paramsEnvironmentSlug ?? getEnvironmentId();
    switchEnvironmentInternal(environments, environmentId);
  }, [paramsEnvironmentSlug, environments, switchEnvironmentInternal]);

  const switchEnvironment = useCallback(
    (newEnvironmentSlug?: string) => {
      if (!environments) {
        return;
      }

      switchEnvironmentInternal(environments, newEnvironmentSlug);
    },
    [switchEnvironmentInternal, environments]
  );

  const setBridgeUrl = useCallback(
    (url: string) => {
      if (!currentEnvironment) {
        return;
      }

      setCurrentEnvironment({ ...currentEnvironment, bridge: { url } });
    },
    [currentEnvironment]
  );

  const value = useMemo(
    () => ({
      currentEnvironment,
      environments,
      areEnvironmentsInitialLoading,
      readOnly: currentEnvironment?._parentId !== undefined,
      switchEnvironment,
      setBridgeUrl,
    }),
    [currentEnvironment, environments, areEnvironmentsInitialLoading, switchEnvironment, setBridgeUrl]
  );

  return <EnvironmentContext.Provider value={value}>{children}</EnvironmentContext.Provider>;
}
