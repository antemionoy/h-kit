import React from 'react'
import { Policy } from 'components'
import { Layout } from 'containers'
import staticPolicy from 'config/static/policy'
import Head from 'next/head'

const PolicyPage = () => {
  return (
    <>
      <Head>
        <title>{staticPolicy.title} — Heime</title>
      </Head>
      <Layout>
        <Policy />
      </Layout>
    </>
  )
}

export default PolicyPage
