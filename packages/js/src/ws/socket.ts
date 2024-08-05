import io, { Socket as SocketIO } from 'socket.io-client';
import { BaseModule } from '../base-module';

import {
  NotificationReceivedEvent,
  NotificationUnseenEvent,
  NotificationUnreadEvent,
  NovuEventEmitter,
  SocketEventNames,
} from '../event-emitter';
import { Notification } from '../notifications';
import {
  ActionTypeEnum,
  NotificationActionStatus,
  InboxNotification,
  Session,
  Subscriber,
  TODO,
  WebSocketEvent,
} from '../types';

const PRODUCTION_SOCKET_URL = 'https://ws.novu.co';
const NOTIFICATION_RECEIVED: NotificationReceivedEvent = 'notifications.notification_received';
const UNSEEN_COUNT_CHANGED: NotificationUnseenEvent = 'notifications.unseen_count_changed';
const UNREAD_COUNT_CHANGED: NotificationUnreadEvent = 'notifications.unread_count_changed';

const mapToNotification = ({
  _id,
  content,
  read,
  archived,
  createdAt,
  lastReadDate,
  archivedAt,
  channel,
  subscriber,
  subject,
  avatar,
  cta,
  tags,
}: TODO): InboxNotification => {
  const to: Subscriber = {
    id: subscriber?._id ?? '',
    firstName: subscriber?.firstName,
    lastName: subscriber?.lastName,
    avatar: subscriber?.avatar,
    subscriberId: subscriber?.subscriberId ?? '',
  };
  const primaryCta = cta.action?.buttons?.find((button: any) => button.type === ActionTypeEnum.PRIMARY);
  const secondaryCta = cta.action?.buttons?.find((button: any) => button.type === ActionTypeEnum.SECONDARY);
  const actionType = cta.action?.result?.type;
  const actionStatus = cta.action?.status;

  return {
    id: _id,
    subject,
    body: content as string,
    to,
    isRead: read,
    isArchived: archived,
    createdAt,
    readAt: lastReadDate,
    archivedAt,
    avatar,
    primaryAction: primaryCta && {
      label: primaryCta.content,
      isCompleted: actionType === ActionTypeEnum.PRIMARY && actionStatus === NotificationActionStatus.DONE,
    },
    secondaryAction: secondaryCta && {
      label: secondaryCta.content,
      isCompleted: actionType === ActionTypeEnum.SECONDARY && actionStatus === NotificationActionStatus.DONE,
    },
    channelType: channel,
    tags,
    redirect: cta.data?.url
      ? {
          url: cta.data.url,
        }
      : undefined,
  };
};

export class Socket extends BaseModule {
  #token: string;
  #emitter: NovuEventEmitter;
  #socketIo: SocketIO | undefined;
  #socketUrl: string;

  constructor({ socketUrl }: { socketUrl?: string }) {
    super();
    this.#emitter = NovuEventEmitter.getInstance();
    this.#socketUrl = socketUrl ?? PRODUCTION_SOCKET_URL;
  }

  protected onSessionSuccess({ token }: Session): void {
    this.#token = token;
  }

  #notificationReceived = ({ message }: { message: TODO }) => {
    this.#emitter.emit(NOTIFICATION_RECEIVED, {
      result: new Notification(mapToNotification(message)),
    });
  };

  #unseenCountChanged = ({ unseenCount }: { unseenCount: number }) => {
    this.#emitter.emit(UNSEEN_COUNT_CHANGED, {
      result: unseenCount,
    });
  };

  #unreadCountChanged = ({ unreadCount }: { unreadCount: number }) => {
    this.#emitter.emit(UNREAD_COUNT_CHANGED, {
      result: unreadCount,
    });
  };

  async #initializeSocket(): Promise<void> {
    if (!!this.#socketIo) {
      return;
    }

    const args = { socketUrl: this.#socketUrl };
    this.#emitter.emit('socket.connect.pending', { args });

    this.#socketIo = io(this.#socketUrl, {
      reconnectionDelayMax: 10000,
      transports: ['websocket'],
      query: {
        token: `${this.#token}`,
      },
    });

    this.#socketIo.on('connect', () => {
      this.#emitter.emit('socket.connect.resolved', { args });
    });

    this.#socketIo.on('connect_error', (error) => {
      this.#emitter.emit('socket.connect.resolved', { args, error });
    });

    this.#socketIo?.on(WebSocketEvent.RECEIVED, this.#notificationReceived);
    this.#socketIo?.on(WebSocketEvent.UNSEEN, this.#unseenCountChanged);
    this.#socketIo?.on(WebSocketEvent.UNREAD, this.#unreadCountChanged);
  }

  isSocketEvent(eventName: string): eventName is SocketEventNames {
    return (
      eventName === NOTIFICATION_RECEIVED || eventName === UNSEEN_COUNT_CHANGED || eventName === UNREAD_COUNT_CHANGED
    );
  }

  initialize(): void {
    if (this.#token) {
      this.#initializeSocket().catch((error) => {
        console.error(error);
      });

      return;
    }

    this.callWithSession(async () => {
      this.#initializeSocket().catch((error) => {
        console.error(error);
      });

      return {};
    });
  }
}
