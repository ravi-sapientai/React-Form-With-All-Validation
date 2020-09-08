import React from "react";
import "./App.css";

// Component imports
import StandardForm from "./Standard-Form/StandardForm";
import FormikForm from "./Formik-Form/FormikForm";
import ReactHookForm from "./React-Hook-Form/React-Hook-Form";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6 border py-3">
            <StandardForm />
          </div>
          <div className="col-md-6 my-auto">
            <h2>React Forms With Validation</h2>
            <h5>Build Forms with React, Formik, Yup and React Hook Form</h5>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6 border py-3">
            <FormikForm />
          </div>
          <div className="col-md-6 border py-3">
            <ReactHookForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
