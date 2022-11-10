import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { Offer } from 'components'
import { Layout } from 'containers'
import { initializeApollo } from 'lib/apollo'
import specialStatic from 'config/static/special'
import Head from 'next/head'
import SPECIAL_OFFERS_QUERY from 'graphql/queries/special/special_offers.graphql'
import SETTINGS_QUERY from 'graphql/queries/404/settings.graphql'
import PageNotFound from '../404'

function OfferPage() {
  const router = useRouter()
  const { slug } = router.query
  const { data: specialsData } = useQuery(SPECIAL_OFFERS_QUERY, {
    variables: { slug },
  })

  if (specialsData?.special_offers.data.length < 1) {
    return <PageNotFound />
  }

  return (
    <>
      <Head>
        {specialsData?.special_offers.data[0].title && (
          <title>Heime — {specialsData?.special_offers.data[0].title}</title>
        )}
      </Head>
      <Layout>
        {specialsData?.special_offers.data[0] && (
          <Offer
            backButtonText={specialStatic.backButtonText}
            title={specialsData?.special_offers.data[0].title}
            image={specialsData?.special_offers.data[0].image.path}
            text={specialsData?.special_offers.data[0].content}
            conditionsTitle={specialStatic.conditionsTitle}
            conditions={specialsData?.special_offers.data[0].conditions}
            buttonText={specialsData?.special_offers.data[0].button_text}
            buttonLink={specialsData?.special_offers.data[0].link}
            relatedTitle={specialStatic.relatedTitle}
            related={specialsData?.special_offers.data[0].related}
          />
        )}
      </Layout>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { query } = ctx
  const apolloClient = initializeApollo(null, ctx)

  const { data } = await apolloClient.query({
    query: SPECIAL_OFFERS_QUERY,
    variables: { slug: query.slug },
  })

  if (data?.special_offers.data.length < 1) {
    await apolloClient.query({
      query: SETTINGS_QUERY,
    })
  }

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default OfferPage
