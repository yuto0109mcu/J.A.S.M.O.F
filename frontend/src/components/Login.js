import React, { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react"
import { useLazyQuery } from "@apollo/client"
import { useForm } from "react-hook-form"
import { LOGIN } from '../queries/queries'
import { saveAuthToken } from '../service/tokenService'
import { Redirect } from 'react-router-dom'



const Login = () => {

   const [formValue, setFormValue] = useState({})
   const [login, { loading, error, data = {login:{user:{}}} }] = useLazyQuery(LOGIN, {
      variables: {
         email: formValue.email,
         password: formValue.password
      }
   })

   useEffect(() => {
      saveAuthToken(data.login.token, data.login.user.id)
   }, [data])


   const { register, handleSubmit } = useForm()
   const onSubmit = (value) => {
      setFormValue(value)
      login()
   }

   // console.log(data)
   // console.log(data.login.token)
   // console.log(data.login.user.id)

   const { loginWithRedirect, isAuthenticated } = useAuth0()

   console.log(isAuthenticated)

   return(
      <>
      {
         isAuthenticated ? (
            <Redirect to="/home"/>
            ) : (
            <button onClick={loginWithRedirect} > Login </button>
         )
      }
      </>
   )
}

export default Login