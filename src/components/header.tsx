import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { ShoppingCart } from './ShoppingCart/ShoppingCart';
import SearchBarComponent from './SearchBar/SearchBar.component';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CustomerDisplayInfo from './Customer/CustomerComponent';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    appbar:{
      boxShadow:'none'
    }
  }),
);

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const Header = (props) => {

  const classes = useStyles();

  return (
    <React.Fragment>
     <div className={classes.root}>
     <ElevationScroll {...props}>
      <AppBar position='fixed'>
        <Toolbar>
        <div style={{flexGrow:1}} >
          <Link to="/">
               <div className='text-facebookBlue text-xs md:text-lg leading-none font-semibold'> VENDURE </div>
               <div className='text-xs text-facebookBlue' > STORE </div>
               </Link>
            </div>
            <CustomerDisplayInfo/>
            <SearchBarComponent/>
         <ShoppingCart/>
        </Toolbar>
      </AppBar>
      </ElevationScroll>
      </div>
      </React.Fragment>
  )
};


export default Header;
