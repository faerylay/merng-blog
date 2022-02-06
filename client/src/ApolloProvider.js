import React from 'react';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      // console.log(
      //   `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      // ),
    }
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});
const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache()
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

