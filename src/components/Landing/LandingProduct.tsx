import React from 'react';
import { TOP_SELLERS } from './Landing.vendure';
import { useQuery } from '@apollo/client';
import GalaxyCardDemo from '../ProductCard/GalaxyCard';
import styles from './Product.module.scss'

const LandingProduct = () => {
const { data, loading , error} = useQuery(TOP_SELLERS)

    if (loading ) return <p> loading... </p>
    if (error ) return <p> error... </p>
    
    return (
        <div className={styles.productList}>
            {data.search.items.map(item => <GalaxyCardDemo product={item} key={item.productId}/>)}
        </div>
    );
};

export default LandingProduct;