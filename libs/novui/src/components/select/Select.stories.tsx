import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Select } from './Select';

export default {
  title: 'Components/Select',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = ({ ...args }) => <Select {...args} />;

const data = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Verdana', label: 'Verdana' },
  { value: 'Optima', label: 'Optima' },
  { value: 'Lato', label: 'Lato' },
  { value: 'sans-serif', label: 'sans-serif' },
  { value: 'blitz', label: 'Blitz.js' },
];

export const PrimaryUse = Template.bind({});
PrimaryUse.args = {
  label: 'Font Family',
  data,
  description: 'Will be used as the main font-family in the in-app widget',
  placeholder: 'Select',
};
