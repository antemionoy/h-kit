import { Guarantee } from 'components'
import { Layout } from 'containers'
import { initializeApollo } from 'lib/apollo'
import guaranteeStatic from 'config/static/guarantee'
import Head from 'next/head'

function GuaranteePage() {
  return (
    <>
      <Head>
        <title>{guaranteeStatic.title}</title>
      </Head>
      <Layout>
        <Guarantee data={guaranteeStatic} />
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

export default GuaranteePage
