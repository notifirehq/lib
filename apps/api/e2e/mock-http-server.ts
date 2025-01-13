import { HTTPClient, HTTPClientOptions } from '@novu/api/lib/http';

export class MockHTTPClient extends HTTPClient {
  private mockResponses: Map<string, { response: Response; remaining: number }> = new Map();
  private recordedRequests: Array<{ request: Request; response: Response }> = []; // Array to store recorded requests and responses

  constructor(mockConfigs: MockConfig[] = [], options: HTTPClientOptions = {}) {
    super(options);
    this.initializeMockResponses(mockConfigs);
  }

  /**
   * Initializes mock responses from the provided mock configurations.
   * @param mockConfigs An array of mock configuration objects.
   */
  private initializeMockResponses(mockConfigs: MockConfig[]) {
    mockConfigs.forEach(({ baseUrl, path, method, responseCode, responseJson, times }) => {
      const url = new URL(path, baseUrl).toString(); // Construct the full URL
      const response = new Response(JSON.stringify(responseJson), {
        status: responseCode,
        headers: { 'Content-Type': 'application/json' },
      });
      this.mockResponses.set(url + method, { response, remaining: times });
    });
  }

  /**
   * Overrides the request method to return mock responses.
   * @param request The Request object containing the request details.
   * @returns A Promise that resolves to the mock response or an error if no mocks are available.
   */
  async request(request: Request): Promise<Response> {
    const { url } = request;
    const { method } = request;

    const key = url + method; // Create a unique key based on URL and method

    // Check if there is a mock response available for the requested URL and method
    if (this.mockResponses.has(key)) {
      const { response, remaining } = this.mockResponses.get(key)!;

      if (remaining > 0) {
        // Decrease the remaining count
        this.mockResponses.set(key, { response, remaining: remaining - 1 });

        // Record the request and response
        this.recordedRequests.push({ request, response });

        return response;
      } else {
        // If no remaining mocks, remove it
        this.mockResponses.delete(key);
        throw new Error(`No remaining mock responses for ${url} ${method}`);
      }
    }

    // If no mock response is found, fallback to the original request method
    const originalResponse = await super.request(request);

    // Record the original request and response
    this.recordedRequests.push({ request, response: originalResponse });

    return originalResponse;
  }

  /**
   * Getter to access recorded requests and responses.
   * @returns An array of recorded requests and their corresponding responses.
   */
  getRecordedRequests(): Array<{ request: Request; response: Response }> {
    return this.recordedRequests;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface MockConfig {
  baseUrl: string; // The base URL for the request
  path: string; // The specific path for the request
  method: string; // The HTTP method (GET, POST, etc.)
  responseCode: number; // The HTTP response code to return
  responseJson: unknown; // The JSON object to return in the response
  times: number; // The number of times this mock should respond
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface MockConfig {
  baseUrl: string; // The base URL for the request
  path: string; // The specific path for the request
  method: string; // The HTTP method (GET, POST, etc.)
  responseCode: number; // The HTTP response code to return
  responseJson: unknown; // The JSON object to return in the response
  times: number; // The number of times this mock should respond
}
