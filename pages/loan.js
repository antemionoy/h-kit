import React from 'react'
import { Loan } from 'components'
import { Layout } from 'containers'
import Head from 'next/head'
import loanStatic from 'config/static/loan'

const LoanPage = () => {
  return (
    <>
      <Head>
        <title>{loanStatic.title}</title>
      </Head>
      <Layout>
        <Loan data={loanStatic} />
      </Layout>
    </>
  )
}

export default LoanPage
