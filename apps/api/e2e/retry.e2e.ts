import { Novu } from '@novu/api';
import { expect } from 'chai';
import { ErrorDto } from '@novu/api/models/errors';
import { expectSdkExceptionGeneric } from '../src/app/shared/helpers/e2e/sdk/e2e-sdk.helper';
import { MockHTTPClient } from './mock-http-server';

const BACKEND_URL = 'http://example.com';
const TOPICS_PATH = '/v1/topics';
const TRIGGER_PATH = '/v1/events/trigger';

const hasAllEqual = (arr: Array<string>) => arr.every((val) => val === arr[0]);
const hasUniqueOnly = (arr: Array<string>) => Array.from(new Set(arr)).length === arr.length;

let novuClient: Novu;

function buildErrorDto(path: string, message: string, status: number) {
  return new ErrorDto({
    path,
    timestamp: new Date().toDateString(),
    message,
    statusCode: status,
  });
}

const IDEMPOTENCY_HEADER_KEY = 'idempotency-key';

function getIdempotencyRequestKeys(mockHTTPClient: MockHTTPClient) {
  return mockHTTPClient
    .getRecordedRequests()
    .map((pair) => pair.request.headers.get(IDEMPOTENCY_HEADER_KEY))
    .filter((value) => value != null);
}

