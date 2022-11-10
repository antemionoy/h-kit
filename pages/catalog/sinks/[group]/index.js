import { useQuery, NetworkStatus } from '@apollo/client'
import { initializeApollo } from 'lib/apollo'
import { CatalogProducts, Filter, Layout, ProductGrid } from 'containers'
import sinksStatic from 'config/static/catalog_sinks'
import Head from 'next/head'
import { useRouter } from 'next/router'
import SINKS_LIST_QUERY from 'graphql/queries/sinks/sinks_list.graphql'
import SINKS_CATEGORIES_QUERY from 'graphql/queries/sinks/sinks_categories.graphql'
import { PATH } from 'config/path'
import { usePagination } from 'helpers/usePagination'
import { useEffect, useState } from 'react'

const limit = 8

const isObjectsEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

function CatalogSinksPage({ sinksPath }) {
  const router = useRouter()
  const { tags, group } = router.query
  const pageSlug = `${PATH.SINKS}/${group}`

  const activeGroup = router.query.group || sinksStatic.defaultCategory
  const requestLimit =
    router.query.page && !isNaN(router.query.page)
      ? router.query.page * limit
      : limit
  const { data: sinksCategoriesData } = useQuery(SINKS_CATEGORIES_QUERY)
  const { data: sinksListData, fetchMore, networkStatus } = useQuery(
    SINKS_LIST_QUERY,
    {
      variables: {
        limit: requestLimit,
        category: activeGroup,
        tags,
      },
      notifyOnNetworkStatusChange: true,
    }
  )

  const [firstRender, setFirstRender] = useState(true)
  const [previousFilter, setPreviousFilter] = useState({ activeGroup, tags })
  useEffect(() => {
    if (
      !isObjectsEqual(previousFilter.activeGroup, activeGroup) ||
      !isObjectsEqual(previousFilter.tags, tags)
    ) {
      setPreviousFilter({ activeGroup, tags })
    }
  }, [activeGroup, tags])
  useEffect(() => {
    if (!firstRender) {
      const query = { ...router.query }
      delete query.page
      delete query.group
      router.push({ pathname: pageSlug, query }, undefined, {
        shallow: true,
      })
    } else {
      setFirstRender(false)
    }
  }, [previousFilter])

  const { fetchMore: sinksFetchMore } = usePagination({
    pathname: pageSlug,
    networkStatus,
  })

  const [data, setData] = useState(sinksListData)
  useEffect(() => {
    if (sinksListData) {
      setData(sinksListData)
    }
  }, [sinksListData])

  const activeGroupData = sinksCategoriesData?.sinks_categories.filter(
    (item) => activeGroup === item.slug
  )

  return (
    <>
      <Head>
        <title>Heime - {sinksStatic.title}</title>
        <link rel="canonical" href={sinksPath} />
      </Head>
      <Layout parentSelector="catalog">
        <div className="container">
          {sinksCategoriesData?.sinks_categories && (
            <CatalogProducts
              pageSlug={PATH.SINKS}
              title={sinksStatic.main.title}
              list={sinksCategoriesData.sinks_categories}
              defaultCategory={sinksStatic.defaultCategory}
            />
          )}
          {activeGroupData && activeGroupData.length > 0 && (
            <Filter
              pageSlug={pageSlug}
              parentSelector="catalog-filter"
              tags={activeGroupData[0].tags}
            />
          )}
          {data?.sinks && (
            <ProductGrid
              parentSelector="product-grid--4"
              output={activeGroup && data.sinks.data}
              slugPath={PATH.PRODUCT_SINKS}
              fetchMore={sinksFetchMore}
              totalLenght={data.sinks.pagination.total}
            />
          )}
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { query } = ctx
  const apolloClient = initializeApollo(null, ctx)

  await apolloClient.query({
    query: SINKS_CATEGORIES_QUERY,
  })
  await apolloClient.query({
    query: SINKS_LIST_QUERY,
    variables: {
      limit: query.page && !isNaN(query.page) ? query.page * limit : limit,
      category: query.group || sinksStatic.defaultCategory,
      tags: query.tags,
    },
  })

  const sinksPath = `${process.env.NEXT_PUBLIC_HOST}${PATH.SINKS}`
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      sinksPath,
    },
  }
}

export default CatalogSinksPage
