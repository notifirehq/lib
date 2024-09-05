import { useState, useEffect } from 'react';
import { useNovu } from './NovuProvider';
import { Notification, NovuError, isSameFilter } from '@novu/js';
import { ListNotificationsResponse } from '@novu/js';

export type UseNotificationsProps = {
  tags?: string[];
  read?: boolean;
  archived?: boolean;
  limit?: number;
  onSuccess?: (data: Notification[]) => void;
  onError?: (error: NovuError) => void;
};

export const useNotifications = (props?: UseNotificationsProps) => {
  const { tags, read, archived, limit, onSuccess, onError } = props || {};
  const { notifications, on, off } = useNovu();
  const [data, setData] = useState<Array<Notification>>();
  const [error, setError] = useState<NovuError>();
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const length = data?.length;
  const after = length ? data[length - 1].id : undefined;

  const sync = (event: { data?: ListNotificationsResponse }) => {
    if (!event.data || !isSameFilter(event.data.filter, { tags, read, archived })) {
      return;
    }
    setData(event.data.notifications);
    setHasMore(event.data.hasMore);
  };

  const resetState = () => {
    setError(undefined);
    setIsLoading(true);
    setIsFetching(false);
    setHasMore(false);
    setData(undefined);
  };

  useEffect(() => {
    resetState();
    fetchNotifications();

    on('notifications.list.updated', sync);
    on('notifications.list.pending', sync);
    on('notifications.list.resolved', sync);

    return () => {
      off('notifications.list.updated', sync);
      off('notifications.list.pending', sync);
      off('notifications.list.resolved', sync);
    };
  }, [JSON.stringify(tags), read, archived]);

  const fetchNotifications = async () => {
    setIsFetching(true);
    const response = await notifications.list({
      tags,
      read,
      archived,
      limit,
      after: after,
    });
    if (response.error) {
      setError(response.error);
      onError?.(response.error);
    } else {
      onSuccess?.(response.data!.notifications);
    }
    setIsLoading(false);
    setIsFetching(false);
  };

  const refetch = () => {
    resetState();
    notifications.clearCache({ filter: { tags, read, archived } });
    return fetchNotifications();
  };

  const fetchMore = async () => {
    if (!hasMore || isFetching) return;
    return fetchNotifications();
  };

  const readAll = async () => {
    return await notifications.readAll({ tags });
  };

  const archiveAll = async () => {
    return await notifications.archiveAll({ tags });
  };

  const archiveAllRead = async () => {
    return await notifications.archiveAllRead({ tags });
  };

  return {
    readAll,
    archiveAll,
    archiveAllRead,
    notifications: data,
    error,
    isLoading,
    isFetching,
    refetch,
    fetchMore,
    hasMore,
  };
};
