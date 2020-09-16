import { gql } from "@apollo/client"

const LOGIN = gql`
   query($email: String!, $password: String!){
      login (email: $email, password:$password){
      token
      user {
         name
         username
         id
         email
      }
      }
   }
`

export { LOGIN }