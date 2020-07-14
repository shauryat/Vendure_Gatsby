import { gql } from "apollo-boost"

export const LOGIN_MUTATION = gql `
mutation Login($username: String!, $password: String!, $rememberMe: Boolean) {
    login(username: $username , password: $password, rememberMe: $rememberMe){
        user {
            id
            identifier
        }
    }
}

`