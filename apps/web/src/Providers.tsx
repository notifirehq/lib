import { ColorSchemeProvider, Loader } from '@mantine/core';
import { colors } from '@novu/design-system';
import { CONTEXT_PATH, SegmentProvider } from '@novu/shared-web';
import * as Sentry from '@sentry/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { api } from './api/api.client';
import { LaunchDarklyProvider } from './components/launch-darkly';
import { AuthProvider } from './components/providers/AuthProvider';
import { css } from '@novu/novui/css';

const defaultQueryFn = async ({ queryKey }: { queryKey: string }) => {
  const response = await api.get(`${queryKey[0]}`);

  return response.data?.data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn as any,
    },
  },
});

/** Full-page loader that uses color-preferences for background */
const fallbackDisplay = (
  <div
    className={css({
      h: '100dvh',
      w: '100dvw',
      display: 'grid',
      placeItems: 'center',
      bg: 'surface.page',
      // Root element may not have loaded so rely on OS
      _osDark: { bg: 'legacy.BGDark' },
      _osLight: { bg: 'legacy.BGLight' },
    })}
  >
    <Loader size={64} variant="bars" color={colors.gradientMiddle} />
  </div>
);

/**
 * Centralized Provider hierarchy.
 */
const Providers: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <ColorSchemeProvider colorScheme={'dark'} toggleColorScheme={() => {}}>
      <SegmentProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter basename={CONTEXT_PATH}>
            <AuthProvider fallbackComponent={fallbackDisplay}>
              <LaunchDarklyProvider>
                <HelmetProvider>{children}</HelmetProvider>
              </LaunchDarklyProvider>
            </AuthProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </SegmentProvider>
    </ColorSchemeProvider>
  );
};

export default Sentry.withProfiler(Providers);
