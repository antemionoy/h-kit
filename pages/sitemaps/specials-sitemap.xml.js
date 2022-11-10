import { PATH } from 'config/path'
import SPECIAL_OFFERS_QUERY from 'graphql/queries/specials_sitemap.graphql'
import { initializeApollo } from 'lib/apollo'
import { getServerSideSitemap } from 'next-sitemap'

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx)

  const { data: specialsData } = await apolloClient.query({
    query: SPECIAL_OFFERS_QUERY,
  })

  const specials = specialsData.special_offers.data.map((special) => ({
    loc: `${process.env.NEXT_PUBLIC_HOST}${PATH.SPECIALS}/${special.slug}`,
    lastmod: new Date().toISOString(),
    priority: 0.5,
    changefreq: 'weekly',
  }))
  const result = specials.filter(
    (v, i, a) =>
      a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
  )

  return getServerSideSitemap(ctx, result)
}

const Sitemap = () => {}
export default Sitemap
