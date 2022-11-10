import { PATH } from 'config/path'
import CASES_QUERY from 'graphql/queries/cases/cases_sitemap.graphql'
import { initializeApollo } from 'lib/apollo'
import { getServerSideSitemap } from 'next-sitemap'

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx)

  const { data: casesData } = await apolloClient.query({
    query: CASES_QUERY,
  })
  const cases = casesData.cases.data.map((caseItem) => ({
    loc: `${process.env.NEXT_PUBLIC_HOST}${PATH.CASES}/${caseItem.slug}`,
    lastmod: new Date().toISOString(),
    priority: 0.5,
    changefreq: 'weekly',
  }))
  const result = cases.filter(
    (v, i, a) =>
      a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
  )

  return getServerSideSitemap(ctx, result)
}

const Sitemap = () => {}
export default Sitemap
