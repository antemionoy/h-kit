import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Favorites } from 'components'
import { Layout } from 'containers'
import { initializeApollo } from 'lib/apollo'
import favoritesStatic from 'config/static/favorites'
import Head from 'next/head'
import KITCHENS_QUERY from 'graphql/queries/favorites/kitchens.graphql'
import MATERIALS_QUERY from 'graphql/queries/materials/materials_list.graphql'
import SINKS_QUERY from 'graphql/queries/sinks/sinks_list.graphql'
import TECHNICS_QUERY from 'graphql/queries/technics/technics_list.graphql'
import SLIDER_CATALOG_QUERY from 'graphql/queries/slider_catalog.graphql'
import { PATH } from 'config/path'

function FavoritesPage({ favsPath }) {
  const [initIds, setInitIds] = useState({
    kitchens: [],
    materials: [],
    sinks: [],
    technics: [],
  })

  useEffect(() => {
    setInitIds({
      kitchens: JSON.parse(localStorage.getItem('fav_kitchens')) || [],
      materials: JSON.parse(localStorage.getItem('fav_material')) || [],
      sinks: JSON.parse(localStorage.getItem('fav_sink')) || [],
      technics: JSON.parse(localStorage.getItem('fav_technic')) || [],
    })
  }, [])

  const favRemoveItemFromState = (id, type) => {
    setInitIds((prev) => ({
      ...prev,
      [type]: prev[type]?.filter((i) => i !== id),
    }))
  }

  const { data: kitchensData } = useQuery(KITCHENS_QUERY, {
    variables: { ids: initIds.kitchens },
  })
  const { data: materialsData } = useQuery(MATERIALS_QUERY, {
    variables: { ids: initIds.materials },
  })
  const { data: sinksData } = useQuery(SINKS_QUERY, {
    variables: { ids: initIds.sinks },
  })
  const { data: technicsData } = useQuery(TECHNICS_QUERY, {
    variables: { ids: initIds.technics },
  })
  const { data: sliderCatalogData } = useQuery(SLIDER_CATALOG_QUERY)

  return (
    <>
      <Head>
        <title>{favoritesStatic.title}</title>
      </Head>
      <Layout removeFooterTopMargin>
        <Favorites
          data={favoritesStatic}
          kitchens={
            initIds.kitchens?.length > 0 && kitchensData?.kitchens?.data
          }
          materials={
            initIds.materials?.length > 0 &&
            materialsData?.materials?.data?.reduce((prev, current) => {
              if (
                prev.filter((item) => item.id === current.material.id).length >
                0
              ) {
                return prev
              } else {
                prev.push(current.material)
                return prev
              }
            }, [])
          }
          sinks={initIds.sinks?.length > 0 && sinksData?.sinks?.data}
          technics={
            initIds.technics?.length > 0 && technicsData?.technics?.data
          }
          ids={initIds}
          slider={
            sliderCatalogData?.slider_catalog?.length > 0 &&
            sliderCatalogData.slider_catalog
          }
          favsPath={favsPath}
          favRemoveItemFromState={favRemoveItemFromState}
          fadeOnFavorite
        />
      </Layout>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx)

  await apolloClient.query({
    query: SLIDER_CATALOG_QUERY,
  })

  const favsPath = `${process.env.NEXT_PUBLIC_HOST}${PATH.FAVORITES}`
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      favsPath,
    },
  }
}

export default FavoritesPage
