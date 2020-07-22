import React from 'react'
import { ProductCard } from '../components/ProductCard/ProductCard'
import { useQuery } from '@apollo/client'
import { SEARCH_BAR_QUERY } from '../components/SearchBar/SearchBar.vendure'
import styles from './home.module.scss';
import Layout from '../components/layout';
import GalaxyCardDemo from '../components/ProductCard/GalaxyCard';

const SearchPage = ({location}) => {
    const { data, error , loading } = useQuery(SEARCH_BAR_QUERY, {
         variables: { input : { term : location.state.term , groupByProduct:true }}
    })

    if (loading ) return <p> loading... </p>
    if (error ) return <p> {error.message} </p>
    return (
        <Layout>
        <div className={styles.productList}>
            
            { data ? data.search.items.map(item => <GalaxyCardDemo product={item} key={item.productId}/>): <p>no results </p> }
        </div>
        <p> search results for{location.state.term}</p>
        </Layout>
    );
};

export default SearchPage;