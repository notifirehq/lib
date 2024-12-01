import { AuthCard } from '../components/auth/auth-card';
import { PageMeta } from '../components/page-meta';
import { InboxPlayground } from '../components/auth/inbox-playground';
import { useTelemetry } from '../hooks/use-telemetry';
import { TelemetryEvent } from '../utils/telemetry';
import { useEffect } from 'react';

export function InboxUsecasePage() {
  const telemetry = useTelemetry();

  useEffect(() => {
    telemetry(TelemetryEvent.INBOX_USECASE_PAGE_VIEWED);
  }, [telemetry]);

  return (
    <>
      <PageMeta title="Integrate with the Inbox component" />

      <AuthCard>
        <InboxPlayground />
      </AuthCard>
    </>
  );
}
