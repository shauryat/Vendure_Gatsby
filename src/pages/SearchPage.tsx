import React from 'react'
import { ProductCard } from '../components/ProductCard/ProductCard'
import { useQuery } from '@apollo/client'
import { SEARCH_BAR_QUERY } from '../components/SearchBar/SearchBar.vendure'

const SearchPage = ({location}) => {
    const { data, error , loading } = useQuery(SEARCH_BAR_QUERY, {
         variables: { input : { term : location.state.term , groupByProduct:true }}
    })

    if (loading ) return <p> loading... </p>
    if (error ) return <p> error... </p>
    return (
        <div>
            { data ? data.search.items.map(item => <ProductCard product={item} key={item.productId}/>): <p>no results </p> }
        </div>
    );
};

export default SearchPage;