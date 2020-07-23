import { Formik , Field } from 'formik';
import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { TextField } from 'formik-material-ui';
import { OrderAddress } from '../../../vendure-types';
import { Typography } from '@material-ui/core';
import {
  ADD_ADDRESS_TO_ORDER,
  GET_ACTIVE_ORDER_FOR_CHECKOUT,
  TRANSITION_TO_ARRANGING_PAYMENT,
} from '../../pages/checkout.vendure';
import { CountrySelect } from '../CountrySelect/CountrySelect';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShipping';

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

export function ShippingStage({ nextStage }) {
  const classes = useStyles();
  const { data, loading, error } = useQuery(GET_ACTIVE_ORDER_FOR_CHECKOUT, {
    fetchPolicy: 'network-only',
  });
  const [addAddressToOrder] = useMutation(ADD_ADDRESS_TO_ORDER);
  const [transitionToArrangingPayment] = useMutation(
    TRANSITION_TO_ARRANGING_PAYMENT,
  );
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error || !data.activeOrder) {
    return <div>Error! {error ? error.message : 'No active order'}</div>;
  }
  return (
    <>
      <Formik
        onSubmit={formData => {
          addAddressToOrder({
            variables: {
              input: formData,
            },
          })
            .then(() => transitionToArrangingPayment())
            .then(() => nextStage());
        }}
        initialValues={
          Object.entries(data.activeOrder.shippingAddress)
            .filter(([key]) => key !== '__typename')
            .reduce((initialValues, [key, value]) => {
              return { ...initialValues, [key]: value || '' };
            }, {}) as OrderAddress
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
                <LocalShippingOutlinedIcon color="secondary"/>
                 <Typography variant="h4" color="secondary" gutterBottom>Shipping Address</Typography>
                 <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                <Field
                  type="text"
                  name="fullName"
                  value={values.fullName}
                  component={TextField}
                  variant="outlined"
                  color="secondary"
                  label='Full Name'
                  fullWidth
                />
              </Grid>
            
              <Grid item xs={12} sm={6}>
                <Field
                  type="text"
                   name="company"
                  value={values.company}
                  component={TextField}
                  variant="outlined"
                  color="secondary"
                  label='Company'
                  fullWidth
                />
              </Grid>
             
              <Grid item xs={12}>
                <Field
                  type="text"
                   name="streetLine1"
                  value={values.streetLine1}
                  component={TextField}
                  variant="outlined"
                  color="secondary"
                  label='Address Line 1'
                  fullWidth
                />
              </Grid>
            
              <Grid item xs={12}>
                <Field
                  type="text"
                   name="streetLine2"
                  value={values.streetLine2}
                  component={TextField}
                  variant="outlined"
                  color="secondary"
                  label='Address Line 2'
                  fullWidth
                />
              </Grid>
            
              <Grid item xs={12} sm={6}>
                <Field
                  type="text"
                   name="city"
                  value={values.city}
                  component={TextField}
                  variant="outlined"
                  color="secondary"
                  label='City'
                  fullWidth
                />
              </Grid>
            
              <Grid item xs={12} sm={6}>
                <Field
                  type="text"
                   name="province"
                  value={values.province}
                  component={TextField}
                  variant="outlined"
                  color="secondary"
                  label='Province'
                  fullWidth
                />
              </Grid>
            
              <Grid item xs={12} sm={6}>
                <Field
                  type="text"
                   name="postalCode"
                  value={values.postalCode}
                  component={TextField}
                  variant="outlined"
                  color="secondary"
                  label='Postal Code'
                  fullWidth
                />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                  type="text"
                   name="phoneNumber"
                  value={values.phoneNumber}
                  component={TextField}
                  variant="outlined"
                  color="secondary"
                  label='Phone Number'
                  fullWidth
                />
                </Grid>
              
           <div className="ml-2 mb-4">   
            <div className="field">
              <label className="label">Country</label>
              <div className="control">
                <CountrySelect
                   onChange={handleChange}
                   onBlur={handleBlur}
                   name="countryCode"
                  value={values.countryCode}
                />
                </div>
            </div>    
          </div>            

            <Button variant="contained" fullWidth type="submit" color="secondary" className={classes.button}>
              Proceed to payment
            </Button>
            </Grid>
            </Paper>
            </main>
          </form>
        )}
      </Formik>
    </>
  );
}