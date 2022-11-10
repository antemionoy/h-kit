import { ApolloProvider } from '@apollo/client'
import CONTACTS_QUERY from 'graphql/queries/contacts/contacts.graphql'
import CITIES_QUERY from 'graphql/queries/cities.graphql'
import { detectWidthBreakpoint, throttle } from 'helpers'
import { initializeApollo, useApollo } from 'lib/apollo'
import { useStore } from 'lib/redux'
import App from 'next/app'
import { useCallback, useEffect } from 'react'
import { Provider } from 'react-redux'
import * as actions from 'redux/actions'
import Cookies from 'js-cookie'

import nextCookies from 'next-cookies'

import 'swiper/swiper.scss'
import 'styles/reset.scss'
import 'styles/fonts.scss'
import 'styles/containers.scss'
import 'styles/typography.scss'
import 'styles/global.scss'
import 'elements/style.scss'
import 'components/style.scss'
import 'containers/style.scss'
import 'lib/LazyLoadImage/effects/opacity.css'
import { initializeStore } from '../lib/redux'
function CustomApp({ Component, pageProps, contacts, activeContact }) {
  const apolloClient = useApollo(pageProps.initialApolloState)
  const store = useStore({
    contacts,
    activeContact,
    ...pageProps.initialReduxState,
  })
  const { dispatch, getState } = store

  const onResize = useCallback(
    throttle(() => {
      try {
        const breakpoints = getState().breakpoint
        const currentBreakpoint = detectWidthBreakpoint(window.innerWidth)
        const desktopCondtion = !(
          breakpoints.isDesktop === currentBreakpoint.isDesktop
        )
        const tabletCondition = !(
          breakpoints.isTablet === currentBreakpoint.isTablet
        )
        const mobileCondtion = !(
          breakpoints.isMobile === currentBreakpoint.isMobile
        )

        if (desktopCondtion || tabletCondition || mobileCondtion) {
          dispatch(actions.changeBreakpoint(currentBreakpoint))
        }
      } catch (e) {}
    }, 300)
  )
  useEffect(() => {
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Provider>
    </>
  )
}

CustomApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  const path = appContext?.ctx?.req?.url
  if (
    path &&
    path !== '/' &&
    /(\%2F+)|([\/]+)+$/.test(path) &&
    appContext?.ctx?.res?.writeHead
  ) {
    const newPath = path.replace(/(\%2F+)|([\/]+)+$/, '')
    appContext.ctx.res.setHeader('location', newPath)
    appContext.ctx.res.statusCode = 301
  }

  const apolloClient = initializeApollo(null, appContext?.ctx)
  const contacts = await apolloClient.query({
    query: CONTACTS_QUERY,
  })
  const cities = await apolloClient.query({
    query: CITIES_QUERY,
  })
  const contactsData = contacts?.data?.contacts.map((contact, i) => {
    const city = cities.data.cities.filter((city) => city.name === contact.city)
    return (
      city.length > 0 && {
        ...contact,
        'x-city': city[0].slug,
      }
    )
  })
  const activeContact = nextCookies(appContext?.ctx).city || contactsData[0]
  return {
    ...appProps,
    path,
    contacts: contactsData,
    activeContact,
  }
}

export default CustomApp
