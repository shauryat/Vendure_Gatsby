import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ACTIVE_CUSTOMER_INFO, LOGOUT_CUSTOMER } from './Customer.vendure';
import { Link } from "gatsby"


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
    <p>{data.activeCustomer.emailAddress}</p>  <button onClick={ () => LogoutUser() }> Logout</button>
    </div>   ) :  <Link className="button is-primary" to="/LoginPage">Login</Link>
             
     }
        </div>
    )
}

export default CustomerDisplayInfo