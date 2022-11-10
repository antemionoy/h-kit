import { useQuery, NetworkStatus } from '@apollo/client'
import { initializeApollo } from 'lib/apollo'
import { CatalogProducts, Filter, Layout, ProductGrid } from 'containers'
import technicsStatic from 'config/static/catalog_technics'
import Head from 'next/head'
import { useRouter } from 'next/router'
import TECHNICS_LIST_QUERY from 'graphql/queries/technics/technics_list.graphql'
import TECHNICS_CATEGORIES_QUERY from 'graphql/queries/technics/technics_categories.graphql'
import { PATH } from 'config/path'
import { usePagination } from 'helpers/usePagination'
import { useEffect, useState } from 'react'

const limit = 8

const isObjectsEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

function CatalogTechnicsPage({ technicsPath }) {
  const router = useRouter()
  const { tags } = router.query
  const activeGroup = router.query.group || technicsStatic.defaultCategory
  const { data: technicsCategoriesData } = useQuery(TECHNICS_CATEGORIES_QUERY)

  const requestLimit =
    router.query.page && !isNaN(router.query.page)
      ? router.query.page * limit
      : limit
  const { data: technicsListData, networkStatus } = useQuery(
    TECHNICS_LIST_QUERY,
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
      router.push({ pathname: PATH.TECHNICS, query }, undefined, {
        shallow: true,
      })
    } else {
      setFirstRender(false)
    }
  }, [previousFilter])

  const { fetchMore: technicsFetchMore } = usePagination({
    pathname: PATH.TECHNICS,
    networkStatus,
  })

  const [data, setData] = useState(technicsListData)
  useEffect(() => {
    if (technicsListData) {
      setData(technicsListData)
    }
  }, [technicsListData])
  const activeGroupData = technicsCategoriesData?.technics_categories.filter(
    (item) => activeGroup === item.slug
  )
  return (
    <>
      <Head>
        <title>Heime - {technicsStatic.title}</title>
        <link rel="canonical" href={technicsPath} />
      </Head>
      <Layout parentSelector="catalog">
        <div className="container">
          {technicsCategoriesData?.technics_categories && (
            <CatalogProducts
              pageSlug={PATH.TECHNICS}
              title={technicsStatic.main.title}
              list={technicsCategoriesData.technics_categories}
              defaultCategory={technicsStatic.defaultCategory}
            />
          )}
          {activeGroupData && activeGroupData.length > 0 && (
            <Filter
              pageSlug={PATH.TECHNICS}
              parentSelector="catalog-filter"
              tags={activeGroupData[0].tags}
            />
          )}
          {data?.technics && (
            <ProductGrid
              parentSelector="product-grid--4"
              output={activeGroup && data.technics.data}
              slugPath={PATH.PRODUCT_TECHNICS}
              fetchMore={technicsFetchMore}
              totalLenght={data.technics.pagination.total}
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
    query: TECHNICS_CATEGORIES_QUERY,
  })
  await apolloClient.query({
    query: TECHNICS_LIST_QUERY,
    variables: {
      limit: query.page && !isNaN(query.page) ? query.page * limit : limit,
      category: query.group || technicsStatic.defaultCategory,
      tags: query.tags,
    },
  })

  const technicsPath = `${process.env.NEXT_PUBLIC_HOST}${PATH.TECHNICS}`
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      technicsPath,
    },
  }
}

export default CatalogTechnicsPage
