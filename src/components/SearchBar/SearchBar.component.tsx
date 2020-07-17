import React from 'react';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_BAR_QUERY } from './SearchBar.vendure';
import { Formik } from 'formik';
import { ProductCard } from '../ProductCard/ProductCard';

const SearchBarComponent = () => {
    const [searchPull, { loading, data}] = useLazyQuery(SEARCH_BAR_QUERY)

    if (loading ) return <p> loading... </p>
    return (
        <div>
            <Formik 
            initialValues={
                { term:'', groupByProduct:true}
            }

            onSubmit={({term,groupByProduct}) => 
        {
            searchPull({
                variables: {
                    input:{ term, groupByProduct}
                }
            })
        }}>
             {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
            /* and other goodies */
        }) => ( 
<form onSubmit={handleSubmit}>

<div className="field">
  <label className="label">Search</label>
  <div className="control">
    <input
      className="input"
      type="text"
      onChange={handleChange}
      onBlur={handleBlur}
      name="term"
      value={values.term}
    />
  </div>
</div>

<button className="button is-primary" type="submit">
              Search
            </button>
           
</form>
        )}
        </Formik>
        { data ? data.search.items.map(item => <ProductCard product={item} key={item.productId}/>): <p>no results </p> }
        </div>
    );
};

export default SearchBarComponent;