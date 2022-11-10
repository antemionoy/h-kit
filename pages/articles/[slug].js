import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { Article } from 'components'
import { Layout } from 'containers'
import { initializeApollo } from 'lib/apollo'
import ideaStatic from 'config/static/idea'
import Head from 'next/head'
import IDEAS_QUERY from 'graphql/queries/idea/ideas.graphql'
import SETTINGS_QUERY from 'graphql/queries/404/settings.graphql'
import { PATH } from 'config/path'
import PageNotFound from '../404'

function ArticlePage({ pagePath }) {
  const router = useRouter()
  const { slug } = router.query

  const { data: ideasData } = useQuery(IDEAS_QUERY, {
    variables: { slug },
  })

  if (ideasData.ideas.data.length < 1) {
    return <PageNotFound />
  }

  return (
    <>
      <Head>
        {ideasData?.ideas.data[0].title && (
          <title>Heime — {ideasData.ideas.data[0].title}</title>
        )}
        {pagePath &&
          ideasData?.ideas.data[0].title &&
          ideasData?.ideas.data[0].description &&
          ideasData?.ideas.data[0].image.path.normal && (
            <>
              <meta property="og:type" content="website" />
              <meta property="og:url" content={pagePath} />
              <meta
                property="og:title"
                content={ideasData?.ideas.data[0].title}
              />
              <meta
                property="og:description"
                content={ideasData.ideas.data[0].description}
              />
              <meta
                property="og:image"
                content={ideasData.ideas.data[0].image.path.normal}
              />
              <meta property="og:locale" content="ru_RU" />

              <meta property="twitter:card" content="summary" />
              <meta property="twitter:url" content={pagePath} />
              <meta
                property="twitter:title"
                content={ideasData?.ideas.data[0].title}
              />
              <meta
                property="twitter:description"
                content={ideasData.ideas.data[0].description}
              />
              <meta
                property="twitter:image"
                content={ideasData.ideas.data[0].image.path.normal}
              />
            </>
          )}
      </Head>
      <Layout>
        {ideasData?.ideas.data.length > 0 && (
          <Article
            backButtonText={ideaStatic.backButtonText}
            title={ideasData.ideas.data[0].title}
            description={ideasData.ideas.data[0].description}
            list={ideasData.ideas.data[0].blocks}
            relatedTitle={ideaStatic.relatedTitle}
            related={ideasData.ideas.data[0].related}
            productSliderTitle={ideaStatic.productSliderTitle}
          />
        )}
      </Layout>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { query } = ctx
  const apolloClient = initializeApollo(null, ctx)
  const pagePath = `${process.env.NEXT_PUBLIC_HOST}${PATH.CASES}/${query.slug}`

  const { data } = await apolloClient.query({
    query: IDEAS_QUERY,
    variables: { slug: query.slug },
  })
  if (data?.ideas.data.length < 1) {
    await apolloClient.query({
      query: SETTINGS_QUERY,
    })
  }

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      pagePath,
    },
  }
}

export default ArticlePage
