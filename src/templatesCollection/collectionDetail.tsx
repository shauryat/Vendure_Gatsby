import Layout from '../components/layout'
import React from 'react'
import { graphql } from 'gatsby';
import { ProductCard } from '../components/ProductCard/ProductCard';
import GalaxyCollection from '../components/Collections/GalaxyCollection'
import GalaxyCardDemo from '../components/ProductCard/GalaxyCard'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import styles from '../components/Landing/Product.module.scss';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 400,
      width: '100%',
      marginLeft:20,
    },

    marker:{
      width:40,
      height:3,
      marginTop:5,
      position:'absolute',
      backgroundColor:'#1778F2',
      marginLeft:20,
      
    },

    text: {
      marginLeft:20
    }

   }))


export default function CollectionDetail({ data }) {
  const classes = useStyles()
  const search = data.vendure.search;
  const childrenCollection = data.vendure.collection
    return (
      <Layout>  
        <br/><br/><br/>
<Typography variant="h4" color='secondary' className={classes.text}>SUB COLLECTIONS</Typography>
<span className={classes.marker}/>
<br/>
<div className={classes.root}>
      <br/>
     { childrenCollection.children.map(child => <GalaxyCollection  collection={child} key={child.id}/>) }
     </div>
     <br/>
     <Typography variant="h4" color='secondary' className={classes.text}>ALL PRODUCTS</Typography>
      <span className={classes.marker}/>
      <br/>
     <div className={styles.detailList}>
     { search.items.map(item => <GalaxyCardDemo product={item} key={item.id} />) }
     </div>
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
          productAsset {
        preview
      }
        }
      }

   collection(id:$id) {
      id
      children {
          name
          id
          slug
          featuredAsset {
        preview
      }
        }
       }
    }

 


  }
`;

