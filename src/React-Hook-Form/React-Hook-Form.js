import React from "react";
import { useForm, ErrorMessage } from "react-hook-form";

function ReactHookForm() {
  const {
    register,
    errors,
    handleSubmit,
    getValues,
    formState,
    reset,
  } = useForm({
    validateCriteriaMode: "all",
    mode: "onChange",
  });

  const onSubmit = (data, e) => {
    e.target.reset();
    console.log(data);
  };

  return (
    <div>
      <h5>React Hook Form</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*Username*/}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            name="userName"
            type="text"
            ref={register({
              required: "Username is required",
              maxLength: {
                value: 15,
                message: "Username should be between 6 and 15 characters",
              },
              minLength: {
                value: 6,
                message: "Username should be between 6 and 15 characters",
              },
            })}
          />
          <ErrorMessage errors={errors} name="userName">
            {({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p className="help-block text-danger" key={type}>
                  {message}
                </p>
              ))
            }
          </ErrorMessage>
        </div>

        {/*Email*/}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            name="email"
            type="email"
            ref={register({
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Enter a valid email address",
              },
            })}
          />
          <ErrorMessage errors={errors} name="email">
            {({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p className="help-block text-danger" key={type}>
                  {message}
                </p>
              ))
            }
          </ErrorMessage>
        </div>

        {/*Password*/}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            name="password"
            type="password"
            ref={register({
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password should be at least 8 characters",
              },
            })}
          />
          <ErrorMessage errors={errors} name="password">
            {({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p className="help-block text-danger" key={type}>
                  {message}
                </p>
              ))
            }
          </ErrorMessage>
        </div>

        {/*Confirm Password*/}
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="form-control"
            name="confirmPassword"
            type="password"
            ref={register({
              required: "Please confirm your password",
              validate: (value) => {
                if (value === getValues()["password"]) {
                  return true;
                } else {
                  return "The passwords do not match";
                }
              },
            })}
          />
          <ErrorMessage errors={errors} name="confirmPassword">
            {({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p className="help-block text-danger" key={type}>
                  {message}
                </p>
              ))
            }
          </ErrorMessage>
        </div>

        <div className="btn-group">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={!formState.isValid}
          >
            Submit
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => reset()}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReactHookForm;
