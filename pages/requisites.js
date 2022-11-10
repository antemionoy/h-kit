import { useQuery } from '@apollo/client'
import { Requisites } from 'components'
import staticRequisites from 'config/static/requisites'
import { Layout } from 'containers'
import CITIES_QUERY from 'graphql/queries/cities.graphql'
import CONTACTS_QUERY from 'graphql/queries/contacts/contacts.graphql'
import REQUISITES_QUERY from 'graphql/queries/requisites.graphql'
import { initializeApollo } from 'lib/apollo'
import nextCookies from 'next-cookies'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const RequisitesPage = () => {
  const { activeContact } = useSelector((state) => state)
  const { data: requisitesData, refetch } = useQuery(REQUISITES_QUERY, {
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
        <title>Реквизиты компании — Heime</title>
      </Head>
      <Layout>
        <Requisites data={requisitesData?.props || []} />
      </Layout>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx)

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
  const activeContact = nextCookies(ctx).city || contactsData[0]

  await apolloClient.query({
    query: REQUISITES_QUERY,
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

export default RequisitesPage
