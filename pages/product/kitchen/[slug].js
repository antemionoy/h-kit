import { useQuery } from '@apollo/client'
import {
  Credit,
  Feature,
  HistoryCreate,
  KitchenInfo,
  KitchenMain,
  KitchenMaterials,
  KitchenSlider,
  Modal,
  ProcessSlider,
  Proposal,
} from 'components'
import creditData from 'config/static/credit'
import kitchenStatic from 'config/static/kitchen'
import { Layout, Order } from 'containers'
import KITCHEN_QUERY from 'graphql/queries/kitchen.graphql'
import PROCESSES_QUERY from 'graphql/queries/processes.graphql'
import { useModal } from 'helpers/useModal'
import { initializeApollo } from 'lib/apollo'
import { priceFormat } from 'lib/price'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import SETTINGS_QUERY from 'graphql/queries/404/settings.graphql'
import PageNotFound from '../../404'

function addKitchenIdToVisitedList(id) {
  if (typeof window !== 'undefined') {
    let visitedKitchens = []
    // Check if item exists in localstorage
    if (localStorage.getItem('visited_kitchens')) {
      visitedKitchens = JSON.parse(localStorage.getItem('visited_kitchens'))
    }
    // Check if kitchen ID is aready in array, then remove
    if (visitedKitchens.includes(id)) {
      visitedKitchens = visitedKitchens.filter((item) => item !== id)
    }
    // Add ID to the list and set localstorage
    visitedKitchens.unshift(id)
    localStorage.setItem('visited_kitchens', JSON.stringify(visitedKitchens))
  }
}

function KitchenPage() {
  const router = useRouter()
  const { slug } = router.query
  const { data: kitchenData, refetch } = useQuery(KITCHEN_QUERY, {
    variables: { slug },
  })
  const { data: processesData } = useQuery(PROCESSES_QUERY)
  const { modalRef, openModal, closeModal, isModalOpen } = useModal()
  if (kitchenData?.kitchens?.data.length < 1) {
    return <PageNotFound />
  }
  const kitchen = kitchenData?.kitchens?.data[0]
  if (kitchen) {
    addKitchenIdToVisitedList(kitchen.id)
  }
  return (
    <>
      <Head>
        {kitchen.title ? (
          <title>Кухня {kitchen.title}, каталог кухонь Heime</title>
        ) : (
          <title>Heime — Страница кухни</title>
        )}
      </Head>
      <Layout parentSelector="kitchen">
        <div className="container">
          {kitchen && (
            <>
              <KitchenMain
                title={`Кухня ${kitchen.title}`}
                description={kitchen.description}
                price={priceFormat(kitchen.price)}
                priceDiscount={priceFormat(kitchen.discount_price)}
                area={
                  kitchen.price_pm && `${priceFormat(kitchen.price_pm)} за п/м`
                }
                tags={kitchen.tags}
                sliders={kitchen.sliders}
                buttonText={kitchenStatic.main.buttonText}
                id={kitchen.id}
                backContent={kitchenStatic.back.content}
                type="kitchens"
                openModal={openModal}
              />
              <KitchenInfo
                designer={kitchen.designer}
                features={kitchen.features}
                // materials={kitchen.materials}
              />
              {kitchen.composition && (
                <Feature
                  title={kitchenStatic.feature.title}
                  image={kitchen.composition.image}
                  list={kitchen.composition.list}
                  slider={kitchen.composition.slider}
                />
              )}
              {kitchen.case && (
                <HistoryCreate
                  buttonText={kitchenStatic.history.buttonText}
                  kitchenCaseData={kitchen.case}
                  title={kitchen.case.title}
                  summary={kitchen.case.summary}
                  videoReview={kitchen.case.video_review}
                  slug={kitchen.case.slug}
                  client={kitchen.case.client}
                  quote={kitchen.case.kitchen_detail.quote}
                />
              )}
              {kitchen.specifications?.length > 0 && (
                <KitchenSlider
                  title={kitchenStatic.kitchen_slider.title}
                  description={kitchenStatic.kitchen_slider.description}
                  kitchenSpecData={kitchen.specifications}
                />
              )}
              {/* {kitchen.material_slider && (
                <KitchenMaterials data={kitchen.material_slider} />
              )} */}
              {kitchen.related?.length > 0 && (
                <Proposal
                  list={kitchen.related}
                  title={kitchenStatic.proposal.title}
                  buttonText={kitchenStatic.proposal.buttonText}
                  slug={kitchenStatic.proposal.slug}
                  parentSelector="kitchen__proposal"
                />
              )}
            </>
          )}
          {processesData?.processes && (
            <ProcessSlider
              title={kitchenStatic.process_slider.title}
              description={kitchenStatic.process_slider.description}
              buttonText={kitchenStatic.process_slider.buttonText}
              slug={kitchenStatic.process_slider.slug}
              processesData={processesData.processes}
              parentSelector="kitchen__process"
            />
          )}
          <div className="bg bg--gray full-width">
            <Credit data={creditData} parentSelector="main__credit container" />
          </div>
          <Order kitchenId={kitchen.id} />
        </div>
      </Layout>
      <Modal
        className={isModalOpen ? 'modal--active' : ''}
        onClose={closeModal}
        parentSelector="modal-form kitchen-modal"
        ref={modalRef}
      >
        <Order
          kitchenId={kitchen && kitchen.id}
          title={kitchenStatic.modal.title}
          description={`Кухня ${kitchen.title}`}
          expandTitle={kitchenStatic.modal.expandTitle}
          onSubmit={closeModal}
        />
      </Modal>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx)
  const { params } = ctx

  const { data } = await apolloClient.query({
    query: KITCHEN_QUERY,
    variables: { slug: params.slug },
  })
  await apolloClient.query({
    query: PROCESSES_QUERY,
    variables: {},
  })

  if (data?.kitchens?.data.length < 1) {
    await apolloClient.query({
      query: SETTINGS_QUERY,
    })
  }
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default KitchenPage
