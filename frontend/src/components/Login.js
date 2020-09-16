import React, { useState } from 'react'
import { useLazyQuery, useMutation } from "@apollo/client"
import { useForm } from "react-hook-form"
import { LOGIN } from '../queries/queries'

const Login = () => {

   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")

   const [login, { loading, error, data }] = useLazyQuery(LOGIN)

   const handleSubmit = (e) => {
      e.preventDefault()
      login({
         variables: {
            email,
            password
         }
      })
   }

   console.log(data)

   return(
      <>
         <form onSubmit={handleSubmit} >
            <input 
               type="text"
               name="email"
               placeholder="E-mail"
               onChange={(e) => setEmail(e.target.value)}
            />
            <input 
               type="password"
               name="password"
               placeholder="Password"
               onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">
               Login
            </button>
         </form>
      </>
   )
}

export default Login