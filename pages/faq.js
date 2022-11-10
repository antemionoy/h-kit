import { useQuery } from '@apollo/client'
import { Faq } from 'components'
import { Layout } from 'containers'
import { initializeApollo } from 'lib/apollo'
import faqStatic from 'config/static/faq'
import Head from 'next/head'
import FAQS_QUERY from 'graphql/queries/faq/faqs.graphql'

function FaqPage() {
  const { data: faqData } = useQuery(FAQS_QUERY)

  return (
    <>
      <Head>
        <title>{faqStatic.title}</title>
      </Head>
      <Layout>
        {faqData?.faqs && (
          <Faq
            title={faqStatic.title}
            text={faqStatic.text}
            list={faqData.faqs}
            form={faqStatic.form}
          />
        )}
      </Layout>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx)

  await apolloClient.query({
    query: FAQS_QUERY,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default FaqPage
