import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { useMemo } from 'react'
import nextCookies from 'next-cookies'
import Cookies from 'js-cookie'

let apolloClient

const linkError = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

function createApolloClient(serverXCity) {
  const headersLink = setContext((_, { headers }) => {
    // let xCity = {}
    // if (typeof window !== 'undefined') {
    //   let city = JSON.parse(Cookies.get('city'))['x-city']
    //   if (city) {
    //     xCity['X-City'] = city
    //   }
    // } else {
    //   if (serverXCity) {
    //     xCity['X-City'] = serverXCity['x-city']
    //   }
    // }
    return {
      headers: {
        // ...xCity,
        ...headers,
      },
    }
  })

  const link = from([
    // linkError,
    headersLink,
    new HttpLink({
      uri: process.env.NEXT_PUBLIC_API,
      credentials: 'same-origin',
      // fetchOptions: {
      //   mode: 'no-cors',
      // },
    }),
  ])
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            kitchens: {
              merge(existing, incoming) {
                return { ...existing, ...incoming }
              },
            },
            materials: {
              merge(existing, incoming) {
                return { ...existing, ...incoming }
              },
            },
            sinks: {
              merge(existing, incoming) {
                return { ...existing, ...incoming }
              },
            },
            technics: {
              merge(existing, incoming) {
                return { ...existing, ...incoming }
              },
            },
            special_offers: {
              merge(existing, incoming) {
                return { ...existing, ...incoming }
              },
            },
            ideas: {
              merge(existing, incoming) {
                return { ...existing, ...incoming }
              },
            },
          },
        },
      },
    }),
  })
}

export function initializeApollo(initialState = null, context) {
  const _apolloClient =
    apolloClient ??
    createApolloClient((context && nextCookies(context).city) || '')

  if (initialState) {
    const existingCache = _apolloClient.extract()
    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }
  if (typeof window === 'undefined') return _apolloClient
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
