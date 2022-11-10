import { useQuery } from '@apollo/client'
import { ProductMain, ProductProposal, WideSlider, Modal } from 'components'
import { Layout, Order } from 'containers'
import { initializeApollo } from 'lib/apollo'
import sinkStatic from 'config/static/sink'
import Head from 'next/head'
import SINK_QUERY from 'graphql/queries/sink/sink.graphql'
import { useRouter } from 'next/router'
import { useModal } from 'helpers/useModal'
import { priceFormat } from 'lib/price'
import { PATH } from 'config/path'
import PageNotFound from '../../404'
import SETTINGS_QUERY from 'graphql/queries/404/settings.graphql'
function ProductSinksPage() {
  const router = useRouter()
  const { slug } = router.query
  const { data: sinksData } = useQuery(SINK_QUERY, { variables: { slug } })
  const { modalRef, openModal, closeModal, isModalOpen } = useModal()

  if (sinksData?.sinks?.data.length < 1) {
    return <PageNotFound />
  }

  const sink = sinksData?.sinks?.data[0]
  const slider = sink.sliders?.images?.map((i) => {
    return { image: i }
  })

  return (
    <>
      <Head>
        <title>{sink.title ? sink.title : 'Мойки и смесители'} — Heime</title>
      </Head>
      <Layout>
        {sink && (
          <div className="container">
            <ProductMain
              id={sink.id}
              type={sink.type}
              title={sink.title}
              description={sink.description}
              advantagesTitle={sinkStatic.main.advantages.title}
              advantages={sink.features}
              specifications={JSON.parse(sink.specifications)}
              specificationsTitle={sinkStatic.main.specifications.title}
              slider={sink.images}
              buttonText={sinkStatic.main.buttonText}
              price={sink.price}
              priceDiscount={sink.discount_price}
              onButtonClick={openModal}
              back={{
                onClick: () =>
                  router.push({
                    pathname: PATH.SINKS,
                    query: { group: sink.category.slug },
                  }),
                content: sinkStatic.main.back.content,
              }}
            />
            {slider?.length > 0 && (
              <WideSlider
                parentSelector="product__slider"
                sliders={slider}
                title={sink.sliders.title}
                description={sink.sliders.description}
              />
            )}
            {sink.related?.length > 0 && (
              <ProductProposal
                title={sinkStatic.maylike.title}
                type={sinkStatic.maylike.type}
                list={sink.related}
                addOptions
              />
            )}
            {sink.accessories?.length > 0 && (
              <ProductProposal
                title={sinkStatic.accessories.title}
                type={sinkStatic.accessories.type}
                list={sink.accessories}
              />
            )}
          </div>
        )}
      </Layout>
      <Modal
        className={isModalOpen ? 'sink-modal modal--active' : 'sink-modal'}
        onClose={closeModal}
        parentSelector="modal-form product-modal"
        ref={modalRef}
      >
        <Order
          hasKitchen={false}
          title={sinkStatic.modal.title}
          description={sink.title}
          price={priceFormat(sink.discount_price || sink.price)}
          sinkId={sink.id}
          onSubmit={closeModal}
        />
      </Modal>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { query } = ctx
  const apolloClient = initializeApollo(null, ctx)

  const { data: sinksData } = await apolloClient.query({
    query: SINK_QUERY,
    variables: { slug: query.slug },
  })

  if (sinksData?.sinks?.data.length < 1) {
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

export default ProductSinksPage
