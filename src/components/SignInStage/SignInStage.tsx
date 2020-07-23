import { Formik, Field } from 'formik';
import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import {
  GET_ACTIVE_ORDER_FOR_CHECKOUT,
  SET_ORDER_CUSTOMER,
} from '../../pages/checkout.vendure';
import { Link } from 'gatsby';
import { Typography } from '@material-ui/core';

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
    boxShadow:theme.shadows[0],
    marginBottom:5,
    marginTop:3,
    marginLeft:10,
    marginRight:10
  }
}));

export function SignInStage({ nextStage }) {
  const classes = useStyles();
  const { data, loading, error } = useQuery(GET_ACTIVE_ORDER_FOR_CHECKOUT, {
    fetchPolicy: 'network-only',
  });
  const [setOrderCustomer] = useMutation(SET_ORDER_CUSTOMER);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error || !data.activeOrder) {
    return <div>Error! {error ? error.message : 'No active order'}</div>;
  }
  return (
    <>
      <Formik
        onSubmit={({ __typename, id, ...formData }) => {
          setOrderCustomer({
            variables: {
              input: formData,
            },
          }).then(() => nextStage());
        }}
        initialValues={
          data.activeOrder.customer || {
            firstName: '',
            lastName: '',
            emailAddress: '',
          }
        }
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
             <LockOutlinedIcon color='secondary'/> <Typography variant="h4" color="secondary">Sign In</Typography>
                <Typography variant="subtitle1" color="initial" gutterBottom> Fill in the following details & click continue as guest if you want to checkout without making an account</Typography>
                <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                <Field
                  type="text"
                  name="firstName"
                  component={TextField}
                  variant="outlined"
                  color="secondary"
                  label='First Name'
                  fullWidth
                  
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <Field
                  type="text"
                  name="lastName"
                  component={TextField}
                  variant="outlined"
                  color="secondary"
                  label='Last Name'
                  fullWidth
                  
                />
                </Grid>
              
                <Grid item xs={12}>
                <Field
                  type="email"
                  name="emailAddress"
                  component={TextField}
                  variant="outlined"
                  color="secondary"
                  label='E-Mail'
                  fullWidth
                />
                </Grid>
             
             <Button variant="contained" fullWidth type="submit" color="secondary" className={classes.button}>
              Checkout as guest
            </Button>
          
            <Grid item xs={6} sm={6}>
          <Link to="/LoginPage">
            <Button variant="contained" fullWidth color="secondary">
              Already a user  
            </Button>
            </Link>
            </Grid>

            <Grid item xs={6} sm={6}>
          <Link to="/RegisterPage">
            <Button variant="contained" fullWidth color="secondary" >
              New account  
            </Button>
            </Link>
            </Grid>

            </Grid>
            </Paper>
            </main>
          </form>
        )}
      </Formik>
    </>
  );
}
