import { useQuery } from '@apollo/client'
import { CatalogCases, CatalogMain } from 'components'
import { PATH } from 'config/path'
import kitchensStatic from 'config/static/catalog_kitchens'
import { Filter, FilterGrid, Layout, Order } from 'containers'
import KITCHENS_CASES_QUERY from 'graphql/queries/kitchens_cases.graphql'
import KITCHENS_LIST_QUERY from 'graphql/queries/kitchens_list.graphql'
import KITCHEN_COLLECTIONS_QUERY from 'graphql/queries/kitchen_collections.graphql'
import KITCHEN_FILTERS_QUERY from 'graphql/queries/kitchen_filters.graphql'
import SLIDER_CATALOG_QUERY from 'graphql/queries/slider_catalog.graphql'
import { usePagination } from 'helpers/usePagination'
import { initializeApollo } from 'lib/apollo'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
const limit = 8 // Query X kitchens

const createFilter = (query) => ({
  tags: query.tags,
  order: query.sort,
  forms: query.form,
  colors: query.color,
  facades: query.facade,
  styles: query.style,
  prices: query.min && query.max && [+query.min, +query.max],
  tabletops: query.tabletop,
  sizes: query.size,
})

const isObjectsEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

function CatalogKitchenPage({ kitchensPath }) {
  const router = useRouter()
  const filter = useMemo((s) => createFilter(router.query), [router.query])
  const [previousFilter, setPreviousFilter] = useState(
    createFilter(router.query)
  )
  const [firstRender, setFirstRender] = useState(true)
  useEffect(() => {
    if (!isObjectsEqual(filter, previousFilter)) {
      setPreviousFilter(filter)
    }
  }, [filter])
  useEffect(() => {
    if (!firstRender) {
      const query = { ...router.query }
      delete query.page
      router.push({ pathname: PATH.KITCHENS, query }, undefined, {
        shallow: true,
      })
    } else {
      setFirstRender(false)
    }
  }, [previousFilter])
  const requestLimit =
    router.query.page && !isNaN(router.query.page)
      ? router.query.page * limit
      : limit
  const { data: sliderCatalogData } = useQuery(SLIDER_CATALOG_QUERY)
  const { data: kitchenFiltersData } = useQuery(KITCHEN_FILTERS_QUERY)
  const { data: kitchensListData, networkStatus, refetch } = useQuery(
    KITCHENS_LIST_QUERY,
    {
      variables: { limit: requestLimit, filter },
      notifyOnNetworkStatusChange: true,
    }
  )

  const [data, setData] = useState(kitchensListData)
  useEffect(() => {
    if (kitchensListData) {
      setData(kitchensListData)
    }
  }, [kitchensListData])
  const { fetchMore: kitchensFetchMore } = usePagination({
    pathname: PATH.KITCHENS,
    networkStatus,
  })
  const { data: kitchenCollectionsData } = useQuery(KITCHEN_COLLECTIONS_QUERY, {
    variables: {
      is_catalog: true,
    },
  })
  const { data: kitchensCasesData } = useQuery(KITCHENS_CASES_QUERY, {
    variables: {
      is_catalog: true,
    },
  })

  const { tags, order, ...filters } = kitchenFiltersData?.kitchen_filter
  return (
    <>
      <Head>
        <title>Heime - {data.kitchens.seo.title}</title>
        <link rel="canonical" href={kitchensPath} />
        <meta name="description" content={data.kitchens.seo.description} />
      </Head>
      <Layout parentSelector="catalog">
        <div className="container">
          {sliderCatalogData && (
            <CatalogMain
              title={data.kitchens.seo.h1}
              list={sliderCatalogData.slider_catalog}
            />
          )}
          {kitchenFiltersData?.kitchen_filter && (
            <Filter
              pageSlug={kitchensStatic.filter.pageSlug}
              filters={filters}
              tags={tags}
              order={order}
              withReset
              splitTags
            />
          )}
          {data?.kitchens.data.length > 0 && (
            <FilterGrid
              output={data.kitchens.data}
              blocks={kitchenCollectionsData.kitchen_collections}
              fetchMore={kitchensFetchMore}
              totalLenght={data.kitchens.pagination.total}
              type="kitchens"
            />
          )}
          {kitchensCasesData?.cases.length > 0 && (
            <CatalogCases
              case1={kitchensCasesData?.cases[0]}
              case2={kitchensCasesData?.cases[1]}
              title={kitchensStatic.cases.title}
              buttonText={kitchensStatic.cases.buttonText}
              description={kitchensStatic.cases.description}
              slug={kitchensStatic.cases.slug}
            />
          )}
          <Order />
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { query } = ctx
  const apolloClient = initializeApollo(null, ctx)
  await apolloClient.query({
    query: SLIDER_CATALOG_QUERY,
  })
  await apolloClient.query({
    query: KITCHEN_FILTERS_QUERY,
  })
  await apolloClient.query({
    query: KITCHEN_COLLECTIONS_QUERY,
  })
  await apolloClient.query({
    query: KITCHENS_LIST_QUERY,
    variables: {
      limit: query.page && !isNaN(query.page) ? query.page * limit : limit,
      filter: {
        tags: query.tags,
        order: query.sort,
        forms: query.form,
        colors: query.color,
        facades: query.facade,
        styles: query.style,
        prices: query.min && query.max && [+query.min, +query.max],
        tabletops: query.tabletop,
        sizes: query.size,
      },
    },
  })
  await apolloClient.query({
    query: KITCHENS_CASES_QUERY,
    variables: {
      is_catalog: true,
    },
  })

  const kitchensPath = `${process.env.NEXT_PUBLIC_HOST}${PATH.KITCHENS}`
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      kitchensPath,
    },
  }
}

export default CatalogKitchenPage
