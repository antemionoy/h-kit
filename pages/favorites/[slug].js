import { useQuery } from '@apollo/client'
import { Favorites } from 'components'
import { PATH } from 'config/path'
import favoritesStatic from 'config/static/favorites'
import { Layout } from 'containers'
import SETTINGS_QUERY from 'graphql/queries/404/settings.graphql'
import FAVORITES_QUERY from 'graphql/queries/favorites/favorites.graphql'
import { initializeApollo } from 'lib/apollo'
import Head from 'next/head'
import { useRouter } from 'next/router'
import PageNotFound from '../404'

function FavoritesShare({ favsPath }) {
  const router = useRouter()
  const { slug } = router.query
  const { data: favoritesData } = useQuery(FAVORITES_QUERY, {
    variables: { slug },
  })

  if (!favoritesData.favorite) {
    return <PageNotFound />
  }

  return (
    <>
      <Head>
        <title>Heime — {favoritesStatic.title}</title>
      </Head>
      <Layout>
        <Favorites
          data={favoritesStatic}
          kitchens={
            favoritesData?.favorite?.kitchens?.length > 0 &&
            favoritesData?.favorite?.kitchens
          }
          materials={
            favoritesData?.favorite?.materials?.length > 0 &&
            favoritesData?.favorite?.materials
          }
          sinks={
            favoritesData?.favorite?.sinks?.length > 0 &&
            favoritesData?.favorite?.sinks
          }
          technics={
            favoritesData?.favorite?.technics?.length > 0 &&
            favoritesData?.favorite?.technics
          }
          favsPath={favsPath}
          sharedSlug={slug}
          disableFavoriteButton
        />
      </Layout>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { query } = ctx
  const apolloClient = initializeApollo(null, ctx)

  const { data } = await apolloClient.query({
    query: FAVORITES_QUERY,
    variables: { slug: query.slug },
  })
  if (!data.favorite) {
    await apolloClient.query({
      query: SETTINGS_QUERY,
    })
  }

  const favsPath = `${process.env.NEXT_PUBLIC_HOST}${PATH.FAVORITES}`
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      favsPath,
    },
  }
}

export default FavoritesShare
