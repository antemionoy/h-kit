import { useQuery, NetworkStatus } from '@apollo/client'
import { Specials } from 'components'
import { Layout } from 'containers'
import { useRouter } from 'next/router'
import SPECIAL_OFFERS_TAGS_QUERY from 'graphql/queries/specials/special_offer_tags.graphql'
import SPECIAL_OFFERS_QUERY from 'graphql/queries/special_offers.graphql'
import SPECIAL_OFFERS_HIGHLIGHT_QUERY from 'graphql/queries/specials/special_offer_highlight.graphql'
import { initializeApollo } from 'lib/apollo'
import specialsStatic from 'config/static/specials'
import Head from 'next/head'
import { usePagination } from 'helpers/usePagination'
import { PATH } from 'config/path'
import { useState, useEffect } from 'react'
const limit = 8 // Query X specials

function SpecialsPage({ specialsPath }) {
  const router = useRouter()

  const { data: specialsTagsData } = useQuery(SPECIAL_OFFERS_TAGS_QUERY)
  const { data: specialsData, networkStatus } = useQuery(SPECIAL_OFFERS_QUERY, {
    variables: {
      limit:
        router.query.page && !isNaN(router.query.page)
          ? router.query.page * limit
          : limit,
      tags: router.query.tags,
    },
  })
  const { data: specialsHighlightData } = useQuery(
    SPECIAL_OFFERS_HIGHLIGHT_QUERY,
    {
      variables: { is_highlight: true },
    }
  )
  const { fetchMore: specialsFetchMore } = usePagination({
    pathname: PATH.SPECIALS,
    networkStatus,
  })

  const [data, setData] = useState(specialsData)
  useEffect(() => {
    if (specialsData) {
      setData(specialsData)
    }
  }, [specialsData])

  return (
    <>
      <Head>
        <title>Акции и специальные предложения — Heime</title>
        <link rel="canonical" href={specialsPath} />
      </Head>
      <Layout>
        {data?.special_offers.data && specialsTagsData?.special_offers_tags && (
          <Specials
            data={specialsStatic}
            title={specialsStatic.title}
            description={specialsStatic.description}
            offers={specialsHighlightData?.special_offers.data}
            tags={specialsTagsData.special_offers_tags}
            specialsData={data.special_offers.data}
            fetchMore={specialsFetchMore}
            totalLenght={data.special_offers.pagination.total}
          />
        )}
      </Layout>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { query } = ctx
  const apolloClient = initializeApollo(null, ctx)

  await apolloClient.query({
    query: SPECIAL_OFFERS_TAGS_QUERY,
  })
  await apolloClient.query({
    query: SPECIAL_OFFERS_QUERY,
    variables: {
      limit: query.page && !isNaN(query.page) ? query.page * limit : limit,
      tags: query.tags,
    },
  })
  await apolloClient.query({
    query: SPECIAL_OFFERS_HIGHLIGHT_QUERY,
    variables: { is_highlight: true },
  })

  const specialsPath = `${process.env.NEXT_PUBLIC_HOST}${PATH.SPECIALS}`
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      specialsPath,
    },
  }
}

export default SpecialsPage
