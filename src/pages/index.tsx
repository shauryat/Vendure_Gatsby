import { graphql, Link } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import {CollectionCard} from '../components/Collections/CollectionCard';

import styles from './home.module.scss';
import SearchBarComponent from '../components/SearchBar/SearchBar.component';

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title='Home' keywords={[`gatsby`, `application`, `react`]} />
    <section>
      { data.vendure.collections.items.filter((collection:any) => collection.parent && collection.parent.name === '__root_collection__')
      .map(item => <CollectionCard collection={item} key={item.id} />) }
      <SearchBarComponent/>
    </section>
  </Layout>
);

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
    }
  }
}

  }
  `;

export default IndexPage;
