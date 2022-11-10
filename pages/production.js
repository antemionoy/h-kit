import { useQuery } from '@apollo/client'
import {
  Preview,
  ProcessSlider,
  ProductionCertificate,
  ProductionEnvironment,
  ProductionMain,
  ProductionWorth,
  Team,
} from 'components'
import { Layout, Order } from 'containers'
import { initializeApollo } from 'lib/apollo'
import productionStatic from 'config/static/production'
import Head from 'next/head'
import PRODUCTION_PROCESSES_QUERY from 'graphql/queries/production/production_processes.graphql'
import CERTIFICATES_QUERY from 'graphql/queries/production/certificates.graphql'
import ENVIRONMENTS_QUERY from 'graphql/queries/production/environments.graphql'
import ABOUT_TEAM_QUERY from 'graphql/queries/shared/about_teams.graphql'
import { PATH } from 'config/path'

function ProductionPage() {
  const { data: prodProcessesData } = useQuery(PRODUCTION_PROCESSES_QUERY)
  const { data: certificatesData } = useQuery(CERTIFICATES_QUERY)
  // const { data: environmentsData } = useQuery(ENVIRONMENTS_QUERY)
  const { data: teamData } = useQuery(ABOUT_TEAM_QUERY)

  return (
    <>
      <Head>
        <title>Наше производство — Heime</title>
      </Head>
      <Layout>
        <div className="container">
          <ProductionMain data={productionStatic.main} />
          <ProcessSlider
            title={productionStatic.process.title}
            description={productionStatic.process.description}
            processesData={prodProcessesData.production_processes}
            parentSelector="production__process"
          />
          <ProductionWorth data={productionStatic.worth} />
          {/* <Preview
            data={productionStatic.preview}
            parentSelector="production__preview"
          /> */}
          {certificatesData?.certificates && (
            <ProductionCertificate
              title={productionStatic.certificate.title}
              description={productionStatic.certificate.description}
              marks={productionStatic.certificate.marks}
              list={certificatesData.certificates}
            />
          )}
          {/* {environmentsData?.environments && (
            <ProductionEnvironment
              title={productionStatic.environment.title}
              description={productionStatic.environment.description}
              list={environmentsData.environments}
              note={productionStatic.environment.note}
              card={productionStatic.environment.card}
            />
          )} */}
          {teamData?.about_teams && (
            <Team
              title={productionStatic.team.title}
              description={productionStatic.team.description}
              buttonText={productionStatic.team.buttonText}
              slug={PATH.VACANCY}
              list={teamData?.about_teams}
            />
          )}
          <Order />
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx)

  await apolloClient.query({
    query: PRODUCTION_PROCESSES_QUERY,
  })
  await apolloClient.query({
    query: CERTIFICATES_QUERY,
  })
  // await apolloClient.query({
  //   query: ENVIRONMENTS_QUERY,
  // })
  await apolloClient.query({
    query: ABOUT_TEAM_QUERY,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default ProductionPage
