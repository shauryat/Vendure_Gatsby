/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import React from 'react';

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  credentials: 'include',
  uri: 'http://localhost:3000/shop-api',
  resolvers: {
    Mutation: {
      setActiveOrderId: (_, { id }, { cache: apolloCache }) => {
        apolloCache.writeData({
          data: {
            activeOrderId: id,
          },
        });
      },
    },
  },
});

cache.writeData({
  data: {
    activeOrderId: null,
  },
});

export const wrapRootElement = ({ element }) => {
  return <ApolloProvider client={client}>{element}</ApolloProvider>;
};
