import { Formik, Field } from 'formik';
import React from 'react';
import { useMutation } from '@apollo/client';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { TextField } from 'formik-material-ui';


import { ADD_PAYMENT_TO_ORDER } from '../../pages/checkout.vendure';

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    borderRadius:18,
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
  
    },
  },
  button: {
    boxShadow:theme.shadows[0]
  }
}));


export function PaymentStage({ nextStage, prevStage }) {
  const classes = useStyles();
  const [addPaymentToOrder] = useMutation(ADD_PAYMENT_TO_ORDER);
  return (
    <>
      <Formik
        onSubmit={formData => {
          addPaymentToOrder({
            variables: {
              input: {
                method: 'example-payment-provider',
                metadata: {
                  foo: 'bar',
                },
              },
            },
          }).then(() => nextStage());
        }}
        initialValues={{
          cardNumber: '',
          expiryYear: '',
          expiryMonth: '',
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <main className={classes.layout}>
              <Paper className={classes.paper} variant="outlined">
                <Field
                  type="text"
                  name="cardNumber"
                  value={values.cardNumber}
                  component={TextField}
                  variant="outlined"
                  color="secondary"
                  label='Card Number'
                  fullWidth
                />
            
            <div className="columns">
              <div className="field column">
                <label className="label">Expiry month</label>
                <div className="control">
                  <div className="select">
                    <select
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="expiryMonth"
                      value={values.expiryMonth}
                    >
                      {Array.from({ length: 12 }).map((_, index) => {
                        const month = index + 1;
                        return (
                          <option value={month} key={month}>
                            {month}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="field column">
                <label className="label">Expiry year</label>
                <div className="control">
                  <div className="select">
                    <select
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="expiryYear"
                      value={values.expiryYear}
                    >
                      {Array.from({ length: 10 }).map((_, index) => {
                        const year = new Date().getFullYear() + index;
                        return (
                          <option value={year} key={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="contained" fullWidth type="submit" color="secondary" className={classes.button}>
              Confirm order
            </Button>
            </Paper>
            </main>
          </form>
        )}
      </Formik>
      {/* <button className="button is-primary" onClick={prevStage}>
        Go back
      </button> */}
    </>
  );
}
