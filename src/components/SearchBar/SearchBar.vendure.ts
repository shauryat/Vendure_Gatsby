import { gql } from '@apollo/client';

export const SEARCH_BAR_QUERY = gql `
 query SearchProducts ($input:SearchInput! ) {
  search (input: $input)
   {
    items {
      productId
      productName
      description
      slug
      currencyCode
      priceWithTax {
        ... on PriceRange {
          min
          max
        }
        ... on SinglePrice {
          value
        }
      }
      productAsset {
        preview
      }
    }
  }
}
`