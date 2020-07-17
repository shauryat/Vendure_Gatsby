import { gql } from '@apollo/client';

export const GET_AVAILABLE_COUNTRIES = gql`
  query GetAvailableCountries {
    availableCountries {
      id
      code
      name
    }
  }
`;
