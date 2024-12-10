import { differenceInDays, isSameDay } from 'date-fns';
import { getSubscription } from '@/api/billing';
import { QueryKeys } from '@/utils/query-keys';
import { useAuth } from '@/context/auth/hooks';
import { useEnvironment } from '@/context/environment/hooks';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { GetSubscriptionDto } from '@novu/shared';

const today = new Date();

export type UseSubscriptionType = GetSubscriptionDto & { daysLeft: number; isLoading: boolean };

export const useFetchSubscription = () => {
  const { currentOrganization } = useAuth();
  const { currentEnvironment } = useEnvironment();

  const { data: subscription, isLoading: isLoadingSubscription } = useQuery<GetSubscriptionDto>({
    queryKey: [QueryKeys.billingSubscription, currentOrganization?._id],
    queryFn: () => getSubscription({ environment: currentEnvironment! }),
    enabled: !!currentOrganization,
  });

  const daysLeft = useMemo(() => {
    if (!subscription?.trial.end) return 0;

    return isSameDay(new Date(subscription.trial.end), today)
      ? 0
      : differenceInDays(new Date(subscription.trial.end), today);
  }, [subscription?.trial.end]);

  return {
    isLoading: isLoadingSubscription,
    subscription,
    daysLeft,
  };
};
