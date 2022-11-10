import React from 'react'
import staticCareer from 'config/static/career'
import Head from 'next/head'
import { Layout } from 'containers'
import { Career } from 'components'
import { useQuery } from '@apollo/client'
import { initializeApollo } from 'lib/apollo'
import VACANCIES_QUERY from 'graphql/queries/vacancies/vacancies.graphql'
import CAREER_VIDEO from 'graphql/queries/career_video.graphql'

const CareerPage = () => {
  const { data: vacanciesData } = useQuery(VACANCIES_QUERY)
  const { data: videoData } = useQuery(CAREER_VIDEO)
  return (
    <>
      <Head>
        <title>{staticCareer.title}</title>
      </Head>
      <Layout>
        <Career video={videoData?.settings} cities={vacanciesData.vacancies} />
      </Layout>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { query } = ctx
  const apolloClient = initializeApollo(null, ctx)
  await apolloClient.query({ query: VACANCIES_QUERY })
  await apolloClient.query({ query: CAREER_VIDEO })
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default CareerPage
