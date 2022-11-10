import { useQuery } from '@apollo/client'
import { Page404 } from 'components'
import PageNotFoundStatic from 'config/static/404'
import { Layout } from 'containers'
import { initializeApollo } from 'lib/apollo'
import Head from 'next/head'
import SETTINGS_QUERY from 'graphql/queries/404/settings.graphql'

function PageNotFound() {
  const { data } = useQuery(SETTINGS_QUERY)

  return (
    <>
      <Head>
        <title>Heime — {PageNotFoundStatic.title}</title>
      </Head>
      <Layout>
        <Page404
          data={PageNotFoundStatic}
          promoCode={data?.settings?.promocode_404}
        />
      </Layout>
    </>
  )
}

export async function getServerSidePropsProps(ctx) {
  const apolloClient = initializeApollo(null, ctx)

  await apolloClient.query({
    query: SETTINGS_QUERY,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default PageNotFound

// import { useQuery, NetworkStatus } from '@apollo/client'
// import { initializeApollo } from 'lib/apollo'
// import { CatalogProducts, Filter, Layout, ProductGrid } from 'containers'
// import { Ideas } from 'components'
// import materialsStatic from 'config/static/catalog_materials'
// import Head from 'next/head'
// import { useRouter } from 'next/router'
// import MATERIALS_LIST_QUERY from 'graphql/queries/materials/materials_list.graphql'
// import MATERIALS_CATEGORIES_QUERY from 'graphql/queries/materials/materials_categories.graphql'
// import IDEAS_QUERY from 'graphql/queries/shared/ideas.graphql'
// import { PATH } from 'config/path'
// import { usePagination } from 'helpers/usePagination'
// import { useState, useEffect } from 'react'

// const limit = (group = 'fasady') => {
//   switch (group) {
//     case 'fasady':
//       return 9
//     case 'stoleshnicy':
//       return 9
//     case 'furnitura':
//       return 12
//     case 'aksessuary':
//       return 12
//     default:
//       return 9
//   }
// }
// const isObjectsEqual = (obj1, obj2) => {
//   return JSON.stringify(obj1) === JSON.stringify(obj2)
// }

// function CatalogMaterialsPage({ materialsPath }) {
//   const router = useRouter()
//   const activeGroup = router.query.group || materialsStatic.defaultCategory
//   const { tags } = router.query
//   const { data: materialsCategoriesData } = useQuery(MATERIALS_CATEGORIES_QUERY)
//   const requestLimit =
//     router.query.page && !isNaN(router.query.page)
//       ? router.query.page *
//         limit(router.query.group || materialsStatic.defaultCategory)
//       : limit(router.query.group || materialsStatic.defaultCategory)
//   const { data: materialsListData, networkStatus } = useQuery(
//     MATERIALS_LIST_QUERY,
//     {
//       variables: {
//         limit: requestLimit,
//         category: activeGroup,
//         tags,
//       },
//       notifyOnNetworkStatusChange: true,
//     }
//   )
//   const [firstRender, setFirstRender] = useState(true)
//   const [previousFilter, setPreviousFilter] = useState({ activeGroup, tags })
//   useEffect(() => {
//     if (
//       !isObjectsEqual(previousFilter.activeGroup, activeGroup) ||
//       !isObjectsEqual(previousFilter.tags, tags)
//     ) {
//       setPreviousFilter({ activeGroup, tags })
//     }
//   }, [activeGroup, tags])
//   useEffect(() => {
//     if (!firstRender) {
//       const query = { ...router.query }
//       delete query.page
//       router.push({ pathname: PATH.MATERIALS, query }, undefined, {
//         shallow: true,
//       })
//     } else {
//       setFirstRender(false)
//     }
//   }, [previousFilter])
//   const { data: ideasData } = useQuery(IDEAS_QUERY, {
//     variables: { is_home: true },
//   })

//   const { fetchMore: materialsFetchMore } = usePagination({
//     pathname: PATH.MATERIALS,
//     networkStatus,
//   })

//   const [data, setData] = useState(materialsListData)
//   useEffect(() => {
//     if (materialsListData) {
//       setData(materialsListData)
//     }
//   }, [materialsListData])

//   const activeGroupData = materialsCategoriesData?.material_categories.filter(
//     (item) => activeGroup === item.slug
//   )

//   return (
//     <>
//       <Head>
//         <title>Heime - {materialsStatic.title}</title>
//         <link rel="canonical" href={materialsPath} />
//       </Head>
//       <Layout parentSelector="catalog">
//         <div className="container">
//           {materialsCategoriesData?.material_categories && (
//             <CatalogProducts
//               pageSlug={PATH.MATERIALS}
//               title={materialsStatic.main.title}
//               list={materialsCategoriesData.material_categories}
//               defaultCategory={materialsStatic.defaultCategory}
//             />
//           )}
//           {activeGroupData && activeGroupData.length > 0 && (
//             <Filter
//               pageSlug={PATH.MATERIALS}
//               parentSelector="catalog-filter"
//               tags={activeGroupData[0].tags}
//             />
//           )}
//           {data?.materials && (
//             <ProductGrid
//               parentSelector={
//                 activeGroup === 'fasady' || activeGroup === 'stoleshnicy'
//                   ? ''
//                   : 'product-grid--4'
//               }
//               output={activeGroup && data.materials.data}
//               fetchMore={materialsFetchMore}
//               totalLenght={data.materials.pagination.total}
//               isMaterials
//               addOptions
//               materialId
//             />
//           )}
//           {activeGroup === 'aksessuary' && ideasData?.ideas?.data && (
//             <Ideas
//               title={materialsStatic.ideas.title}
//               buttonText={materialsStatic.ideas.buttonText}
//               ideasData={ideasData.ideas.data}
//               slug={materialsStatic.ideas.slug}
//               parentSelector="accessories__ideas"
//               noBigCard
//             />
//           )}
//         </div>
//       </Layout>
//     </>
//   )
// }

// export async function getServerSideProps(ctx) {
//   const { query } = ctx
//   const apolloClient = initializeApollo(null, ctx)

//   await apolloClient.query({
//     query: MATERIALS_CATEGORIES_QUERY,
//   })
//   await apolloClient.query({
//     query: MATERIALS_LIST_QUERY,
//     variables: {
//       limit:
//         query.page && !isNaN(query.page)
//           ? query.page * limit(query.group || materialsStatic.defaultCategory)
//           : limit(query.group || materialsStatic.defaultCategory),
//       category: query.group || materialsStatic.defaultCategory,
//       tags: query.tags,
//     },
//   })
//   await apolloClient.query({
//     query: IDEAS_QUERY,
//     variables: { is_home: true },
//   })

//   const materialsPath = `${process.env.NEXT_PUBLIC_HOST}${PATH.MATERIALS}`
//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//       materialsPath,
//     },
//   }
// }

// export default CatalogMaterialsPage
