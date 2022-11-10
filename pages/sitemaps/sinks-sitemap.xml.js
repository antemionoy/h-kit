import { PATH } from 'config/path'
import SINK_QUERY from 'graphql/queries/sink/sink.graphql'
import { initializeApollo } from 'lib/apollo'
import { getServerSideSitemap } from 'next-sitemap'

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx)

  const { data: sinksData } = await apolloClient.query({
    query: SINK_QUERY,
  })
  const sinks = sinksData.sinks.data.map((sink) => ({
    loc: `${process.env.NEXT_PUBLIC_HOST}${PATH.PRODUCT_SINKS}/${sink.slug}`,
    lastmod: new Date().toISOString(),
    priority: 0.5,
    changefreq: 'weekly',
  }))
  const result = sinks.filter(
    (v, i, a) =>
      a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
  )

  return getServerSideSitemap(ctx, result)
}

const Sitemap = () => {}
export default Sitemap
