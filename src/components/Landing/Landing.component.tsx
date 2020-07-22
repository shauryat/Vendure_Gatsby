import React from 'react';
import { Grid, Container , Typography, Chip, Avatar} from '@material-ui/core';
import GirlShopping from '../../assets/onlinestoree.inline.svg'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme:Theme) =>
createStyles({
    typhography:{
        fontSize:'3.2rem',
        fontWeight:490
    },
    chip : {
        marginRight:5,
        marginBottom:5,
        color:theme.palette.primary.main
    }
})

)

const LandingComponent = () => {
    const classes = useStyles()
    return (
        <div className='bg-white mt-4 rounded-lg'>
        <div style={{height:'290' , width:'100%'}}>
             <Grid container spacing={3}>
             <Grid item xs={12} md={7}>
                     <div className='mx-4 mt-16 md:mt-24 md:ml-32 md:mr-24 mb-4'>
                     <Typography  className={classes.typhography}  variant="h2" display='block' color="secondary">Gatsby Vendure </Typography>
                     <Typography  variant="h5" display='block' color="secondary">E-commerce Starter 🎉 </Typography>
                     <br/>
                     <Typography  variant="subtitle1" display='block' color="secondary">This Starter Pack is made using <b>Vendure </b> ( A headless e-commerce GraphQL framework) , <b>Gatsby V2 </b>(A React Framework), <b>Apollo-Client 3.0 </b> for handling GraphQL queries & <b>Material-UI & Tailwind CSS</b> for styling </Typography>
                     </div>
                     <div className='ml-2'>
                     <Chip className={classes.chip}  label="Vendure.io" color="secondary"/>
                     <Chip className={classes.chip}  label="Gatsby" color="secondary" />
                     <Chip className={classes.chip}  label="Apollo-Client" color="secondary" />
                     <Chip className={classes.chip}  label="Material-UI" color="secondary" />
                     <Chip className={classes.chip}  label="Tailwind CSS"  color="secondary"/>
                     </div>
                 </Grid>
                 <Grid item xs={12} md={5}>
                     <div className='md:mt-12'>                        
                           <GirlShopping className='ml-32 h-64 md:ml-20 md:h-xl'/>
                    </div>
                 </Grid>
             </Grid>
        </div>
        </div>
    );
};

export default LandingComponent;