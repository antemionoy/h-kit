import React from 'react'
import Head from 'next/head'
import { Layout } from 'containers'
import { Compilation } from 'components'
import mockCompilation from 'mock/compilation'
import COMPILATION_QUERY from 'graphql/queries/compilation/compilation.graphql'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { initializeApollo } from 'lib/apollo'
import PageNotFound from '../404'

const CompilationPage = () => {
  return <PageNotFound />
  const router = useRouter()
  const { data: compilationData } = useQuery(COMPILATION_QUERY, {
    variables: {
      slug: router.query.slug,
      price_order: router.query.sort?.replace('price-', ''),
    },
  })
  return (
    <>
      <Head>
        <title>Heime — {mockCompilation.title}</title>
      </Head>
      <Layout>
        <Compilation compilation={compilationData?.kitchen_collections[0]} />
      </Layout>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { query } = ctx
  const apolloClient = initializeApollo(null, ctx)
  await apolloClient.query({
    query: COMPILATION_QUERY,
    variables: {
      slug: query.slug,
      price_order: query.sort?.replace('price-', ''),
    },
  })
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default CompilationPage
