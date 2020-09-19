import React, { useContext } from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import { Route } from 'react-router-dom'

const LoggedInRoute = ({ component, ...args }) => {

   const { isAuthenticated } = useAuth0()

   console.log(isAuthenticated)

   return (
      <Route component={withAuthenticationRequired(component, {})} {...args} />
   )
}

export default LoggedInRoute