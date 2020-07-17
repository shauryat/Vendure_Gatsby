import { gql } from '@apollo/client';

export const DISPLAY_ORDER = gql`
query LastOrder {
  activeCustomer{
    emailAddress
    id
    orders(options:{take:1,sort:{id:DESC}})
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