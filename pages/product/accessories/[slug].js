import { useQuery } from '@apollo/client'
import { Fitting } from 'components'
import accessoriesStatic from 'config/static/material_accessories'
import { Layout } from 'containers'
import SETTINGS_QUERY from 'graphql/queries/404/settings.graphql'
import MATERIAL_QUERY from 'graphql/queries/material/material.graphql'
import { initializeApollo } from 'lib/apollo'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import PageNotFound from '../../404'
const AccessoryPage = () => {
  const router = useRouter()
  const { slug } = router.query

  const { data: materialData } = useQuery(MATERIAL_QUERY, {
    variables: { slug },
  })

  if (!materialData?.material) {
    return <PageNotFound />
  }

  return (
    <>
      <Head>
        <title>Heime - Аксессуар</title>
      </Head>
      <Layout>
        <Fitting
          material={materialData?.material}
          data={accessoriesStatic}
          // back={{
          //   onClick: () =>
          //     router.push({
          //       pathname: PATH.MATERIALS,
          //       query: { group: materialData?.material.category.slug },
          //     }),
          //   content: accessoriesStatic.back.content,
          // }}
        />
      </Layout>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { params } = ctx
  const apolloClient = initializeApollo(null, ctx)

  const { data } = await apolloClient.query({
    query: MATERIAL_QUERY,
    variables: { slug: params.slug },
  })

  if (!data?.material) {
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

export default AccessoryPage
