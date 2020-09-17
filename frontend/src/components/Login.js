import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery, useMutation } from "@apollo/client"
import { useForm } from "react-hook-form"
import { LOGIN } from '../queries/queries'
import { saveAuthToken } from '../service/tokenService'

const Login = () => {

   const [formValue, setFormValue] = useState({})
   const { loading, error, data = {login:{user:{}}} } = useQuery(LOGIN, {
      variables: {
         email: formValue.email,
         password: formValue.password
      }
   })

   useEffect(() => {
      saveAuthToken(data.login.token)
   }, [data])


   const { register, handleSubmit } = useForm()
   const onSubmit = (value) => {
      setFormValue(value)
   }

   // console.log(data.login.token)
   console.log(data.login.user.id)


   if (loading) return <p>loading</p>


   return(
      <>
         <form onSubmit={handleSubmit(onSubmit)} >
            <input 
               type="text"
               name="email"
               placeholder="E-mail"
               ref={register}
            />
            <input 
               type="password"
               name="password"
               placeholder="Password"
               autoComplete="on"
               ref={register}
            />
            <button type="submit">
               Login
            </button>
         </form>
         {/* <p>{data.login.user.username}</p> */}
      </>
   )
}

export default Login