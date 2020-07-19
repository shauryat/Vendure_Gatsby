import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ACTIVE_CUSTOMER_INFO, LOGOUT_CUSTOMER } from './Customer.vendure';
import { Link } from "gatsby"
import {Typography, Button} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme:Theme) =>
createStyles({
    avatarBg:{
        backgroundColor:theme.palette.secondary.main,
        color:theme.palette.primary.main,
        marginLeft:4
    }
})

)



function FirstLetter(str) {
    return str.charAt(1).toUpperCase();
  }

const CustomerDisplayInfo = () => {
    const classes = useStyles()
    const { data, loading, error } = useQuery(ACTIVE_CUSTOMER_INFO, {pollInterval: 500})
    if (loading) 
    return <div>Loading </div>

    if (error) 
    return <div>error you noob</div>
    
    return(
        <div>
     { data.activeCustomer ?  (
         <div> 
    <Avatar className={classes.avatarBg}>{FirstLetter(JSON.stringify(data.activeCustomer.firstName))}</Avatar>
    </div>   ) :  <Link to="/LoginPage"><IconButton color='secondary'><AccountCircleIcon/></IconButton></Link>
             
     }
        </div>
    )
}

export default CustomerDisplayInfo