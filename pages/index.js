import { useQuery } from '@apollo/client'
import {
  CatalogSlider,
  Categories,
  Credit,
  Ideas,
  Interested,
  MainSlider,
  Materials,
  ProcessSlider,
  ProductionSlider,
  Proposal,
  SpecialOffer,
  Video,
} from 'components'
import { PATH } from 'config/path'
import creditData from 'config/static/credit'
import indexStatic from 'config/static/index'
import { Layout, Order } from 'containers'
import HOME_CATALOG_KITCHEN_QUERY from 'graphql/queries/index/home_catalog_kitchen.graphql'
import HOME_MATERIALS_QUERY from 'graphql/queries/index/home_materials.graphql'
import HOME_RECOMMENDED_QUERY from 'graphql/queries/index/home_recommended.graphql'
import HOME_SLIDERS_QUERY from 'graphql/queries/index/home_sliders.graphql'
import PROCESSES_QUERY from 'graphql/queries/processes.graphql'
import PRODUCTIONS_QUERY from 'graphql/queries/productions.graphql'
import CASES_LIST_QUERY from 'graphql/queries/shared/cases_list.graphql'
import IDEAS_QUERY from 'graphql/queries/shared/ideas.graphql'
import SPECIAL_OFFERS_QUERY from 'graphql/queries/special_offers.graphql'
import { initializeApollo } from 'lib/apollo'
import Head from 'next/head'
import { useEffect, useState } from 'react'

function IndexPage() {
  const [visitedKitchens, setVisitedKitchens] = useState(null)
  useEffect(() => {
    // Check if item exists in localstorage
    if (JSON.parse(localStorage.getItem('visited_kitchens'))) {
      setVisitedKitchens(JSON.parse(localStorage.getItem('visited_kitchens')))
    }
  }, [])

  const { data: homeSlidersData } = useQuery(HOME_SLIDERS_QUERY, {
    variables: { height: 160, width: 160 },
  })
  const { data: homeCatalogKitchenData, refetch } = useQuery(
    HOME_CATALOG_KITCHEN_QUERY
  )
  const { data: specialsData } = useQuery(SPECIAL_OFFERS_QUERY, {
    variables: { is_home: true },
  })
  const { data: casesData } = useQuery(CASES_LIST_QUERY, {
    variables: { is_home: true },
  })
  const { data: processesData } = useQuery(PROCESSES_QUERY)
  const { data: materialsData } = useQuery(HOME_MATERIALS_QUERY)
  const { data: productionsData } = useQuery(PRODUCTIONS_QUERY)
  const { data: homeRecommendedData } = useQuery(HOME_RECOMMENDED_QUERY)
  const { data: ideasData } = useQuery(IDEAS_QUERY, {
    variables: { is_home: true },
  })
  return (
    <>
      <Head>
        <title>Heime — Кухни с вашим характером</title>
      </Head>
      <Layout parentSelector="main">
        {homeSlidersData?.home_sliders && (
          <MainSlider data={homeSlidersData.home_sliders} />
        )}
        <div className="container">
          {homeCatalogKitchenData?.home_catalog_kitchen && (
            <CatalogSlider data={homeCatalogKitchenData.home_catalog_kitchen} />
          )}
          {specialsData?.special_offers.data && (
            <SpecialOffer
              title={indexStatic.special_offer.title}
              buttonText={indexStatic.special_offer.buttonText}
              specialsData={specialsData.special_offers.data}
            />
          )}
          {casesData?.cases[0] && (
            <Video
              mainTitle={indexStatic.video.title}
              buttonText={indexStatic.video.buttonText}
              title={casesData.cases[0].title}
              slug={casesData.cases[0].slug}
              slugPath={PATH.CASES}
              description={casesData.cases[0].summary}
              video={casesData.cases[0].video_review.video}
              image={casesData.cases[0].preview_image}
            />
          )}
          {processesData?.processes.length > 0 && (
            <ProcessSlider
              title={indexStatic.process_slider.title}
              description={indexStatic.process_slider.description}
              buttonText={indexStatic.process_slider.buttonText}
              slug={indexStatic.process_slider.slug}
              processesData={processesData.processes}
              parentSelector="main__process"
            />
          )}
          {materialsData?.home_materials.length > 0 && (
            <Materials
              list={materialsData.home_materials}
              title={indexStatic.materials.title}
              slug={indexStatic.materials.slug}
              buttonText={indexStatic.materials.buttonText}
            />
          )}
          <Categories
            data={indexStatic.categories}
            parentSelector="main__categories"
          />
          {productionsData?.productions.length > 0 && (
            <ProductionSlider
              productionsData={productionsData.productions}
              title={indexStatic.production_slider.title}
              buttonText={indexStatic.production_slider.buttonText}
            />
          )}
        </div>
        <div className="bg bg--gray">
          <Credit data={creditData} parentSelector="main__credit container" />
        </div>
        <div className="container">
          {homeRecommendedData?.home_recommended.length > 0 && (
            <Proposal
              list={homeRecommendedData?.home_recommended}
              title={indexStatic.proposal.title}
              buttonText={indexStatic.proposal.buttonText}
              slug={indexStatic.proposal.slug}
              parentSelector="main__proposal"
            />
          )}
          {ideasData?.ideas.data.length > 0 && (
            <Ideas
              title={indexStatic.ideas.title}
              buttonText={indexStatic.ideas.buttonText}
              ideasData={ideasData.ideas.data}
              slug={indexStatic.ideas.slug}
              parentSelector="main__ideas"
              withBigCard
            />
          )}
        </div>
        <div className="bg bg--gray">
          {visitedKitchens && (
            <Interested
              title={indexStatic.intrested.title}
              ids={visitedKitchens}
            />
          )}
        </div>
        <Order parentSelector="container" />
      </Layout>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx)

  await apolloClient.query({
    query: HOME_SLIDERS_QUERY,
    variables: { height: 160, width: 160 },
  })
  await apolloClient.query({
    query: HOME_CATALOG_KITCHEN_QUERY,
  })
  await apolloClient.query({
    query: SPECIAL_OFFERS_QUERY,
    variables: { is_home: true },
  })
  await apolloClient.query({
    query: CASES_LIST_QUERY,
    variables: { is_home: true },
  })
  await apolloClient.query({
    query: PROCESSES_QUERY,
  })
  await apolloClient.query({
    query: PROCESSES_QUERY,
  })
  await apolloClient.query({
    query: HOME_MATERIALS_QUERY,
  })
  await apolloClient.query({
    query: HOME_RECOMMENDED_QUERY,
  })
  await apolloClient.query({
    query: IDEAS_QUERY,
    variables: { is_home: true },
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default IndexPage
