import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  CaseHeroes,
  CaseMain,
  CaseStages,
  CaseVideo,
  CaseViews,
  Feature,
  Toast,
} from 'components'
import { Layout, Order, Sharing } from 'containers'
import CASES_QUERY from 'graphql/queries/cases/cases.graphql'
import { initializeApollo } from 'lib/apollo'
import caseStatic from 'config/static/case'
import Head from 'next/head'
import { PATH } from 'config/path'
import PageNotFound from '../../404'
import SETTINGS_QUERY from 'graphql/queries/404/settings.graphql'

export default function CasesPage({ casePath }) {
  const router = useRouter()
  const { slug } = router.query
  const [toast, setToast] = useState({
    show: false,
    text: 'Не удалось отправить, попробуйте позже',
  })

  const {
    data: casesData,
    error: casesError,
    loading: casesLoading,
  } = useQuery(CASES_QUERY, {
    variables: { slug },
  })

  if (casesLoading) return 'Loading...'
  if (casesError) return `Error!`

  const cases = casesData?.cases?.data[0]

  if (casesData?.cases?.data.length < 1) {
    return <PageNotFound />
  }

  return (
    <>
      <Head>
        <title>Heime — Кейс</title>
        <meta property="og:type" content="website" />
        <meta property="og:url" content={casePath} />
        <meta property="og:title" content={cases.title} />
        <meta property="og:description" content={cases.summary} />
        <meta property="og:image" content={cases.detail_image.path.normal} />
        <meta property="og:locale" content="ru_RU" />

        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content={casePath} />
        <meta property="twitter:title" content={cases.title} />
        <meta property="twitter:description" content={cases.summary} />
        <meta
          property="twitter:image"
          content={cases.detail_image.path.normal}
        />
      </Head>
      <Layout parentSelector="cases">
        <div className="container">
          {cases && (
            <>
              <CaseMain
                back={{
                  onClick: () =>
                    router.push({
                      pathname: PATH.IDEAS,
                      query: { tags: 'cases' },
                    }),
                  content: caseStatic.main.back.content,
                }}
                title={cases.title}
                description={cases.summary}
                tags={cases.tags}
                src={cases.detail_image.path}
                subtitle={caseStatic.main.subtitle}
                list={cases.about}
              />
              {cases.hero && (
                <CaseHeroes
                  title={caseStatic.heroes.title}
                  text={cases.hero.text}
                  leftImage={cases.hero.left_image}
                  rightImage={cases.hero.right_image}
                />
              )}
              {cases.video_review && (
                <CaseVideo
                  title={cases.video_review.title}
                  description={cases.video_review.description}
                  video={cases.video_review.video}
                  image={cases.video_review.video.image}
                />
              )}
              {cases.processes && (
                <CaseStages
                  title={caseStatic.stages.title}
                  list={cases.processes}
                />
              )}
              {cases.overview && (
                <CaseViews
                  title={cases.overview.title}
                  description={cases.overview.description}
                  src={cases.overview.image.path}
                  list={cases.overview.items}
                />
              )}
              {cases.blocks &&
                cases.blocks.length > 0 &&
                cases.blocks.map((block) => {
                  return (
                    <Feature
                      key={block.title}
                      data={caseStatic.feature1}
                      title={block.title}
                      description={block.description}
                      quote={block.quote}
                      card={cases.client || null}
                      image={block.image}
                      list={block.compositions}
                      slider={block[block.type]}
                      parentSelector="cases__feature"
                    />
                  )
                })}
            </>
          )}
        </div>
        <Sharing
          content={caseStatic.share}
          path={casePath}
          setToast={setToast}
        />
        <Order parentSelector="container" />
        <Toast
          text={toast.text}
          isShown={toast.show}
          setIsShown={(show) => {
            setToast({ ...toast, show })
          }}
        />
      </Layout>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { query } = ctx
  const apolloClient = initializeApollo(null, ctx)

  const casePath = `${process.env.NEXT_PUBLIC_HOST}${PATH.CASES}/${query.slug}`
  const { data: casesData } = await apolloClient.query({
    query: CASES_QUERY,
    variables: { slug: query.slug },
  })

  if (casesData?.cases?.data.length < 1) {
    await apolloClient.query({
      query: SETTINGS_QUERY,
    })
  }

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      casePath,
    },
  }
}
