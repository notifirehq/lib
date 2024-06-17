import { expect, it, describe, beforeEach, afterEach, vi } from 'vitest';

import { Client } from './client';
import { DEFAULT_NOVU_API_BASE_URL, HttpMethodEnum, NovuApiEndpointsEnum } from './constants';
import {
  ExecutionEventInputInvalidError,
  ExecutionStateCorruptError,
  StepNotFoundError,
  WorkflowNotFoundError,
} from './errors';
import { workflow } from './workflow';
import { IEvent } from './types';
import { delayOutputSchema } from './schemas';
import { FromSchema } from 'json-schema-to-ts';
import { emailChannelSchemas } from './schemas/steps/channels/email.schema';

describe('Novu Client', () => {
  let client: Client;

  beforeEach(async () => {
    const newWorkflow = workflow('setup-workflow', async ({ step }) => {
      await step.email('send-email', async () => ({
        body: 'Test Body',
        subject: 'Subject',
      }));
    });

    client = new Client();
    client.addWorkflows([newWorkflow]);
  });

  it('should discover 1 workflow', () => {
    const discovery = client.discover();
    expect(discovery.workflows).toHaveLength(1);
  });

  describe('discover method', () => {
    it('should discover setup workflow', () => {
      const discovery = client.discover();
      expect(discovery.workflows).toHaveLength(1);
    });

    it('should discover a complex workflow with all supported step types', async () => {
      const workflowId = 'complex-workflow';

      const newWorkflow = workflow(workflowId, async ({ step }) => {
        await step.email('send-email', async () => ({
          body: 'Test Body',
          subject: 'Subject',
        }));

        const inAppRes = await step.inApp('send-in-app', async () => ({
          body: 'Test Body',
          subject: 'Subject',
        }));

        await step.chat('send-chat', async () => ({
          body: 'Test Body',
        }));

        await step.push('send-push', async () => ({
          body: 'Test Body',
          subject: 'Title',
        }));

        await step.custom(
          'send-custom',
          async (input) => ({
            fooBoolean: inAppRes.read,
            fooString: input.someString,
          }),
          {
            inputSchema: {
              type: 'object',
              properties: {
                someString: { type: 'string' },
              },
              required: ['someString'],
              additionalProperties: false,
            } as const,
            outputSchema: {
              type: 'object',
              properties: {
                fooBoolean: { type: 'boolean' },
                fooString: { type: 'string' },
              },
              required: ['fooBoolean', 'fooString'],
              additionalProperties: false,
            } as const,
          }
        );

        await step.sms('send-sms', async () => ({
          body: 'Test Body',
          to: '+1234567890',
        }));

        await step.digest('digest', async () => ({
          amount: 1,
          unit: 'hours',
        }));

        await step.delay('delay', async () => ({
          type: 'regular',
          amount: 1,
          unit: 'hours',
        }));
      });

      client.addWorkflows([newWorkflow]);

      // wait for discovery to finish
      await new Promise((resolve) => setTimeout(resolve, 1));

      const discovery = client.discover();
      expect(discovery.workflows).toHaveLength(2);

      const foundWorkflow = discovery.workflows.find((workflowX) => workflowX.workflowId === workflowId);

      const stepEmail = foundWorkflow?.steps.find((stepX) => stepX.stepId === 'send-email');
      expect(stepEmail).toBeDefined();
      if (stepEmail === undefined) throw new Error('stepEmail is undefined');
      expect(stepEmail.type).toBe('email');
      expect(stepEmail.code).toContain(`body: "Test Body"`);
      expect(stepEmail.code).toContain(`subject: "Subject"`);

      const stepInApp = foundWorkflow?.steps.find((stepX) => stepX.stepId === 'send-in-app');
      expect(stepInApp).toBeDefined();
      if (stepInApp === undefined) throw new Error('stepEmail is undefined');
      expect(stepInApp.type).toBe('in_app');
      expect(stepInApp.code).toContain(`body: "Test Body"`);
      expect(stepInApp.code).toContain(`subject: "Subject"`);

      const stepChat = foundWorkflow?.steps.find((stepX) => stepX.stepId === 'send-chat');
      expect(stepChat).toBeDefined();
      if (stepChat === undefined) throw new Error('stepEmail is undefined');
      expect(stepChat.type).toBe('chat');
      expect(stepChat.code).toContain(`body: "Test Body"`);

      const stepPush = foundWorkflow?.steps.find((stepX) => stepX.stepId === 'send-push');
      expect(stepPush).toBeDefined();
      if (stepPush === undefined) throw new Error('stepEmail is undefined');
      expect(stepPush.type).toBe('push');
      expect(stepPush.code).toContain(`body: "Test Body"`);
      expect(stepPush.code).toContain(`subject: "Title"`);

      const stepCustom = foundWorkflow?.steps.find((stepX) => stepX.stepId === 'send-custom');
      expect(stepCustom).toBeDefined();
      if (stepCustom === undefined) throw new Error('stepEmail is undefined');
      expect(stepCustom.type).toBe('custom');
      expect(stepCustom.code).toContain(`fooBoolean: inAppRes.read`);
      expect(stepCustom.code).toContain(`fooString: input.someString`);

      const stepSms = foundWorkflow?.steps.find((stepX) => stepX.stepId === 'send-sms');
      expect(stepSms).toBeDefined();
      if (stepSms === undefined) throw new Error('stepEmail is undefined');
      expect(stepSms.type).toBe('sms');
      expect(stepSms.code).toContain(`body: "Test Body"`);
      expect(stepSms.code).toContain(`to: "+1234567890"`);

      const stepDigest = foundWorkflow?.steps.find((stepX) => stepX.stepId === 'digest');
      expect(stepDigest).toBeDefined();
      if (stepDigest === undefined) throw new Error('stepEmail is undefined');
      expect(stepDigest.type).toBe('digest');
      expect(stepDigest.code).toContain(`amount: 1`);
      expect(stepDigest.code).toContain(`unit: "hours"`);

      const stepDelay = foundWorkflow?.steps.find((stepX) => stepX.stepId === 'delay');
      expect(stepDelay).toBeDefined();
      if (stepDelay === undefined) throw new Error('stepEmail is undefined');
      expect(stepDelay.type).toBe('delay');
      expect(stepDelay.code).toContain(`amount: 1`);
      expect(stepDelay.code).toContain(`unit: "hours"`);
    });

    it('should discover a slack provide with blocks', async () => {
      const workflowId = 'complex-workflow';

      const newWorkflow = workflow(workflowId, async ({ step }) => {
        await step.chat(
          'send-chat',
          async () => ({
            body: 'Test Body',
          }),
          {
            providers: {
              slack: async ({ inputs }) => {
                const blocks = [
                  {
                    type: 'header' as any,
                    text: {
                      type: 'plain_text',
                      text: 'Pretty Header',
                    },
                  },
                ];

                return { blocks };
              },
            },
          }
        );
      });

      client.addWorkflows([newWorkflow]);

      const discovery = client.discover();
      expect(discovery.workflows).toHaveLength(2);

      const foundWorkflow = discovery.workflows.find((workflowX) => workflowX.workflowId === workflowId);

      const stepChat = foundWorkflow?.steps.find((stepX) => stepX.stepId === 'send-chat');
      expect(stepChat).toBeDefined();
      if (stepChat === undefined) throw new Error('stepEmail is undefined');
      expect(stepChat.type).toBe('chat');
      expect(stepChat.code).toContain(`body: "Test Body"`);
      expect(stepChat.providers[0].code).toContain(`type: "plain_text"`);
      expect(stepChat.providers[0].code).toContain(`text: "Pretty Header"`);
    });
  });

  describe('executeWorkflow method', () => {
    it('should execute workflow successfully when action is execute and data is provided', async () => {
      const delayConfiguration: FromSchema<typeof delayOutputSchema> = { type: 'regular', unit: 'seconds', amount: 1 };
      const emailConfiguration: FromSchema<typeof emailChannelSchemas.output> = {
        body: 'Test Body',
        subject: 'Subject',
      };
      const newWorkflow = workflow('test-workflow', async ({ step }) => {
        await step.email('send-email', async () => emailConfiguration);
        await step.delay('delay', async () => delayConfiguration);
      });

      const emailEvent: IEvent = {
        action: 'execute',
        data: {},
        workflowId: 'test-workflow',
        stepId: 'send-email',
        subscriber: {},
        state: [],
        inputs: {},
      };

      client.addWorkflows([newWorkflow]);

      const emailExecutionResult = await client.executeWorkflow(emailEvent);

      expect(emailExecutionResult).toBeDefined();
      expect(emailExecutionResult.outputs).toBeDefined();
      if (!emailExecutionResult.outputs) throw new Error('executionResult.outputs is undefined');
      const body = (emailExecutionResult.outputs as any).body as string;
      expect(body).toBe(emailConfiguration.body);
      const subject = (emailExecutionResult.outputs as any).subject as string;
      expect(subject).toBe(emailConfiguration.subject);
      expect(emailExecutionResult.providers).toEqual({});
      const metadata = emailExecutionResult.metadata;
      expect(metadata.status).toBe('success');
      expect(metadata.error).toBe(false);
      expect(metadata.duration).toEqual(expect.any(Number));

      const delayEvent: IEvent = {
        action: 'execute',
        data: {},
        workflowId: 'test-workflow',
        stepId: 'delay',
        subscriber: {},
        state: [
          {
            stepId: 'send-email',
            outputs: {},
            state: {
              status: 'completed',
              error: undefined,
            },
          },
        ],
        inputs: {},
      };

      const delayExecutionResult = await client.executeWorkflow(delayEvent);

      expect(delayExecutionResult).toBeDefined();
      expect(delayExecutionResult.outputs).toBeDefined();
      if (!delayExecutionResult.outputs) throw new Error('executionResult.outputs is undefined');
      const unit = (delayExecutionResult.outputs as any).unit as string;
      expect(unit).toBe(delayConfiguration.unit);
      const amount = (delayExecutionResult.outputs as any).amount as string;
      expect(amount).toBe(delayConfiguration.amount);
      expect(delayExecutionResult.providers).toEqual({});
      const type = (delayExecutionResult.outputs as any).type as string;
      expect(type).toBe(delayConfiguration.type);
    });

    it('should compile default input variable', async () => {
      const bodyTemplate = `
{% for element in elements %}
  {{ element }}
{% endfor %}`;

      const newWorkflow = workflow(
        'test-workflow',
        async ({ step }) => {
          await step.email(
            'send-email',
            async (inputs) => {
              return {
                subject: 'body static prefix' + ' ' + inputs.name + ' ' + inputs.lastName + ' ' + inputs.role,
                body: inputs.body,
              };
            },
            {
              inputSchema: {
                type: 'object',
                properties: {
                  name: { type: 'string', default: '{{name}}' },
                  lastName: { type: 'string', default: '{{subscriber.lastName}}' },
                  role: { type: 'string', default: '{{role}}' },
                  body: { type: 'string', default: bodyTemplate },
                },
                required: [],
                additionalProperties: false,
              } as const,
            }
          );
        },
        {
          payloadSchema: {
            type: 'object',
            properties: {
              name: { type: 'string', default: '`default_name`' },
              role: { type: 'string' },
              elements: { type: 'array' },
            },
            required: [],
            additionalProperties: false,
          } as const,
        }
      );

      client.addWorkflows([newWorkflow]);

      const emailEvent: IEvent = {
        action: 'execute',
        data: { role: 'product manager', elements: ['cat', 'dog'] },
        workflowId: 'test-workflow',
        stepId: 'send-email',
        subscriber: {
          lastName: "Smith's",
        },
        state: [],
        inputs: {},
      };

      const emailExecutionResult = await client.executeWorkflow(emailEvent);

      expect(emailExecutionResult).toBeDefined();
      expect(emailExecutionResult.outputs).toBeDefined();
      if (!emailExecutionResult.outputs) throw new Error('executionResult.outputs is undefined');
      const subject = (emailExecutionResult.outputs as any).subject as string;
      expect(subject).toBe("body static prefix `default_name` Smith's product manager");
      const body = (emailExecutionResult.outputs as any).body as string;
      expect(body).toContain('cat');
      expect(body).toContain('dog');
    });

    it('should throw error on execute action without data', async () => {
      const newWorkflow = workflow('test-workflow', async ({ step }) => {
        await step.email('send-email', async () => ({ body: 'Test Body', subject: 'Subject' }));
      });

      client.addWorkflows([newWorkflow]);

      const event: IEvent = {
        action: 'execute',
        workflowId: 'test-workflow',
        stepId: 'send-email',
        subscriber: {},
        state: [],
        data: undefined as any,
        inputs: {},
      };

      await expect(client.executeWorkflow(event)).rejects.toThrow(ExecutionEventInputInvalidError);
    });

    it('should preview workflow successfully when action is preview', async () => {
      const newWorkflow = workflow('test-workflow', async ({ step }) => {
        await step.email('send-email', async () => ({ body: 'Test Body', subject: 'Subject' }));
      });

      client.addWorkflows([newWorkflow]);

      const event: IEvent = {
        action: 'preview',
        workflowId: 'test-workflow',
        stepId: 'send-email',
        subscriber: {},
        state: [],
        data: {},
        inputs: {},
      };

      const executionResult = await client.executeWorkflow(event);

      expect(executionResult).toBeDefined();
      expect(executionResult.outputs).toBeDefined();
      if (!executionResult.outputs) throw new Error('executionResult.outputs is undefined');

      const body = (executionResult.outputs as any).body as string;
      expect(body).toBe('Test Body');

      const subject = (executionResult.outputs as any).subject as string;
      expect(subject).toBe('Subject');

      expect(executionResult.providers).toEqual({});

      const metadata = executionResult.metadata;
      expect(metadata.status).toBe('success');
      expect(metadata.error).toBe(false);
      expect(metadata.duration).toEqual(expect.any(Number));
    });

    it('should preview workflow successfully when action is preview and skipped', async () => {
      const newWorkflow = workflow('test-workflow', async ({ step }) => {
        await step.email('send-email', async () => ({ body: 'Test Body', subject: 'Subject' }), {
          skip: () => true,
        });
      });

      client.addWorkflows([newWorkflow]);

      const event: IEvent = {
        action: 'preview',
        workflowId: 'test-workflow',
        stepId: 'send-email',
        subscriber: {},
        state: [],
        data: {},
        inputs: {},
      };

      const executionResult = await client.executeWorkflow(event);

      expect(executionResult).toBeDefined();
      expect(executionResult.outputs).toBeDefined();
      if (!executionResult.outputs) throw new Error('executionResult.outputs is undefined');

      const body = (executionResult.outputs as any).body as string;
      expect(body).toBe('Test Body');

      const subject = (executionResult.outputs as any).subject as string;
      expect(subject).toBe('Subject');

      expect(executionResult.providers).toEqual({});

      const metadata = executionResult.metadata;
      expect(metadata.status).toBe('success');
      expect(metadata.error).toBe(false);
      expect(metadata.duration).toEqual(expect.any(Number));
    });

    it('should throw an error when workflow ID is invalid', async () => {
      // non-existing workflow ID
      const event: IEvent = {
        action: 'execute',
        workflowId: 'non-existent-workflow',
        stepId: 'send-email',
        subscriber: {},
        state: [],
        data: {},
        inputs: {},
      };

      await expect(client.executeWorkflow(event)).rejects.toThrow(WorkflowNotFoundError);

      const newWorkflow = workflow('test-workflow2', async ({ step }) => {
        await step.email('send-email', async () => ({ body: 'Test Body', subject: 'Subject' }));
      });

      client.addWorkflows([newWorkflow]);

      // no workflow ID
      const event2 = {
        action: 'execute',
        stepId: 'send-email',
        subscriber: {},
        state: [],
      } as any;
      await expect(client.executeWorkflow(event2)).rejects.toThrow(WorkflowNotFoundError);
    });

    it('should throw and error when step ID is not found', async () => {
      const newWorkflow = workflow('test-workflow', async ({ step }) => {
        await step.email('send-email', async () => ({ body: 'Test Body', subject: 'Subject' }));
      });

      client.addWorkflows([newWorkflow]);

      const event: IEvent = {
        action: 'execute',
        workflowId: 'test-workflow',
        stepId: 'non-existing-step',
        subscriber: {},
        state: [],
        data: {},
        inputs: {},
      };

      await expect(client.executeWorkflow(event)).rejects.toThrow(ExecutionStateCorruptError);
    });

    it('should throw an error when action is not provided', async () => {
      const newWorkflow = workflow('test-workflow', async ({ step }) => {
        await step.email('send-email', async () => ({ body: 'Test Body', subject: 'Subject' }));
      });

      client.addWorkflows([newWorkflow]);

      const event = {
        workflowId: 'test-workflow',
        stepId: 'send-email',
        subscriber: {},
        state: [],
        inputs: {},
      } as any;

      await expect(client.executeWorkflow(event)).rejects.toThrow(Error);
    });
  });

  describe('getCode method', () => {
    let getCodeClientInstance: Client;

    const stepExecuteFunc = async () => ({
      body: 'Test Body',
      subject: 'Subject',
    });

    const workflowExecuteFunc = async ({ step }) => {
      await step.email('send-email', stepExecuteFunc);
    };

    beforeEach(async () => {
      getCodeClientInstance = new Client();

      const newWorkflow = workflow('setup-workflow', workflowExecuteFunc);

      getCodeClientInstance.addWorkflows([newWorkflow]);
    });

    it('should throw an error when workflow ID is not found', () => {
      expect(() => getCodeClientInstance.getCode('non-existent-workflow')).toThrow(WorkflowNotFoundError);
    });

    it('should throw an error when step ID is provided but not found in the workflow', async () => {
      const newWorkflow = workflow('test-workflow', workflowExecuteFunc);

      getCodeClientInstance.addWorkflows([newWorkflow]);

      expect(() => getCodeClientInstance.getCode('test-workflow', 'non-existent-step')).toThrow(StepNotFoundError);
    });

    it('should return code for the entire workflow when only workflow ID is provided', () => {
      const codeResult = getCodeClientInstance.getCode('setup-workflow');

      expect(codeResult.code).toEqual(workflowExecuteFunc.toString());
    });

    it('should return code for a specific step when both workflow ID and step ID are provided', async () => {
      const codeResult = getCodeClientInstance.getCode('setup-workflow', 'send-email');

      expect(codeResult.code).toEqual(stepExecuteFunc.toString());
    });
  });
});
