import { Payment } from 'components'
import { Layout } from 'containers'
import { initializeApollo } from 'lib/apollo'
import staticPayment from 'config/static/payment'
import Head from 'next/head'

function PaymentPage() {
  return (
    <>
      <Head>
        <title>Информация об оплате — Heime</title>
      </Head>
      <Layout>
        <Payment data={staticPayment} />
      </Layout>
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

export default PaymentPage
