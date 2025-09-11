import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { InputField } from './index';

test('InputField renders without crashing', () => {
  const { getByRole } = render(<InputField />);
  const inputElement = getByRole('textbox');
  expect(inputElement).toBeDefined();
});