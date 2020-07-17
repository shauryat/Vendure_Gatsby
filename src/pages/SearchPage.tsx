import React from 'react';
import SearchBarComponent from '../components/SearchBar/SearchBar.component';
import { ProductCard } from '../components/ProductCard/ProductCard';

const SearchPage = ({location}) => {
    return (
        <div>
            {location.state.SearchResults.map(item =><ProductCard product={item} key={item.productId}/> )}
        </div>
    );
};

export default SearchPage;