import { ExtendedJsonSchema, Schema } from '../../../types/schema.types';

const ABSOLUTE_AND_RELATIVE_URL_REGEX = '^(?!mailto:)(?:(https?):\\/\\/[^\\s/$.?#].[^\\s]*)|^(\\/[^\\s]*)$';

const redirectSchema = {
  type: 'object',
  properties: {
    url: {
      type: 'string',
      pattern: ABSOLUTE_AND_RELATIVE_URL_REGEX,
      errorMessage:
        'The url field must be a relative URL starting with "/" or an absolute URL starting with "https" or "http".',
    },
    target: {
      type: 'string',
      enum: ['_self', '_blank', '_parent', '_top', '_unfencedTop'],
      default: '_blank',
      errorMessage: 'The target must be one of _self, _blank, _parent, _top, or _unfencedTop.',
    },
  },
  if: {
    properties: {
      url: {
        pattern: '^/', // Check if url starts with a slash (relative path)
      },
    },
  },
  then: {
    properties: {
      target: {
        default: '_self',
      },
    },
  },
  else: {
    properties: {
      target: {
        default: '_blank',
      },
    },
  },
  required: ['url'],
  additionalProperties: false,
} as const satisfies ExtendedJsonSchema;

const actionSchema = {
  type: 'object',
  properties: {
    label: { type: 'string' },
    redirect: redirectSchema,
  },
  required: ['label'],
  additionalProperties: false,
} as const satisfies Schema;

const inAppOutputSchema = {
  type: 'object',
  properties: {
    subject: { type: 'string' },
    body: { type: 'string' },
    avatar: { type: 'string', format: 'uri' },
    primaryAction: actionSchema,
    secondaryAction: actionSchema,
    data: { type: 'object', additionalProperties: true },
    redirect: redirectSchema,
  },
  required: ['body'],
  additionalProperties: false,
} as const satisfies Schema;

const inAppResultSchema = {
  type: 'object',
  properties: {
    seen: { type: 'boolean' },
    read: { type: 'boolean' },
    lastSeenDate: { type: 'string', format: 'date-time', nullable: true },
    lastReadDate: { type: 'string', format: 'date-time', nullable: true },
  },
  required: ['seen', 'read', 'lastSeenDate', 'lastReadDate'],
  additionalProperties: false,
} as const satisfies Schema;

export const inAppChannelSchemas = {
  output: inAppOutputSchema,
  result: inAppResultSchema,
};
