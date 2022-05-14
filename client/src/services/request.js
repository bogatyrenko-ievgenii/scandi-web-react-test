import {
  ApolloClient,
  InMemoryCache,
  // ApolloProvider,
  gql
} from "@apollo/client";


const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

const onRequest = (string) => {
  return client
    .query({
      query: gql`${string}`
    })
    .then(result => result)
    .catch((error) => {
      throw new Error(error)
    })
}

export default onRequest;