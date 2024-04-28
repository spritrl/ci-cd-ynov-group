import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextField from './TextField';

describe('TextField Component', () => {
  test('renders TextField component with label', () => {
    render(<TextField title='Test Input' name='testInput' />);
    expect(screen.getByLabelText(/Test Input/i)).toBeInTheDocument();
  });

  test('calls onChange prop when input value changes', () => {
    const handleChange = jest.fn();
    render(
      <TextField title='Test Input' name='testInput' onChange={handleChange} />
    );
    const input = screen.getByLabelText(/Test Input/i);
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('displays error message when error prop is provided', () => {
    const errorMessage = 'Error message';
    render(
      <TextField title='Test Input' name='testInput' error={errorMessage} />
    );
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('renders the correct input type', () => {
    render(<TextField title='Email' name='email' type='email' />);
    const input = screen.getByLabelText(/Email/i);
    expect(input).toHaveAttribute('type', 'email');
  });

  test('has the correct placeholder', () => {
    render(<TextField title='Your Name' name='name' />);
    const input = screen.getByPlaceholderText(/Your Name/i);
    expect(input).toBeInTheDocument();
  });

  test('handles default values', () => {
    const handleChange = jest.fn();
    render(
      <TextField
        title='Default Value'
        name='defaultValue'
        inputValue='Default'
        onChange={handleChange}
      />
    );
    const input = screen.getByLabelText(/Default Value/i);
    expect(input).toHaveValue('Default');
  });

  test('is accessible with correct id and htmlFor attributes', () => {
    render(<TextField title='Accessible Field' name='accessibleField' />);
    const input = screen.getByLabelText(/Accessible Field/i);
    const label = screen.getByText(/Accessible Field/i);
    expect(input.id).toBe('accessibleField');
    expect(label).toHaveAttribute('for', 'accessibleField');
  });
});
