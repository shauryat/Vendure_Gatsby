import { gql } from 'apollo-boost';

export const ACTIVE_CUSTOMER_INFO = gql `
query CurrentCustomer {
  activeCustomer{
    id
    emailAddress
    firstName
    lastName
  }
}
`

export const LOGOUT_CUSTOMER = gql `
mutation {
  logout
}
`