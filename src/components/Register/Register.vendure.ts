import { gql } from '@apollo/client';

 export const REGISTER_CUSTOMER = gql `

mutation Register ($emailAddress: String!, $firstName: String, $lastName: String, $password: String)
{
    registerCustomerAccount(
      input: { emailAddress: $emailAddress, firstName: $firstName,
       lastName: $lastName, password: $password }
    )
  }
`

