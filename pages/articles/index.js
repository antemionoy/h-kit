import { useQuery, NetworkStatus } from '@apollo/client'
import { useRouter } from 'next/router'
import { Articles } from 'components'
import { Layout } from 'containers'
import IDEAS_QUERY from 'graphql/queries/shared/ideas.graphql'
import IDEAS_TAGS_QUERY from 'graphql/queries/ideas/idea_tags.graphql'
import CASES_QUERY from 'graphql/queries/cases/cases.graphql'
import { initializeApollo } from 'lib/apollo'
import casesArticlesStatic from 'config/static/articles'
import Head from 'next/head'
import { PATH } from 'config/path'
import { useState, useEffect } from 'react'
const limit = 8 // Query X ideas

const isObjectsEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

function ArticlesPage({ articlesPath }) {
  const router = useRouter()

  const hasPage = !!(router.query.page && !isNaN(router.query.page))
  const both = !router.query.tags
  const isCases = router.query.tags === 'cases'
  const isIdeas = !!(!isCases && router.query.tags)

  const ideasLimit = both
    ? hasPage
      ? (router.query.page * limit) / 2 - 1
      : 3
    : isCases
    ? 0
    : isIdeas
    ? hasPage
      ? router.query.page * limit - 1
      : 7
    : 0
  const casesLimit = both
    ? hasPage
      ? (router.query.page * limit) / 2
      : 4
    : isIdeas
    ? 0
    : isCases
    ? hasPage
      ? router.query.page * limit - 1
      : 7
    : 0

  const {
    data: casesData,
    networkStatus: networkStatusCases,
  } = useQuery(CASES_QUERY, { variables: { limit: casesLimit } })
  const { data: ideaTagsData } = useQuery(IDEAS_TAGS_QUERY)
  const { data: ideasData, networkStatus } = useQuery(IDEAS_QUERY, {
    variables: { limit: ideasLimit, tags: router.query.tags },
  })
  const fetchMore = () => {
    if (
      !(networkStatus === NetworkStatus.setVariables) &&
      !(networkStatusCases === NetworkStatus.setVariables)
    ) {
      let query = { ...router.query }
      if (query.page && !isNaN(query.page)) {
        query.page = +query.page + 1
      } else {
        query.page = 2
      }
      router.push({ query, pathname: PATH.IDEAS }, undefined, {
        shallow: true,
      })
    }
  }

  const [dataCases, setDataCases] = useState(casesData)
  useEffect(() => {
    if (casesData) {
      setDataCases(casesData)
    }
  }, [casesData])
  const [dataIdeas, setDataIdeas] = useState(ideasData)
  useEffect(() => {
    if (ideasData) {
      setDataIdeas(ideasData)
    }
  }, [ideasData])

  const [previousTags, setPreviousTags] = useState(router.query.tags)
  useEffect(() => {
    if (!isObjectsEqual(previousTags, router.query.tags)) {
      setPreviousTags(router.query.tags)
    }
  }, [router.query])
  const [firstRender, setFirstRender] = useState(true)
  useEffect(() => {
    if (!firstRender) {
      const query = { ...router.query }
      delete query.page
      router.push({ pathname: PATH.IDEAS, query }, undefined, {
        shallow: true,
      })
    } else {
      setFirstRender(false)
    }
  }, [previousTags])
  return (
    <>
      <Head>
        <title>Кейсы, советы и идеи от Heime</title>
        <link rel="canonical" href={articlesPath} />
      </Head>
      <Layout>
        <Articles
          title={casesArticlesStatic.title}
          description={casesArticlesStatic.description}
          // quote={casesArticlesStatic.quote}
          ideasTagsData={ideaTagsData?.idea_tags}
          ideasData={dataIdeas?.ideas}
          casesData={dataCases?.cases}
          fetchMore={fetchMore}
          isCases={router.query.tags === 'cases'}
          both={!router.query.tags}
        />
      </Layout>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { query } = ctx
  const apolloClient = initializeApollo(null, ctx)

  await apolloClient.query({
    query: IDEAS_TAGS_QUERY,
  })
  const hasPage = !!(query.page && !isNaN(query.page))
  const both = !query.tags
  const isCases = query.tags === 'cases'
  const isIdeas = !!(!isCases && query.tags)

  const ideasLimit = both
    ? hasPage
      ? (query.page * limit) / 2 - 1
      : 3
    : isCases
    ? 0
    : isIdeas
    ? hasPage
      ? query.page * limit - 1
      : 7
    : 0
  const casesLimit = both
    ? hasPage
      ? (query.page * limit) / 2
      : 4
    : isIdeas
    ? 0
    : isCases
    ? hasPage
      ? query.page * limit - 1
      : 7
    : 0

  await apolloClient.query({
    query: IDEAS_QUERY,
    variables: {
      limit: ideasLimit,
      tags: query.tags,
    }, // Should be false
  })
  await apolloClient.query({
    query: CASES_QUERY,
    variables: {
      limit: casesLimit,
    },
  })

  const articlesPath = `${process.env.NEXT_PUBLIC_HOST}${PATH.IDEAS}`

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      articlesPath,
    },
  }
}

export default ArticlesPage
