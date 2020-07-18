import React from 'react';
import { Formik,Field  } from 'formik';
import { navigate } from 'gatsby';
import { TextField } from '@material-ui/core';

const SearchBarComponent = () => {
    
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

    <div className="field">
  <div className="control">
    <Field
      type="text"
      name="term"
      label="Search"
      component={TextField}
    />
  </div>
</div>

<button className="button is-primary" type="submit">
              Search
            </button>
           
</form>
        )}
        </Formik>
        </div>
    );
};

export default SearchBarComponent;