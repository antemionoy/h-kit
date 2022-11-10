import { ProductMain, ProductProposal, WideSlider } from 'components'
import { PATH } from 'config/path'
import technicStatic from 'config/static/technic'
import { useRouter } from 'next/router'
import React from 'react'
const Technic = ({ technic, slider, openModal }) => {
  const router = useRouter()
  return (
    <div className="container technic">
      <ProductMain
        id={technic.id}
        type={technic.type}
        title={technic.title}
        description={technic.description}
        advantagesTitle={technicStatic.main.advantages.title}
        advantages={technic.features}
        specifications={JSON.parse(technic.specifications)}
        specificationsTitle={technicStatic.main.specifications.title}
        slider={technic.images}
        buttonText={technicStatic.main.buttonText}
        price={technic.price}
        priceDiscount={technic.discount_price}
        onButtonClick={openModal}
        back={{
          onClick: () =>
            router.push({
              pathname: PATH.TECHNICS,
              query: { group: technic.category.slug },
            }),
          content: technicStatic.main.back.content,
        }}
      />
      {slider?.length > 0 && (
        <WideSlider
          parentSelector="product__slider"
          sliders={slider}
          title={technic.sliders?.title}
          description={technic.sliders?.description}
        />
      )}
      {technic.related?.length > 0 && (
        <ProductProposal
          title={technicStatic.maylike.title}
          type={technicStatic.maylike.type}
          list={technic.related}
          addOptions
        />
      )}
      {technic.accessories?.length > 0 && (
        <ProductProposal
          title={technicStatic.accessories.title}
          type={technicStatic.accessories.type}
          list={technic.accessories}
        />
      )}
    </div>
  )
}

export default Technic
