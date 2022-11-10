import { PATH } from 'config/path'
import TECHNIC_QUERY from 'graphql/queries/technic/technic.graphql'
import { initializeApollo } from 'lib/apollo'
import { getServerSideSitemap } from 'next-sitemap'

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx)

  const { data: technicData } = await apolloClient.query({
    query: TECHNIC_QUERY,
  })
  const technics = technicData.technics.data.map((technic) => ({
    loc: `${process.env.NEXT_PUBLIC_HOST}${PATH.PRODUCT_TECHNICS}/${technic.slug}`,
    lastmod: new Date().toISOString(),
    priority: 0.5,
    changefreq: 'weekly',
  }))
  const result = technics.filter(
    (v, i, a) =>
      a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
  )

  return getServerSideSitemap(ctx, result)
}

const Sitemap = () => {}
export default Sitemap
