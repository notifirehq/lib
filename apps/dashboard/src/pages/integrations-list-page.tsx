import { useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/primitives/tabs';
import { Button } from '@/components/primitives/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/primitives/tooltip';
import { buildRoute, ROUTES } from '@/utils/routes';
import { DashboardLayout } from '../components/dashboard-layout';
import { TableIntegration } from '../components/integrations/types';
import { Badge } from '../components/primitives/badge';
import { IntegrationsList } from '../components/integrations/components/integrations-list';

export function IntegrationsListPage() {
  const navigate = useNavigate();

  const onItemClick = function (item: TableIntegration) {
    navigate(buildRoute(ROUTES.INTEGRATIONS_UPDATE, { integrationId: item.integrationId }));
  };

  const onAddIntegrationClickCallback = useCallback(() => {
    navigate(ROUTES.INTEGRATIONS_CONNECT);
  }, [navigate]);

  return (
    <DashboardLayout
      headerStartItems={
        <h1 className="text-foreground-950 flex items-center gap-1">
          <span>Integration Store</span>
          <Badge kind="pill" size="2xs">
            BETA
          </Badge>
        </h1>
      }
    >
      <Tabs defaultValue="providers">
        <div className="border-neutral-alpha-200 flex items-center justify-between border-b">
          <TabsList variant="regular" className="border-b-0 border-t-2 border-transparent p-0 !px-2">
            <TabsTrigger value="providers" variant="regular">
              Providers
            </TabsTrigger>
            <Tooltip>
              <TooltipTrigger>
                <TabsTrigger value="data-warehouse" variant="regular" disabled>
                  Data{' '}
                  <Badge kind="pill" size="2xs">
                    SOON
                  </Badge>
                </TabsTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Data warehouse connectors for syncing user data and triggering notifications.
                </p>
              </TooltipContent>
            </Tooltip>
          </TabsList>
          <Button size="sm" variant="primary" onClick={onAddIntegrationClickCallback} className="my-1.5 mr-2.5">
            Connect Provider
          </Button>
        </div>
        <TabsContent value="providers" variant="regular" className="!mt-0 p-2.5">
          <IntegrationsList onItemClick={onItemClick} />
        </TabsContent>
        <TabsContent value="data-warehouse" variant="regular">
          <div className="text-muted-foreground flex h-64 items-center justify-center">Coming soon</div>
        </TabsContent>
      </Tabs>
      <Outlet />
    </DashboardLayout>
  );
}
