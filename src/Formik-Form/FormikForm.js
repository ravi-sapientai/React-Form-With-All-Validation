import React, { Component } from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';

class FormikForm extends Component {

    state = {
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        isValid: false,
    }

    handleChange = (values) => {
        this.setState({
            userName: values.userName,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword
        })
        console.log(this.state);
    }

    validationSchema = Yup.object().shape({
        userName: Yup.string()
            .min(6, "Username should be between 6 and 15 characters")
            .max(15, "Username should be between 6 and 15 characters")
            .required("Username is required"),
        
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        
        password: Yup.string()
            .min(8, "Should be at least 8 charcters")
            .required("Password is required"),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], "Passwords don't match")


    })

    render() {
        return (
            <div>
                <h5>Formik Form with Yup</h5>
                <Formik 
                    initialValues={{userName: '', email: '', password: '', confirmPassword: '', isSubmitting: true }}
                    validationSchema={this.validationSchema}
                    onSubmit={(values, {setSubmitting, resetForm}) => {
                        setTimeout(() => {
                            console.log(values);
                            this.setState({
                                userName: values.userName,
                                email: values.email,
                                password: values.password,
                                confirmPassword: values.confirmPassword
                            })
                            setSubmitting(true)
                            resetForm();
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                {({
                    values,
                    errors,
                    touched,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleReset,
                    handleSubmit
                }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        {/* Username */}
                        <div className="form-group">
                        <label htmlFor="userName">Username</label>
                        <input
                            className="form-control"
                            type="text"
                            name="userName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.userName}
                        />
                        <span className="help-block text-danger">{errors.userName && touched.userName && errors.userName}</span>
                        </div>

                        {/* Email */}
                        <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        <span className="help-block text-danger">{errors.email && touched.email && errors.email}</span>
                        </div>

                         {/* Password */}
                         <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        <span className="help-block text-danger">{errors.password && touched.password && errors.password}</span>
                        </div>

                         {/* Confirm Password */}
                         <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            className="form-control"
                            type="password"
                            name="confirmPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmPassword}
                        />
                        <span className="help-block text-danger">{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</span>
                        </div>
                        <div className="btn-group">
                            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>Submit</button>
                            <button
                                disabled={!dirty}
                                onClick={handleReset}
                                type="button"
                                className="btn btn-danger"
                            >Reset</button>
                        </div>
                    </form>       
                )}        
                </Formik>
            </div>
        )
    }
}

export default FormikForm;
