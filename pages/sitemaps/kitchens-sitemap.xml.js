import { PATH } from 'config/path'
import KITCHEN_QUERY from 'graphql/queries/kitchen.graphql'
import { initializeApollo } from 'lib/apollo'
import { getServerSideSitemap } from 'next-sitemap'

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx)
  const { data: kitchenData } = await apolloClient.query({
    query: KITCHEN_QUERY,
  })

  const kitchens = kitchenData.kitchens.data.map((kitchen) => ({
    loc: `${process.env.NEXT_PUBLIC_HOST}${PATH.KITCHEN}/${kitchen.slug}`,
    lastmod: new Date().toISOString(),
    priority: 0.5,
    changefreq: 'weekly',
  }))
  const result = kitchens.filter(
    (v, i, a) =>
      a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
  )

  return getServerSideSitemap(ctx, result)
}

const Sitemap = () => {}
export default Sitemap
