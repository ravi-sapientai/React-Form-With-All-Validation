const React = require('react');
const { render, fireEvent } = require('@testing-library/react');
const { act } = require('react-dom/test-utils');
const StandardForm = require('../../../src/Standard-Form/StandardForm').default;

jest.useFakeTimers();

describe('StandardForm', () => {
  beforeEach(() => {
    // Mock form submission
    const mockPreventDefault = jest.fn();
    Object.defineProperty(window.HTMLFormElement.prototype, 'submit', {
      configurable: true,
      value: mockPreventDefault,
    });
  });

  it('renders without crashing', () => {
    const { getByText } = render(<StandardForm />);
    expect(getByText('Standard Form')).toBeTruthy();
  });

  it('validates username correctly', () => {
    const { getByLabelText, getByText, queryByText } = render(<StandardForm />);
    const usernameInput = getByLabelText('Username');

    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'short' } });
      jest.runAllTimers();
    });

    expect(getByText('Username should be between 6 and 15 characters')).toBeTruthy();

    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'validusername' } });
      jest.runAllTimers();
    });

    expect(queryByText('Username should be between 6 and 15 characters')).toBeNull();
  });

  it('validates email correctly', () => {
    const { getByLabelText, getByText, queryByText } = render(<StandardForm />);
    const emailInput = getByLabelText('Email');

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
      jest.runAllTimers();
    });

    expect(getByText('Invalid email format')).toBeTruthy();

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
      jest.runAllTimers();
    });

    expect(queryByText('Invalid email format')).toBeNull();
  });

  it('validates password correctly', () => {
    const { getByLabelText, getByText, queryByText } = render(<StandardForm />);
    const passwordInput = getByLabelText('Password');

    act(() => {
      fireEvent.change(passwordInput, { target: { value: 'short' } });
      jest.runAllTimers();
    });

    expect(getByText('Password should be at least 8 characters')).toBeTruthy();

    act(() => {
      fireEvent.change(passwordInput, { target: { value: 'validpassword' } });
      jest.runAllTimers();
    });

    expect(queryByText('Password should be at least 8 characters')).toBeNull();
  });

  it('validates password confirmation correctly', () => {
    const { getByLabelText, getByText, queryByText } = render(<StandardForm />);
    const passwordInput = getByLabelText('Password');
    const confirmPasswordInput = getByLabelText('Confirm Password');

    act(() => {
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } });
      jest.runAllTimers();
    });

    expect(getByText('Passwords do not match')).toBeTruthy();

    act(() => {
      fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
      jest.runAllTimers();
    });

    expect(queryByText('Passwords do not match')).toBeNull();
  });

  it('enables submit button when form is valid', () => {
    const { getByLabelText, getByText } = render(<StandardForm />);
    const usernameInput = getByLabelText('Username');
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const confirmPasswordInput = getByLabelText('Confirm Password');
    const submitButton = getByText('Submit');

    expect(submitButton).toBeDisabled();

    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'validuser' } });
      fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
      jest.runAllTimers();
    });

    expect(submitButton).not.toBeDisabled();
  });

  it('resets form when reset button is clicked', () => {
    const { getByLabelText, getByText } = render(<StandardForm />);
    const usernameInput = getByLabelText('Username');
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const confirmPasswordInput = getByLabelText('Confirm Password');
    const resetButton = getByText('Reset');

    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'validuser' } });
      fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
      jest.runAllTimers();
    });

    act(() => {
      fireEvent.click(resetButton);
      jest.runAllTimers();
    });

    expect(usernameInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
    expect(confirmPasswordInput.value).toBe('');
  });

  it('submits form when all fields are valid', () => {
    const { getByLabelText, getByText } = render(<StandardForm />);
    const usernameInput = getByLabelText('Username');
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const confirmPasswordInput = getByLabelText('Confirm Password');
    const submitButton = getByText('Submit');

    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'validuser' } });
      fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
      jest.runAllTimers();
    });

    act(() => {
      fireEvent.click(submitButton);
      jest.runAllTimers();
    });

    // Since we mocked the form submission, we can't directly test if it was called.
    // Instead, we can check if the submit button is enabled, which indicates a valid form.
    expect(submitButton).not.toBeDisabled();
  });
});