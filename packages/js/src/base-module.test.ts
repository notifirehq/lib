import { InboxService } from './api';
import { BaseModule } from './base-module';
import { NovuEventEmitter } from './event-emitter';

beforeAll(() => jest.spyOn(global, 'fetch'));
afterAll(() => jest.restoreAllMocks());

describe('callWithSession(fn)', () => {
  test('should invoke callback function immediately if session is initialized', async () => {
    const emitter = new NovuEventEmitter();
    const bm = new BaseModule({
      inboxServiceInstance: {
        isSessionInitialized: true,
      } as InboxService,
      eventEmitterInstance: emitter,
    });

    const cb = jest.fn();
    bm.callWithSession(cb);
    expect(cb).toHaveBeenCalled();
  });

  test('should invoke callback function as soon as session is initialized', async () => {
    const emitter = new NovuEventEmitter();
    const bm = new BaseModule({
      inboxServiceInstance: {} as InboxService,
      eventEmitterInstance: emitter,
    });

    const cb = jest.fn();

    bm.callWithSession(cb);
    expect(cb).not.toHaveBeenCalled();

    emitter.emit('session.initialize.resolved', {
      args: {
        applicationIdentifier: 'foo',
        subscriberId: 'bar',
      },
      data: {
        token: 'cafebabe',
        totalUnreadCount: 10,
        removeNovuBranding: true,
      },
    });

    expect(cb).toHaveBeenCalled();
  });

  test('should return an error if session initialization failed', async () => {
    const emitter = new NovuEventEmitter();
    const bm = new BaseModule({
      inboxServiceInstance: {} as InboxService,
      eventEmitterInstance: emitter,
    });

    emitter.emit('session.initialize.resolved', {
      args: {
        applicationIdentifier: 'foo',
        subscriberId: 'bar',
      },
      error: new Error('Failed to initialize session'),
    });

    const cb = jest.fn();
    const result = await bm.callWithSession(cb);
    expect(result).toEqual({
      error: new Error('Failed to initialize session, please contact the support'),
    });
  });
});
