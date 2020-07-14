import Layout from '../components/layout'
import React from 'react'
import { graphql } from 'gatsby';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { CollectionCard } from '../components/Collections/CollectionCard';

export default function CollectionDetail({ data }) {
  const search = data.vendure.search;
  const childrenCollection = data.vendure.collection
    return (
      <Layout>      
     { childrenCollection.children.map(child => <CollectionCard  collection={child} key={child.id}/>) }
     { search.items.map(item => <ProductCard product={item} key={item.id} />) }
  
        </Layout>
    )
}

export const PRODUCT_QUERY = graphql`
  query($id: ID!) { 

    vendure {
    
      search(input: { collectionId:$id, groupByProduct: true }) {
        items {
          productId
          productName
          description
          slug
          currencyCode
          priceWithTax {
            ... on Vendure_PriceRange {
              min
              max
            }
            ... on Vendure_SinglePrice {
              value
            }
          }
          productPreview
        }
      }

   collection(id:$id) {
      id
      children {
          name
          id
          slug
        }
       }
    }

 


  }
`;

