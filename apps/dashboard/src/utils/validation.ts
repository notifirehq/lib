import { z } from 'zod';
import { capitalize } from './string';

const getIssueField = (issue: z.ZodIssueBase) => capitalize(`${issue.path[issue.path.length - 1]}`);
const pluralize = (count: number | bigint) => (count === 1 ? '' : 's');

/**
 * Custom error map for Zod issues.
 *
 * Override the default error messages here to refine the error messages shown in forms.
 *
 * For all built-in defaults, @see https://github.com/colinhacks/zod/blob/main/src/locales/en.ts
 */
const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  const issueField = getIssueField(issue);

  if (issue.code === z.ZodIssueCode.too_big) {
    if (issue.type === 'array') {
      return {
        message: `${issueField} must contain at most ${issue.maximum} element${pluralize(issue.maximum)}`,
      };
    }

    if (issue.type === 'string') {
      return {
        message: `${issueField} must be at most ${issue.maximum} character${pluralize(issue.maximum)}`,
      };
    }

    if (issue.type === 'number' || issue.type === 'bigint') {
      return {
        message: `${issueField} must be at most ${issue.maximum}`,
      };
    }

    if (issue.type === 'date') {
      return {
        message: `${issueField} must be at most ${new Date(Number(issue.maximum)).toLocaleString()}`,
      };
    }
  }

  if (issue.code === z.ZodIssueCode.too_small) {
    if (issue.type === 'array') {
      return {
        message: `${issueField} must contain at least ${issue.minimum} element${pluralize(issue.minimum)}`,
      };
    }

    if (issue.type === 'string') {
      if (String(ctx.data).length === 0) {
        return {
          message: `${issueField} is required`,
        };
      } else {
        return {
          message: `${issueField} must be at least ${issue.minimum} character${pluralize(issue.minimum)}`,
        };
      }
    }

    if (issue.type === 'number' || issue.type === 'bigint') {
      return {
        message: `${issueField} must be at least ${issue.minimum}`,
      };
    }

    if (issue.type === 'date') {
      return {
        message: `${issueField} must be at least ${new Date(Number(issue.minimum)).toLocaleString()}`,
      };
    }
  }

  if (issue.code === z.ZodIssueCode.invalid_string && issue.validation === 'email') {
    return {
      message: `${issueField} must be a valid email`,
    };
  }

  if (issue.code === z.ZodIssueCode.invalid_enum_value) {
    return {
      message: `${issueField} must be one of ${issue.options.join(', ')}`,
    };
  }
  return { message: ctx.defaultError };
};

export const overrideZodErrorMap = () => {
  z.setErrorMap(customErrorMap);
};