describe('Novu Node.js package - Retries and idempotency-key', () => {
  it('should retry trigger and generate idempotency-key only once for request', async () => {
    const mockHTTPClient = new MockHTTPClient([
      {
        baseUrl: BACKEND_URL,
        path: TRIGGER_PATH,
        responseCode: 500,
        responseJson: buildErrorDto(TRIGGER_PATH, 'Server Exception', 500),
        method: 'POST',
        times: 3,
      },
      {
        baseUrl: BACKEND_URL,
        path: TRIGGER_PATH,
        responseCode: 201,
        responseJson: { acknowledged: true, transactionId: '1003', status: 'error' },
        method: 'POST',
        times: 1,
      },
    ]);
    novuClient = new Novu({
      apiKey: 'fakeKey',
      serverURL: BACKEND_URL,
      httpClient: mockHTTPClient,
    });

    await novuClient.trigger({
      name: 'fake-workflow',
      to: { subscriberId: '123' },
      payload: {},
    });

    const requestKeys = getIdempotencyRequestKeys(mockHTTPClient);
    expect(hasAllEqual(requestKeys)).to.be.eq(true);
  });

  it('should generate different idempotency-key for each request', async () => {
    const keys: string[] = [];

    for (let i = 0; i < 10; i += 1) {
      const httpClient = new MockHTTPClient([
        {
          baseUrl: BACKEND_URL,
          path: TRIGGER_PATH,
          responseCode: 500,
          responseJson: { message: 'Server Exception' },
          method: 'POST',
          times: 10,
        },
        {
          baseUrl: BACKEND_URL,
          path: TRIGGER_PATH,
          responseCode: 201,
          responseJson: { acknowledged: true, transactionId: '1003' },
          method: 'POST',
          times: 10,
        },
      ]);
      novuClient = new Novu({
        apiKey: 'fakeKey',
        serverURL: BACKEND_URL,
        httpClient,
      });
      const result = await novuClient.trigger({ name: 'fake-workflow', to: { subscriberId: '123' }, payload: {} });
      const idempotencyRequestKeys = getIdempotencyRequestKeys(httpClient);
      keys.push(...idempotencyRequestKeys);
    }
    expect(hasUniqueOnly(keys)).to.be.eq(true);
  });

  it('should retry on status 422 and regenerate idempotency-key for every retry', async () => {
    const idempotencyKeys: string[] = [];

    novuClient = new Novu({
      apiKey: 'fakeKey',
      serverURL: BACKEND_URL,
      httpClient: new MockHTTPClient([
        {
          baseUrl: BACKEND_URL,
          path: TRIGGER_PATH,
          responseCode: 422,
          responseJson: buildErrorDto(TRIGGER_PATH, 'Unprocessable Content', 422),
          method: 'POST',
          times: 3,
        },
        {
          baseUrl: BACKEND_URL,
          path: TRIGGER_PATH,
          responseCode: 201,
          responseJson: { acknowledged: true, transactionId: '1003' },
          method: 'POST',
          times: 1,
        },
      ]),
    });

    const result = await novuClient.trigger({ name: 'fake-workflow', to: { subscriberId: '123' }, payload: {} });

    // idempotency key should be regenerated for every retry for http status 422.
    expect(hasUniqueOnly(idempotencyKeys)).to.be.eq(true);
    expect(result.headers[IDEMPOTENCY_HEADER_KEY]).to.be.ok;
  });

  it('should retry getting topics list', async () => {
    novuClient = new Novu({
      apiKey: 'fakeKey',
      serverURL: BACKEND_URL,
      httpClient: new MockHTTPClient([
        {
          baseUrl: BACKEND_URL,
          path: TOPICS_PATH,
          responseCode: 500,
          responseJson: { message: 'Server Exception' },
          method: 'GET',
          times: 3,
        },
        {
          baseUrl: BACKEND_URL,
          path: TOPICS_PATH,
          responseCode: 200,
          responseJson: [{}, {}],
          method: 'GET',
          times: 1,
        },
      ]),
    });

    const result = await novuClient.topics.list({});
    expect(result.headers[IDEMPOTENCY_HEADER_KEY]).to.be.undefined;
  });

  it('should fail after reaching max retries', async () => {
    novuClient = new Novu({
      apiKey: 'fakeKey',
      serverURL: BACKEND_URL,
      httpClient: new MockHTTPClient([
        {
          baseUrl: BACKEND_URL,
          path: TOPICS_PATH,
          responseCode: 500,
          responseJson: { message: 'Server Exception' },
          method: 'GET',
          times: 4,
        },
        {
          baseUrl: BACKEND_URL,
          path: TOPICS_PATH,
          responseCode: 200,
          responseJson: [{}, {}],
          method: 'GET',
          times: 1,
        },
      ]),
    });

    const { error } = await expectSdkExceptionGeneric(() => novuClient.topics.list({}));
    expect(error?.statusCode).to.be.eq(500);
  });

  const NON_RECOVERABLE_ERRORS: Array<[number, string]> = [
    [400, 'Bad Request'],
    [401, 'Unauthorized'],
    [403, 'Forbidden'],
    [404, 'Not Found'],
    [405, 'Method not allowed'],
    [413, 'Payload Too Large'],
    [414, 'URI Too Long'],
    [415, 'Unsupported Media Type'],
  ];
  NON_RECOVERABLE_ERRORS.forEach(([status, message]) => {
    it('should not retry on non-recoverable %i error', async () => {
      novuClient = new Novu({
        apiKey: 'fakeKey',
        serverURL: BACKEND_URL,
        httpClient: new MockHTTPClient([
          {
            baseUrl: BACKEND_URL,
            path: TOPICS_PATH,
            responseCode: status,
            responseJson: buildErrorDto(TOPICS_PATH, message, status),
            method: 'GET',
            times: 3,
          },
          {
            baseUrl: BACKEND_URL,
            path: TOPICS_PATH,
            responseCode: 200,
            responseJson: [{}, {}],
            method: 'GET',
            times: 1,
          },
        ]),
      });

      const { error } = await expectSdkExceptionGeneric(() => novuClient.topics.list({}));
      expect(error?.statusCode).to.be.eq(status);
    });
  });

  it('should retry on various errors until it reaches successful response', async () => {
    const mockClient = new MockHTTPClient([
      {
        baseUrl: BACKEND_URL,
        path: TOPICS_PATH,
        responseCode: 429,
        responseJson: buildErrorDto(TOPICS_PATH, 'Too many requests', 429),
        method: 'GET',
        times: 1,
      },
      {
        baseUrl: BACKEND_URL,
        path: TOPICS_PATH,
        responseCode: 408,
        responseJson: buildErrorDto(TOPICS_PATH, 'Request Timeout', 408),
        method: 'GET',
        times: 1,
      },
      {
        baseUrl: BACKEND_URL,
        path: TOPICS_PATH,
        responseCode: 504,
        responseJson: buildErrorDto(TOPICS_PATH, 'Gateway timeout', 504),
        method: 'GET',
        times: 1,
      },
      {
        baseUrl: BACKEND_URL,
        path: TOPICS_PATH,
        responseCode: 422,
        responseJson: buildErrorDto(TOPICS_PATH, 'Unprocessable Content', 422),
        method: 'GET',
        times: 1,
      },
      {
        baseUrl: BACKEND_URL,
        path: TOPICS_PATH,
        responseCode: 200,
        responseJson: [{}, {}],
        method: 'GET',
        times: 1,
      },
    ]);

    novuClient = new Novu({
      apiKey: 'fakeKey',
      serverURL: BACKEND_URL,
      httpClient: mockClient,
    });

    await novuClient.topics.list({});
  });

  describe('hasAllEqual helper function', () => {
    it('should return true when all items are equal', () => {
      const arr = ['a', 'a', 'a', 'a'];
      expect(hasAllEqual(arr)).to.be.eq(true);
    });

    it('should return false when items are not equal', () => {
      const arr = ['a', 'b', 'b', 'b'];
      expect(hasAllEqual(arr)).to.be.eq(false);
    });
  });

  describe('hasUniqueOnly helper function', () => {
    it('should return true when all items are unique', () => {
      const arr = ['a', 'b', 'c', 'd'];
      expect(hasUniqueOnly(arr)).to.be.eq(true);
    });

    it('should return false when items are not unique', () => {
      const arr = ['a', 'a', 'c', 'd'];
      expect(hasUniqueOnly(arr)).to.be.eq(false);
    });
  });
});
