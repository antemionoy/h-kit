import { useQuery } from '@apollo/client'
import { Delivery } from 'components'
import deliveryStatic from 'config/static/delivery'
import { Layout } from 'containers'
import CITIES_QUERY from 'graphql/queries/cities.graphql'
import CONTACTS_QUERY from 'graphql/queries/contacts/contacts.graphql'
import DELIVERY_QUERY from 'graphql/queries/deliveries.graphql'
import { initializeApollo } from 'lib/apollo'
import nextCookies from 'next-cookies'
import Head from 'next/head'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

function DeliveryPage() {
  const { activeContact } = useSelector((state) => state)
  const { data: deliveryData, refetch } = useQuery(DELIVERY_QUERY, {
    context: {
      headers: {
        'X-City': activeContact['x-city'],
      },
    },
  })

  useEffect(() => {
    refetch()
  }, [activeContact])
  return (
    <>
      <Head>
        <title>{deliveryStatic.title}</title>
      </Head>
      <Layout>
        <Delivery
          data={deliveryStatic}
          deliveryData={deliveryData?.deliveries || []}
        />
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const apolloClient = initializeApollo(null, context)
  const contacts = await apolloClient.query({
    query: CONTACTS_QUERY,
  })
  const cities = await apolloClient.query({
    query: CITIES_QUERY,
  })
  const contactsData = contacts?.data?.contacts.map((contact, i) => {
    const city = cities.data.cities.filter((city) => city.name === contact.city)
    return (
      city.length > 0 && {
        ...contact,
        'x-city': city[0].slug,
      }
    )
  })
  const activeContact = nextCookies(context).city || contactsData[0]
  await apolloClient.query({
    query: DELIVERY_QUERY,
    context: {
      headers: {
        'X-City': activeContact['x-city'],
      },
    },
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default DeliveryPage
