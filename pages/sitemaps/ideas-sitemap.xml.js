import { PATH } from 'config/path'
import IDEAS_QUERY from 'graphql/queries/shared/ideas.graphql'
import { initializeApollo } from 'lib/apollo'
import { getServerSideSitemap } from 'next-sitemap'

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx)

  const { data: ideasData } = await apolloClient.query({
    query: IDEAS_QUERY,
  })
  const ideas = ideasData.ideas.data.map((idea) => ({
    loc: `${process.env.NEXT_PUBLIC_HOST}${PATH.IDEAS}/${idea.slug}`,
    lastmod: new Date().toISOString(),
    priority: 0.5,
    changefreq: 'weekly',
  }))
  const result = ideas.filter(
    (v, i, a) =>
      a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
  )

  return getServerSideSitemap(ctx, result)
}

const Sitemap = () => {}
export default Sitemap
