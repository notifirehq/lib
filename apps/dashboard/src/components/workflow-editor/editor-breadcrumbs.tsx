import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, RouteFill } from '@/components/icons';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/primitives/breadcrumb';
import { Button } from '@/components/primitives/button';
import { useEnvironment } from '@/context/environment/hooks';
import { buildRoute, ROUTES } from '@/utils/routes';
import { useFetchWorkflow } from '@/hooks';
import TruncatedText from '@/components/truncated-text';
import { Badge } from '@/components/primitives/badge';

export const EditorBreadcrumbs = () => {
  const { workflowSlug = '' } = useParams<{ workflowSlug: string }>();
  const { currentEnvironment } = useEnvironment();
  const navigate = useNavigate();
  const workflowsRoute = buildRoute(ROUTES.WORKFLOWS, { environmentSlug: currentEnvironment?.slug ?? '' });
  const { workflow } = useFetchWorkflow({
    workflowSlug,
  });

  const breadcrumbs = [
    { label: currentEnvironment?.name, href: workflowsRoute },
    {
      label: 'Workflows',
      href: workflowsRoute,
      node: (
        <Badge variant="warning" kind="pill" size="xxs" className="no-underline">
          BETA
        </Badge>
      ),
    },
  ];

  const handleBackNav = () => {
    navigate(workflowsRoute);
  };

  return (
    <div className="flex items-center overflow-hidden">
      <Button variant="link" onClick={handleBackNav}>
        <ArrowRight className="text-neutral-950" />
      </Button>
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map(({ label, href, node }) => (
            <React.Fragment key={`${href}_${label}`}>
              <BreadcrumbItem className="flex items-center gap-1">
                <BreadcrumbLink to={href}>{label}</BreadcrumbLink>
                {node}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          ))}
          <BreadcrumbItem>
            <BreadcrumbPage>
              <RouteFill />
              <div className="flex max-w-[32ch]">
                <TruncatedText>{workflow?.name}</TruncatedText>
              </div>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
