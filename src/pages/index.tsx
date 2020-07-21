import { graphql, Link } from 'gatsby';
import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

import Layout from '../components/layout';
import SEO from '../components/seo';
import {CollectionCard} from '../components/Collections/CollectionCard';

import styles from './home.module.scss';
import SearchBarComponent from '../components/SearchBar/SearchBar.component';
import LandingComponent from '../components/Landing/Landing.component';
import { Typography } from '@material-ui/core';
import GalaxyCollection from '../components/Collections/GalaxyCollection';
import LandingProduct from '../components/Landing/LandingProduct';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 300,
      width: '100%',
    },

    marker:{
      width:40,
      height:6,
      marginTop:5,
      position:'absolute',
      backgroundColor:'#1778F2',
      marginLeft:5
      
    }

   }))

const IndexPage = ({ data }) => {
const classes = useStyles()
  return (
  <Layout>
    <SEO title='Home' keywords={[`gatsby`, `application`, `react`]} />
    <LandingComponent/>
    
    <section className='md:ml-32 mt-4'>
       {/* <Typography variant="h3" > COLLECTIONS</Typography>
    <span className={classes.marker}/> */}
    <br/>
      <div className={classes.root}>
      { data.vendure.collections.items.filter((collection:any) => collection.parent && collection.parent.name === '__root_collection__')
      .map(item => <GalaxyCollection collection={item} key={item.id} />) }
      </div>
      <br/>
      <div className='-ml-32'>
      <LandingProduct/>
      </div>
    </section>
  </Layout>
  )};

export const query = graphql`
  {
    vendure {
      
  collections {
    items {
      id
      name
      slug
      parent {
        id
        name
      }
      featuredAsset {
        id
        width
        height
        name
        preview
      }
    }
  }
}

  }
  `;

export default IndexPage;
