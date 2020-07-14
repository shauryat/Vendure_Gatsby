import { gql } from 'apollo-boost';
import { graphql } from 'gatsby';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import Layout from '../components/layout';
import { GET_ACTIVE_ORDER } from "../components/ShoppingCart/ShoppingCart.vendure";
import { formatPrice } from '../utilities/utilities';

import styles from './ProductDetail.module.scss';
import { ADD_ITEM_TO_ORDER, GET_ACTIVE_ORDER_ID, SET_ACTIVE_ORDER_ID } from "./ProductDetail.vendure";

export default ({ data }) => {
  const product = data.vendure.product;
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const {
    data: { activeOrderId },
  } = useQuery(GET_ACTIVE_ORDER_ID);
  const [addToOrder] = useMutation(ADD_ITEM_TO_ORDER, {
    variables: {
      id: variantId,
      quantity,
    },
    update: (cache, mutationResult) => {
      cache.writeQuery({
        query: GET_ACTIVE_ORDER,
        data: {
          activeOrder: mutationResult.data.addItemToOrder,
        },
      });
    },
  });
  const [setActiveOrderId] = useMutation(SET_ACTIVE_ORDER_ID);
  return (
    <Layout>
      <div className="columns">
        <figure className="column">
          <img src={product.featuredAsset.preview + '?preset=medium'} />
        </figure>
        <div className="column">
          <h1 className="title is-1">{product.name}</h1>

          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          <div>
            <div className="select">
              <select
                value={variantId}
                onChange={e => setVariantId(e.currentTarget.value)}
              >
                {product.variants.map(variant => (
                  <option key={variant.id} value={variant.id}>
                    {variant.name}{' '}
                    {formatPrice(variant.currencyCode, variant.priceWithTax)}
                  </option>
                ))}
              </select>
            </div>
            <div className="select">
              <select
                value={quantity}
                onChange={e => setQuantity(+e.currentTarget.value)}
              >
                {Array.from({ length: 10 }).map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            className="button is-primary is-large"
            onClick={() => addToOrder()}
          >
            Add to cart
          </button>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($id: ID!) { 
    vendure {
      product(id: $id) { 
        id
        name
        slug
        description
        featuredAsset { 
          id
          preview
        }
        variants { 
          id
          name
          priceWithTax
          currencyCode
        }
      }
    }
  }
`;
