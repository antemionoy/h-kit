import { useQuery } from '@apollo/client'
import {
  ProductConfiguration,
  ProductMain,
  ProductProposal,
  ProductVideo,
  Proposal,
  WideSlider,
} from 'components'
import { Layout, Order } from 'containers'
import { initializeApollo } from 'lib/apollo'
import materialStatic from 'config/static/material_countertops'
import Head from 'next/head'
import { useRouter } from 'next/router'
import MATERIAL_QUERY from 'graphql/queries/material/material.graphql'
import { PATH } from 'config/path'
import PageNotFound from '../../404'
import SETTINGS_QUERY from 'graphql/queries/404/settings.graphql'

function CounterTopsPage() {
  const router = useRouter()
  const { slug } = router.query

  const { data: materialData } = useQuery(MATERIAL_QUERY, {
    variables: { slug },
  })

  const material = materialData?.material
  if (!material) {
    return <PageNotFound />
  }
  return (
    <>
      <Head>
        {material.title ? (
          <title>Heime — {material.title}</title>
        ) : (
          <title>Heime — Фасад</title>
        )}
      </Head>
      <Layout>
        {material && (
          <>
            <div className="container materials-coutertops">
              <ProductMain
                id={material.id}
                type={material.type}
                slider={material.colors}
                title={material.title}
                description={material.description}
                colorsTitle={materialStatic.main.colors.title}
                colors={material.colors}
                pageSlug={`${PATH.FACADES}/${slug}`}
                shadesTitle={materialStatic.main.shades.title}
                shades={material.tags}
                shadesPath={`${PATH.MATERIALS}/?group=fasady&tags=`}
                materialsTitle={materialStatic.main.materials.title}
                materials={material.materials}
                advantagesTitle={materialStatic.main.advantages.title}
                advantages={material.features}
                isMaterial
                // back={{
                //   onClick: () =>
                //     router.push({
                //       pathname: PATH.MATERIALS,
                //       query: { group: material.category.slug },
                //     }),
                //   content: materialStatic.main.back.content,
                // }}
                price={material.price}
                priceDiscount={material.discount_price}
              />
              {material.configurations.length > 0 && (
                <ProductConfiguration
                  title={materialStatic.configuration.title}
                  list={material.configurations}
                />
              )}
            </div>
            <Order
              parentSelector="container"
              title={materialStatic.form.title}
              description={materialStatic.form.description}
              hasKitchen={false}
              isGray
              materialId={material.id}
            />
            <div className="container">
              {/* <WideSlider
                parentSelector="product__slider"
                sliders={materialStatic.slider.list}
                title={materialStatic.slider.title}
                description={materialStatic.slider.description}
                note={materialStatic.slider.note}
                card={materialStatic.slider.card}
              /> */}
              {/* <ProductVideo data={materialStatic.video} /> */}
              {material.kitchens && (
                <Proposal
                  list={material.kitchens}
                  title={materialStatic.proposal.title}
                  withoutButton
                />
              )}
              {material.related?.length > 0 && (
                <ProductProposal
                  title={materialStatic.facades.title}
                  type={materialStatic.facades.type}
                  list={material.related}
                  addOptions
                />
              )}
              {material.accessories?.length > 0 && (
                <ProductProposal
                  title={materialStatic.accessories.title}
                  type={materialStatic.accessories.type}
                  list={material.accessories}
                />
              )}
            </div>
          </>
        )}
      </Layout>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { params } = ctx
  const apolloClient = initializeApollo(null, ctx)

  const { data } = await apolloClient.query({
    query: MATERIAL_QUERY,
    variables: { slug: params.slug },
  })
  if (!data?.material) {
    await apolloClient.query({
      query: SETTINGS_QUERY,
    })
  }

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default CounterTopsPage
