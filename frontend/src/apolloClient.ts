import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Create an Apollo Client instance
const client = new ApolloClient({
  link: new HttpLink({
    uri: '/graphql', // Will be proxied to http://localhost:8080/graphql during development
  }),
  cache: new InMemoryCache(),
});

export default client; 