const React = require('react');
const { render, screen } = require('@testing-library/react');
const App = require('../../src/App').default;

// Mock the imported components
jest.mock('../../src/Standard-Form/StandardForm', () => () => <div data-testid="standard-form">StandardForm</div>);
jest.mock('../../src/Formik-Form/FormikForm', () => () => <div data-testid="formik-form">FormikForm</div>);
jest.mock('../../src/React-Hook-Form/React-Hook-Form', () => () => <div data-testid="react-hook-form">ReactHookForm</div>);

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('React Forms With Validation')).toBeInTheDocument();
  });

  it('renders the StandardForm component', () => {
    render(<App />);
    expect(screen.getByTestId('standard-form')).toBeInTheDocument();
  });

  it('renders the FormikForm component', () => {
    render(<App />);
    expect(screen.getByTestId('formik-form')).toBeInTheDocument();
  });

  it('renders the ReactHookForm component', () => {
    render(<App />);
    expect(screen.getByTestId('react-hook-form')).toBeInTheDocument();
  });

  it('displays the correct heading and subheading', () => {
    render(<App />);
    expect(screen.getByText('React Forms With Validation')).toBeInTheDocument();
    expect(screen.getByText('Build Forms with React, Formik, Yup and React Hook Form')).toBeInTheDocument();
  });

  it('renders the correct number of columns', () => {
    const { container } = render(<App />);
    const columns = container.getElementsByClassName('col-md-6');
    expect(columns.length).toBe(4);
  });
});