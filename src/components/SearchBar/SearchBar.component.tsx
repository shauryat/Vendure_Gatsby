import React from 'react';
import { Formik,Field  } from 'formik';
import { navigate } from 'gatsby';
import { TextField } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 5,
      width: 'auto',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }),
);



const SearchBarComponent = () => {
  
  const classes = useStyles();
    return (
        <div>
            <Formik 
            initialValues={{ term:''}}
             onSubmit={({term}) => {navigate( "/SearchPage", { state:{ term } })}} >
             {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
            /* and other goodies */
        }) => (  <form onSubmit={handleSubmit}>

<div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
    <Field
      type="text"
      name="term"
      component={InputBase}
      placeholder="Search…"
      classes={{
        root: classes.inputRoot,
        input: classes.inputInput,
      }}
    />
  </div>

{/* <button className="button is-primary" type="submit">
              Search
            </button> */}
           
</form>
        )}
        </Formik>
        </div>
    );
};

export default SearchBarComponent;