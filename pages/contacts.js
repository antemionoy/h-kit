import { useQuery } from '@apollo/client'
import { Contacts } from 'components'
import { Layout } from 'containers'
import { initializeApollo } from 'lib/apollo'
import contactsStatic from 'config/static/contacts'
import Head from 'next/head'
import CONTACTS_QUERY from 'graphql/queries/contacts/contacts.graphql'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import { useDispatch } from 'react-redux'

import * as actions from 'redux/actions'
import { useRouter } from 'next/router'

function ContactsPage() {
  const { data: contactsData } = useQuery(CONTACTS_QUERY)
  const { query } = useRouter()

  const { activeContact } = useSelector((state) => state)
  const [defaultCity, setDefaultCity] = useState(null)
  useEffect(() => {
    setDefaultCity(activeContact.slug)
  }, [activeContact])
  const dispatch = useDispatch()
  const onSetActiveCity = (contact) => {
    Cookies.set('city', JSON.stringify(activeContact), { expires: 7 })
    dispatch(actions.setActiveContact(contact))
  }
  useEffect(() => {
    const tag = contactsData.contacts.filter((item) => item.slug === query.tags)
    if (tag.length > 0) {
      onSetActiveCity(tag[0])
    }
  }, [query.tags])

  return (
    <>
      <Head>
        <title>{contactsStatic.title}</title>
      </Head>
      <Layout>
        <Contacts
          listTitles={contactsStatic.contacts}
          data={contactsData.contacts}
          title={contactsStatic.title}
          text={contactsStatic.text}
          map={contactsStatic.map}
          form={contactsStatic.form}
          defaultCity={defaultCity}
          onSetActiveCity={onSetActiveCity}
        />
      </Layout>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx)

  await apolloClient.query({
    query: CONTACTS_QUERY,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default ContactsPage
