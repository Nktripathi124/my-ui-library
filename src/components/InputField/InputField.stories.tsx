import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './index';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
    },
    inputSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

const InteractiveStory = (args: any) => {
  const [value, setValue] = useState(args.value || '');

  useEffect(() => {
    setValue(args.value || '');
  }, [args.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return <InputField {...args} value={value} onChange={handleChange} />;
};


export const Default: Story = {
  args: {
    id: 'default-input',
    placeholder: 'This is the default input',
  },
};

export const WithLabelAndHelperText: Story = {
  args: {
    id: 'with-label',
    label: 'Username',
    placeholder: 'Enter your username',
    helperText: 'Your username must be unique.',
  },
};

export const ErrorState: Story = {
  args: {
    id: 'error-input',
    label: 'Email Address',
    placeholder: 'user@example.com',
    isInvalid: true,
    errorMessage: 'Please enter a valid email address.',
  },
};

export const Disabled: Story = {
  args: {
    id: 'disabled-input',
    placeholder: 'This input is disabled',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    id: 'loading-input',
    placeholder: 'Loading...',
    isLoading: true,
  },
};

export const Filled: Story = {
  args: {
    id: 'filled-input',
    variant: 'filled',
    placeholder: 'Filled variant',
  },
};

export const Ghost: Story = {
  args: {
    id: 'ghost-input',
    variant: 'ghost',
    placeholder: 'Ghost variant',
  },
};

export const Small: Story = {
  args: {
    id: 'small-input',
    inputSize: 'sm',
    placeholder: 'Small size',
  },
};

export const Large: Story = {
  args: {
    id: 'large-input',
    inputSize: 'lg',
    placeholder: 'Large size',
  },
};

export const PasswordWithToggle: Story = {
  args: {
    id: 'password-input',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  },
  render: InteractiveStory,
};

export const WithClearButton: Story = {
  args: {
    id: 'clear-input',
    label: 'Search',
    hasClearButton: true,
    value: 'Some text that can be cleared',
  },
  render: InteractiveStory,
};