import { render, screen } from '@testing-library/react-native';
import Button from '../../src/components/common/layoutButtons';
import React from 'react';

test('renders a button with correct text', () => {
  render(<Button onPress={() => console.log("pressed")} children="Click me" />);
  const button = screen.getByText('Click me');
  expect(button).toBeTruthy();
});