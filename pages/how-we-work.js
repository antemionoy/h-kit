import {
  Categories,
  Modal,
  ProccessMain,
  ProccesStep7,
  ProcessStep1,
  ProcessStep10,
  ProcessStep2,
  ProcessStep3,
  ProcessStep4,
  ProcessStep5,
  ProcessStep8,
  ProcessStep9,
} from 'components'
import howWeWorkStatic from 'config/static/how-we-work'
import { Layout, Order } from 'containers'
import { useModal } from 'helpers/useModal'
import { initializeApollo } from 'lib/apollo'
import Head from 'next/head'

function HowWeWorkPage() {
  const { modalRef, openModal, closeModal, isModalOpen } = useModal()
  return (
    <>
      <Head>
        <title>Как мы работаем — Heime</title>
      </Head>
      <Layout parentSelector="main">
        <div className="container">
          <ProccessMain data={howWeWorkStatic.main} />
          <ProcessStep1 data={howWeWorkStatic.step1} />
          <ProcessStep2 data={howWeWorkStatic.step2} onClick={openModal} />
          <ProcessStep3 data={howWeWorkStatic.step3} />
          <ProcessStep4 data={howWeWorkStatic.step4} />
          <ProcessStep5 data={howWeWorkStatic.step5} />
          <Categories
            data={howWeWorkStatic.step6}
            parentSelector="process__categories"
          />
          <div className="bg bg--gray full-width">
            <ProccesStep7
              data={howWeWorkStatic.step7}
              parentSelector="container"
            />
          </div>
          <ProcessStep8 data={howWeWorkStatic.step8} />
          <ProcessStep9 data={howWeWorkStatic.step9} />
          <ProcessStep10 data={howWeWorkStatic.step10} />
          <Order />
        </div>
      </Layout>

      <Modal
        className={isModalOpen ? 'modal--active' : ''}
        onClose={closeModal}
        parentSelector="modal-form kitchen-modal step-2__modal"
        ref={modalRef}
      >
        <Order
          hasKitchen={false}
          title={howWeWorkStatic.step2.order.title}
          description={howWeWorkStatic.step2.order.caption}
          onSubmit={closeModal}
        />
      </Modal>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx)
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default HowWeWorkPage
