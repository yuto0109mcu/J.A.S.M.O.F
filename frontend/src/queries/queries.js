import { gql } from "@apollo/client"

const LOGIN = gql`
   query($email: String!, $password: String!){
      login (email: $email, password:$password){
         token
         user {
            id
         }
      }
   }
`

const USER = gql`
   query($id: ID!, $token: String!){
      user (token: $token, id: $id) {
         name
         username
         email
      }
   }
`

export { LOGIN, USER }