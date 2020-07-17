import React from 'react';
import { useMutation } from '@apollo/client';
import {REGISTER_CUSTOMER} from './Register.vendure';
import { Formik } from 'formik';
import { Link } from "gatsby"


const RegisterComponent = () => {
 const [RegisterMutation, {error,data}] = useMutation(REGISTER_CUSTOMER)

    return (
<div>
<Formik
initialValues={
    {
        emailAddress: '', 
        firstName: '', 
        lastName: '', 
        password: ''
    }
}

onSubmit={({ emailAddress, password, firstName, lastName }, {resetForm}) => {
    RegisterMutation({
      variables: {
        emailAddress, password, firstName, lastName
      },
    })
    resetForm()
  }}
>

{({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
<div className="field">
              <label className="label">E-mail</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="emailAddress"
                  value={values.emailAddress}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">FirstName</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="firstName"
                  value={values.firstName}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">LastName</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="lastName"
                  value={values.lastName}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="password"
                  value={values.password}
                />
              </div>
            </div>
            <button className="button is-primary" type="submit">
              Register
            </button>
</form>
)}
</Formik>
{ error ? <p> Oh no! {error.message}</p> : null}
{ data ? <p> hello you successfully registered, Login now <Link className="button is-primary" to="/LoginPage">Login</Link></p>: <p>oh sorry</p>}
</div>
    )
}

export default RegisterComponent