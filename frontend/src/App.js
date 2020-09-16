import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import Login from './components/Login';

const client = new ApolloClient({
   uri: 'http://localhost:5000/graphql',
   cache: new InMemoryCache()
})

function App() {
   return (
      <ApolloProvider client={client}>
         <Login/>
      </ApolloProvider>
   );
}

export default App;
