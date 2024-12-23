import { JSONSchemaDto, UiComponentEnum, UiSchema, UiSchemaGroupEnum } from '@novu/shared';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { TipTapSchema } from '../../../environments-v1/usecases/output-renderers';
import { skipStepUiSchema } from './skip-control.schema';

export const emailControlZodSchema = z
  .object({
    skip: z.object({}).catchall(z.unknown()).optional(),
    /*
     * todo: we need to validate the email editor (body) by type and not string,
     * updating it to TipTapSchema will break the existing upsert issues generation
     */
    body: z.string().optional().default(''),
    subject: z.string().optional().default(''),
  })
  .strict();

export type EmailControlType = z.infer<typeof emailControlZodSchema>;

export const emailControlSchema = zodToJsonSchema(emailControlZodSchema) as JSONSchemaDto;
export const emailUiSchema: UiSchema = {
  group: UiSchemaGroupEnum.EMAIL,
  properties: {
    body: {
      component: UiComponentEnum.BLOCK_EDITOR,
    },
    subject: {
      component: UiComponentEnum.TEXT_INLINE_LABEL,
    },
    skip: skipStepUiSchema.properties.skip,
  },
};
