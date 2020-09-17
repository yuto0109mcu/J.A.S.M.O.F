import React from 'react'
import { useQuery } from "@apollo/client"
import { USER } from '../queries/queries'


const Home = () => {

   const { loading, error, data } = useQuery(USER, {
      variables: {
         id: "",
         token: localStorage.getItem("token")
      }
   })

   return(
      <>

      </>
   )
}

export default Home