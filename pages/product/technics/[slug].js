import { useQuery } from '@apollo/client'
import { Modal, Technic } from 'components'
import technicStatic from 'config/static/technic'
import { Layout, Order } from 'containers'
import SETTINGS_QUERY from 'graphql/queries/404/settings.graphql'
import TECHNIC_QUERY from 'graphql/queries/technic/technic.graphql'
import { useModal } from 'helpers/useModal'
import { initializeApollo } from 'lib/apollo'
import { priceFormat } from 'lib/price'
import Head from 'next/head'
import { useRouter } from 'next/router'
import PageNotFound from '../../404'
function ProductTechnicsPage() {
  const router = useRouter()
  const { slug } = router.query
  const { data: technicData } = useQuery(TECHNIC_QUERY, { variables: { slug } })

  if (technicData?.technics?.data.length < 1) {
    return <PageNotFound />
  }

  const technic = technicData?.technics?.data[0]
  const slider = technic.sliders?.images?.map((i) => {
    return { image: i }
  })

  const { modalRef, openModal, closeModal, isModalOpen } = useModal()
  return (
    <>
      <Head>
        <title>{technic.title ? technic.title : 'Техника'} — Heime</title>
      </Head>
      <Layout>
        {technic && (
          <Technic slider={slider} technic={technic} openModal={openModal} />
        )}
      </Layout>
      <Modal
        className={
          isModalOpen ? 'modal--active technic-modal' : 'technic-modal'
        }
        onClose={closeModal}
        parentSelector="modal-form product-modal"
        ref={modalRef}
      >
        <Order
          hasKitchen={false}
          title={technicStatic.modal.title}
          description={technic.title}
          technicId={technic.id}
          price={priceFormat(technic.discount_price || technic.price)}
          onSubmit={closeModal}
        />
      </Modal>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { query } = ctx
  const apolloClient = initializeApollo(null, ctx)
  const { data } = await apolloClient.query({
    query: TECHNIC_QUERY,
    variables: { slug: query.slug },
  })

  if (data?.technics?.data.length < 1) {
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

export default ProductTechnicsPage
