import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ACTIVE_CUSTOMER_INFO, LOGOUT_CUSTOMER } from './Customer.vendure';
import { Link } from "gatsby"
import {Typography, Button} from '@material-ui/core';


const CustomerDisplayInfo = () => {
    const [LogoutUser] = useMutation(LOGOUT_CUSTOMER);
    const { data, loading, error } = useQuery(ACTIVE_CUSTOMER_INFO, {pollInterval: 500})
    if (loading) 
    return <div>Loading </div>

    if (error) 
    return <div>error you noob</div>
    
    return(
        <div>
     { data.activeCustomer ?  (
         <div> 
    <Typography>{data.activeCustomer.emailAddress}</Typography> <Button color='primary' variant="contained" onClick={ () => LogoutUser() }> Logout</Button>
    </div>   ) :  <Link className="button is-primary" to="/LoginPage">Login</Link>
             
     }
        </div>
    )
}

export default CustomerDisplayInfo