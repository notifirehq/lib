import { JSONSchemaDto, UiComponentEnum, UiSchema, UiSchemaGroupEnum } from '@novu/shared';

import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { skipZodSchema } from './skip-control.schema';

export const EmailStepControlZodSchema = z
  .object({
    skip: skipZodSchema,
    body: z.string().optional().default(''),
    subject: z.string().optional().default(''),
  })
  .strict();

export const emailStepControlSchema = zodToJsonSchema(EmailStepControlZodSchema) as JSONSchemaDto;

export type EmailStepControlType = z.infer<typeof EmailStepControlZodSchema>;

export const emailStepUiSchema: UiSchema = {
  group: UiSchemaGroupEnum.EMAIL,
  properties: {
    body: {
      component: UiComponentEnum.BLOCK_EDITOR,
    },
    subject: {
      component: UiComponentEnum.TEXT_INLINE_LABEL,
    },
  },
};
