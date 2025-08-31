import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const uri = import.meta.env.VITE_API_URL || "http://localhost:4000/graphql";

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri }),
  cache: new InMemoryCache(),
});
