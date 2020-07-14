import { Formik } from 'formik';
import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import * as Yup from 'yup';
import { navigate, Link } from "gatsby"

import { LOGIN_MUTATION } from './Login.vendure';

const LoginFunctionality = () => {

    const [LoginMutation, { error, data}] = useMutation(LOGIN_MUTATION);
    
    return (
<div>
<Formik
initialValues={
  {
   username: '',
   password: '',
   rememberMe: true,
 }
}
    onSubmit={({ username, password, rememberMe }, {resetForm}) => {
          LoginMutation({
            variables: {
              username, password, rememberMe
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
                  name="username"
                  value={values.username}
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
              Login
            </button>
            <div>
              <p>Not a user:</p>
              <Link to="RegisterPage" className="button is-primary">Register</Link>
            </div>
            
          </form>
        )}
      </Formik>
        { error ? <p> Oh no! {error.message}</p> : null}
        { data ? navigate("/"): null}
</div>
    );
}

export default LoginFunctionality