import { useQuery } from '@apollo/client'
import { Reviews } from 'components'
import { Layout } from 'containers'
import REVIEWS_QUERY from 'graphql/queries/reviews/reviews.graphql'
import { usePagination } from 'helpers/usePagination'
import { initializeApollo } from 'lib/apollo'
import mockReviews from 'mock/reviews'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { PATH } from 'config/path'
import { useRouter } from 'next/router'

const limit = 5

function ReviewsPage({ reviewsPath }) {
  const router = useRouter()
  const requestLimit =
    router.query.page && !isNaN(router.query.page)
      ? router.query.page * limit
      : limit
  const { data: reviewsData, networkStatus } = useQuery(REVIEWS_QUERY, {
    variables: { limit: requestLimit },
  })
  const [data, setData] = useState(reviewsData)
  useEffect(() => {
    if (reviewsData) {
      setData(reviewsData)
    }
  }, [reviewsData])

  const { fetchMore: reviewsFetchMore } = usePagination({
    pathname: PATH.REVIEWS,
    networkStatus,
  })
  return (
    <>
      <Head>
        <title>Отзывы о нас — Heime</title>
        <link rel="canonical" href={reviewsPath} />
      </Head>
      <Layout>
        <Reviews
          reviews={data?.reviews?.data}
          pagination={data?.reviews?.pagination}
          fetchMore={reviewsFetchMore}
        />
      </Layout>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { query } = ctx
  const apolloClient = initializeApollo(null, ctx)
  await apolloClient.query({
    query: REVIEWS_QUERY,
    variables: {
      limit: query.page && !isNaN(query.page) ? query.page * limit : limit,
    },
  })
  const reviewsPath = `${process.env.NEXT_PUBLIC_HOST}${PATH.REVIEWS}`
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      reviewsPath,
    },
  }
}

export default ReviewsPage
