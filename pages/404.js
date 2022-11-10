import { useQuery } from '@apollo/client'
import { Page404 } from 'components'
import PageNotFoundStatic from 'config/static/404'
import { Layout } from 'containers'
import { initializeApollo } from 'lib/apollo'
import Head from 'next/head'
import SETTINGS_QUERY from 'graphql/queries/404/settings.graphql'

function PageNotFound() {
  const { data } = useQuery(SETTINGS_QUERY)

  return (
    <>
      <Head>
        <title>Heime — {PageNotFoundStatic.title}</title>
      </Head>
      <Layout>
        <Page404
          data={PageNotFoundStatic}
          promoCode={data?.settings?.promocode_404}
        />
      </Layout>
    </>
  )
}

export async function getServerSidePropsProps(ctx) {
  const apolloClient = initializeApollo(null, ctx)

  await apolloClient.query({
    query: SETTINGS_QUERY,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default PageNotFound
