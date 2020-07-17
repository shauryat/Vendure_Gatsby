import { gql } from '@apollo/client';

export const ALL_ORDER_LIST = gql `
{
  activeCustomer{
      id
    orders
    {
      items{
        id
    code
    state
    total
    active
    currencyCode
    lines {
      id
      productVariant {
        id
        name
        currencyCode
      }
      unitPriceWithTax
      quantity
      totalPrice
      featuredAsset {
        id
        preview
      }
    }      
      }
    }
  }
}
`