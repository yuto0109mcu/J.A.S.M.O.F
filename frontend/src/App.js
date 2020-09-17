import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import Login from './components/Login';
import Home from './components/Home';

const client = new ApolloClient({
   uri: 'http://localhost:5000/graphql',
   cache: new InMemoryCache()
})

function App() {


   return (
      <ApolloProvider client={client}>
         <Login />
         <Home />
      </ApolloProvider>
   );
}

export default App;
