import React, { FormEvent, FormEventHandler } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { JsonSchemaForm } from './JsonSchemaForm';
import { RJSFSchema } from '@rjsf/utils';
import { HStack } from '../../styled-system/jsx';
import { IconOutlineSave } from '../icons';
import { Title, Button } from '../components';

export default {
  title: 'Components/JsonSchemaForm',
  component: JsonSchemaForm,
  argTypes: {},
} as Meta<typeof JsonSchemaForm>;

const Template: StoryFn<typeof JsonSchemaForm> = ({ ...args }) => {
  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    console.log(event.target);

    const data = new FormData(event.target as HTMLFormElement);
    console.log({ data });
  };

  return (
    <form onSubmit={onSubmit}>
      <HStack justifyContent="space-between">
        <Title variant="subsection">Step inputs</Title>
        <Button type="submit" Icon={IconOutlineSave}>
          Save
        </Button>
      </HStack>
      <JsonSchemaForm {...args} />
    </form>
  );
};
export const ExampleForm = Template.bind({});

const schema: RJSFSchema = {
  type: 'object',
  title: 'Example form',
  definitions: {
    locations: {
      enum: ['New York', 'Amsterdam', 'Hong Kong'],
    },
  },
  properties: {
    checkbox: {
      type: 'boolean',
      title: 'Checkbox field',
      default: true,
    },
    text: {
      type: 'string',
      title: 'Text field',
      default: 'lorem ipsum',
    },
    stringFormats: {
      type: 'object',
      title: 'Simple object',
      properties: {
        country: {
          type: 'string',
          title: 'Country',
        },
        address: {
          type: 'string',
          title: 'Address',
        },
        location: {
          title: 'Location',
          $ref: '#/definitions/locations',
        },
      },
      required: ['address'],
    },
    strings: {
      type: 'array',
      title: 'Simple String Array',
      description: 'This is a simple string array',
      items: {
        type: 'string',
        default: 'a string indeed',
      },
      minItems: 1,
    },
    booleans: {
      type: 'array',
      title: 'Simple Boolean Array',
      description: 'This is a simple array',
      items: {
        type: 'boolean',
        default: true,
      },
      minItems: 1,
    },
    users: {
      type: 'array',
      title: 'Array of objects',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            title: 'Name',
            default: 'John Doe',
          },
          age: { type: 'integer', default: 22, title: 'Age' },
          birthday: {
            type: 'string',
            title: 'Birthday',
            pattern: '\\d{2}-\\d{1,2}',
          },
        },
        required: ['name'],
      },
      minItems: 1,
    },
  },
};

ExampleForm.args = {
  schema: schema,
  formData: { money: 43 },
};

const MATCH_DESIGNS_SCHEMA: RJSFSchema = {
  type: 'object',
  title: 'Email content',
  properties: {
    TeamImage: {
      title: 'TeamImage',
      required: undefined,
      type: 'string',
      default: 'https://react-email-demo-bdj5iju9r-resend.vercel',
    },
    Text: {
      type: 'array',
      title: 'Text',
      minItems: 2,
      items: {
        title: 'InvitedByUsername',
        type: 'string',
      },
    },
    ShowFootage: {
      type: 'boolean',
      title: 'ShowFootage',
      default: true,
    },
  },
};

export const MatchDesigns = Template.bind({});
MatchDesigns.args = {
  schema: MATCH_DESIGNS_SCHEMA,
};
