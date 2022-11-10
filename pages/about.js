import { useQuery } from '@apollo/client'
import {
  AboutCatalog,
  AboutPhilosophy,
  AboutProduction,
  AboutProvider,
  AboutSmi,
  Preview,
  Team,
  WideSlider,
} from 'components'
import { Layout } from 'containers'
import { initializeApollo } from 'lib/apollo'
import aboutStatic from 'config/static/about'
import Head from 'next/head'
import ABOUT_SLIDERS_QUERY from 'graphql/queries/about/about_sliders.graphql'
import ABOUT_TEAM_QUERY from 'graphql/queries/shared/about_teams.graphql'
import ABOUT_SUPPLIERS_QUERY from 'graphql/queries/about/about_suppliers.graphql'
import ABOUT_MASS_MEDIAS_QUERY from 'graphql/queries/about/about_mass_medias.graphql'
import ABOUT_COLLECTIONS_QUERY from 'graphql/queries/about/about_collections.graphql'
import { PATH } from 'config/path'

function AboutPage() {
  const { data: slidersData } = useQuery(ABOUT_SLIDERS_QUERY)
  const { data: teamData } = useQuery(ABOUT_TEAM_QUERY)
  const { data: suppliersData } = useQuery(ABOUT_SUPPLIERS_QUERY)
  const { data: massMediasData } = useQuery(ABOUT_MASS_MEDIAS_QUERY)
  const { data: collectionsData } = useQuery(ABOUT_COLLECTIONS_QUERY)
  return (
    <>
      <Head>
        <title>О компании Heime</title>
      </Head>
      <Layout parentSelector="main">
        <div className="container">
          {slidersData && (
            <WideSlider
              sliders={slidersData.about_sliders}
              title={aboutStatic.main.title}
              description={aboutStatic.main.description}
              note={aboutStatic.main.note}
              card={aboutStatic.main.card}
              bigTitle
            />
          )}
          <AboutPhilosophy data={aboutStatic.philosophy} />
          <Preview data={aboutStatic.preview} parentSelector="about-preview" />
          <AboutProduction data={aboutStatic.production} />
          {teamData && (
            <Team
              title={aboutStatic.team.title}
              description={aboutStatic.team.description}
              buttonText={aboutStatic.team.buttonText}
              slug={aboutStatic.team.slug}
              list={teamData.about_teams}
            />
          )}
          {suppliersData && (
            <AboutProvider
              parentSelector="bg bg--gray full-width"
              title={aboutStatic.provider.title}
              description={aboutStatic.provider.description}
              list={suppliersData.about_suppliers}
            />
          )}
          {/* {massMediasData && (
            <AboutSmi
              title={aboutStatic.smi.title}
              list={massMediasData.about_mass_medias}
            />
          )} */}
          {collectionsData && (
            <AboutCatalog
              title={aboutStatic.catalog.title}
              buttonText={aboutStatic.catalog.buttonText}
              list={collectionsData.about_collections}
              href={PATH.KITCHENS}
            />
          )}
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx)

  await apolloClient.query({
    query: ABOUT_SLIDERS_QUERY,
    variables: { is_home: true },
  })
  await apolloClient.query({
    query: ABOUT_TEAM_QUERY,
    variables: { is_home: true },
  })
  await apolloClient.query({
    query: ABOUT_SUPPLIERS_QUERY,
    variables: { is_home: true },
  })
  await apolloClient.query({
    query: ABOUT_MASS_MEDIAS_QUERY,
    variables: { is_home: true },
  })
  await apolloClient.query({
    query: ABOUT_COLLECTIONS_QUERY,
    variables: { is_home: true },
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default AboutPage
