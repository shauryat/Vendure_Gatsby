import { gql } from '@apollo/client';

export const TOP_SELLERS = gql`
query TopSeller {
    search(input: {
            take: 8,
            groupByProduct: true,
            sort: {
                price: ASC
            }
        }) {
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