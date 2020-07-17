import React from 'react';
import { useQuery } from '@apollo/client';
import { ACTIVE_CUSTOMER_INFO } from './Customer.vendure';


const CustomerInfo = () => {

    const { data, loading , error } = useQuery(ACTIVE_CUSTOMER_INFO)
    if (loading) {
        return ( <div>loading</div>)
    }
    if (error) {
    return ( <div>{error.message}</div>)
    }
    const user = data.activeCustomer
    return (
        <div>
              <p className='subtitle is-2'> {user.emailAddress} </p>
              <p className='subtitle is-4'> hello {user.firstName} {user.lastName}</p>
              <button className='button is-primary'>Order</button>
              
        </div>
    )
}

export default CustomerInfo