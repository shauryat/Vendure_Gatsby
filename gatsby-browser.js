/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import React from 'react';
import { gql } from '@apollo/client';
import "./src/styles/site.css"

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  credentials: 'include',
  uri: 'http://localhost:3000/shop-api',
  resolvers: {
    Mutation: {
      setActiveOrderId: (_, { id }, { cache: apolloCache }) => {
        apolloCache.writeQuery({
          query: gql`
   mutation SetActiveOrderId($id: String!) {
    setActiveOrderId(id: $id) 
  }
  `,
          data: {
            activeOrderId: id,
          },
        });
      },
    },
  },
});

cache.writeQuery({
  query: gql`
  {
    activeOrderId 
  }
`,
  data: {
    activeOrderId: null,
  },
});

export const wrapRootElement = ({ element }) => {
  return <ApolloProvider client={client}>{element}</ApolloProvider>;
};
