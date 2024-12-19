const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
const { useForm } = require('react-hook-form');
const ReactHookForm = require('../../../src/React-Hook-Form/React-Hook-Form').default;

// Mock functions
const mockRegister = jest.fn();
const mockHandleSubmit = jest.fn();
const mockGetValues = jest.fn();
const mockReset = jest.fn();

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(() => ({
    register: mockRegister,
    errors: {},
    handleSubmit: mockHandleSubmit,
    getValues: mockGetValues,
    formState: { isValid: true },
    reset: mockReset,
  })),
  ErrorMessage: ({ children }) => children({ messages: {} }),
}));

describe('ReactHookForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with all fields', () => {
    render(<ReactHookForm />);
    expect(screen.getByRole('textbox', { name: /username/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  it('calls handleSubmit when form is submitted', () => {
    const mockOnSubmit = jest.fn();
    mockHandleSubmit.mockImplementation((callback) => {
      return (e) => {
        e.preventDefault();
        callback({}, e);
      };
    });

    render(<ReactHookForm />);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('calls reset when Reset button is clicked', () => {
    render(<ReactHookForm />);
    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);
    expect(mockReset).toHaveBeenCalled();
  });

  it('registers all form fields with validation rules', () => {
    render(<ReactHookForm />);
    expect(mockRegister).toHaveBeenCalledWith('userName', expect.objectContaining({
      required: 'Username is required',
      maxLength: expect.any(Object),
      minLength: expect.any(Object),
    }));
    expect(mockRegister).toHaveBeenCalledWith('email', expect.objectContaining({
      required: 'Email is required',
      pattern: expect.any(Object),
    }));
    expect(mockRegister).toHaveBeenCalledWith('password', expect.objectContaining({
      required: 'Password is required',
      minLength: expect.any(Object),
    }));
    expect(mockRegister).toHaveBeenCalledWith('confirmPassword', expect.objectContaining({
      required: 'Please confirm your password',
      validate: expect.any(Function),
    }));
  });

  it('validates confirm password field', () => {
    render(<ReactHookForm />);
    const validateFunction = mockRegister.mock.calls.find(
      call => call[0] === 'confirmPassword'
    )[1].validate;

    mockGetValues.mockReturnValue({ password: 'password123' });
    expect(validateFunction('password123')).toBe(true);
    expect(validateFunction('wrongpassword')).toBe('The passwords do not match');
  });
});