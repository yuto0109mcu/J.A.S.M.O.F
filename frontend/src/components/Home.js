import React from 'react'
import { useQuery } from "@apollo/client"
import { USER } from '../queries/queries'
import { useAuth0 } from "@auth0/auth0-react"

const Home = () => {

   const { logout, user } = useAuth0()

   const { loading, error, data = {user: {}} } = useQuery(USER, {
      variables: {
         id: sessionStorage.getItem("id"),
         token: sessionStorage.getItem("token")
      }
   })


   if(loading) return <p>loading</p>
   if(error) console.log("error")
   console.log(data)
   console.log(!sessionStorage.getItem("token"))

   console.log(user)

   return(
      <>
      <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
      <button onClick={logout} >Logout</button>
      </>
   )
}

export default Home