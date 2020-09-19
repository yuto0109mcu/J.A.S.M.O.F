import React from 'react';
import { useAuth0 } from "@auth0/auth0-react"
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery } from '@apollo/client'
import {
   Router,
   Route,
   Switch
} from "react-router-dom"
import { createBrowserHistory } from "history"
import Login from './components/Login';
import Home from './components/Home';
import LoggedInRoute from './components/LoggedInRoute';

const client = new ApolloClient({
   uri: 'http://localhost:5000/graphql',
   cache: new InMemoryCache()
})

const history = createBrowserHistory()

function App() {

   const { isLoading } = useAuth0()

   if (isLoading) return <p>loading</p>

   return (
      <ApolloProvider client={client}>
         <Router history={history} >
            <Switch>
               <Route exact path="/" component={Login} />
               <LoggedInRoute exact path="/home" component={Home}/>
            </Switch>
            {/* <Login />
            <Home /> */}
         </Router>
      </ApolloProvider>
   );
}

export default App;
