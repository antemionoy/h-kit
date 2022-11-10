import { ProductProposal, Proposal } from 'components'
import materialStatic from 'config/static/material_fittings'
import { Order } from 'containers'
import { ControlButton, H1, H2, Image, PairButton } from 'elements'
import { checkFavorite, toggleFavorite } from 'helpers'
import IconLike from 'public/icons/favorite-icon.svg'
import Icon from 'public/icons/info-ok-icon.svg'
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import Swiper from 'react-id-swiper'
import { useSelector } from 'react-redux'

const Slider = memo(({ swiperParams, swiperRef, material, title }) => (
  <Swiper {...swiperParams} ref={swiperRef} shouldSwiperUpdate>
    {material.colors.map((item) => {
      return (
        <div key={item.image.id} className="fitting__header-slider-item">
          <img
            src={item.image.path.normal}
            srcSet={`${item.image.path.normal} 1x, ${item.image.path.retina} 2x`}
            alt={title}
          />
        </div>
      )
    })}
  </Swiper>
))
const Fitting = ({ material, data, back = false }) => {
  const { title } = material
  const swiperRef = useRef(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const { isMobile } = useSelector((state) => state.breakpoint)
  const swiperParams = useMemo(
    () => ({
      slidesPerView: 1,
      loop: true,
      loopedSlides: material.colors?.length,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      rebuildOnUpdate: true,
    }),
    []
  )

  const onSlideChange = useCallback((isNext) => {
    if (swiperRef && swiperRef.current.swiper) {
      if (isNext) {
        swiperRef.current.swiper.slideNext()
      } else {
        swiperRef.current.swiper.slidePrev()
      }
    }
  }, [])

  useEffect(() => {
    setIsFavorite(checkFavorite(material.id, material.type))
  }, [])

  const handleFavoriteClick = () => {
    toggleFavorite(material.id, material.type)
    setIsFavorite(!isFavorite)
  }
  return (
    <div className="fitting container">
      <div className="fitting__header">
        <div className="fitting__header-descr">
          {back && !isMobile && (
            <PairButton
              isBack={true}
              content={back.content}
              parentSelector="fitting__back"
              onClick={back.onClick}
            />
          )}
          {!isMobile && <H1 parentSelector="h2" content={material.title} />}

          {material.description && (
            <div className="fitting__header-description p">
              {material.description}
            </div>
          )}
          <div className="fitting__header-specifications">
            {material.features.map((feature, i) => (
              <div className="fitting__header-specification p" key={i}>
                <Icon />
                {feature}
              </div>
            ))}
          </div>
          {material?.materials.length > 0 && (
            <div className="fitting__header-materials">
              <H2
                content="Материалы"
                parentSelector="fitting__header-materials-title h4"
              />
              <div className="p">
                {material.materials.map((material, i, materials) =>
                  i < materials.length - 1 ? `${material}, ` : material
                )}
              </div>
            </div>
          )}

          {material.priceDiscount && material.price && (
            <p className="product-main__price-old">{material.price}</p>
          )}
          {material.price && (
            <H2
              parentSelector="product-main__price"
              content={`${material.priceDiscount || material.price} ₽`}
            />
          )}
        </div>
        <div className="fitting__header-slider">
          {!isMobile && (
            <ControlButton
              isReverse
              parentSelector="fitting__header-control"
              onClick={onSlideChange.bind(this, false)}
            />
          )}
          {!isMobile && (
            <ControlButton
              parentSelector="fitting__header-control fitting__header-control-next"
              onClick={onSlideChange.bind(this, true)}
            />
          )}
          <Slider
            material={material}
            swiperParams={swiperParams}
            swiperRef={swiperRef}
            title={title}
          />
        </div>
        {isMobile && (
          <>
            <H1
              content={material.title}
              parentSelector="fitting__header-title-mob"
            />

            <PairButton
              isBack={true}
              content={back.content}
              parentSelector="fitting__back"
              onClick={back.onClick}
            />
          </>
        )}
        <div
          className={`fitting__header-like fav fav--inverted ${
            isFavorite ? 'fav--active' : ''
          }`}
          onClick={handleFavoriteClick}
        >
          <IconLike />
        </div>
      </div>
      {/* <WideSlider
        parentSelector="fitting__slider"
        sliders={data.wideSlider.slidesList}
        title={data.wideSlider.title}
        description={data.wideSlider.description}
        note={data.wideSlider.note}
        card={data.wideSlider.card}
      /> */}
      {/* <ProductVideo data={data.videoBlock} /> */}

      {material?.kitchens && material?.kitchens.length > 0 && (
        <Proposal
          list={material.kitchens}
          title={data.material.kitchens.title}
          withoutButton
        />
      )}
      {material?.related && material.related.length > 0 && (
        <ProductProposal
          title={materialStatic.facades.title}
          type={materialStatic.facades.type}
          list={material.related}
          addOptions
        />
      )}
      {material?.accessories && material.accessories.length > 0 && (
        <ProductProposal
          title={materialStatic.accessories.title}
          type={materialStatic.accessories.type}
          list={material.accessories}
        />
      )}
      <Order
        title={data.form.title}
        description={data.form.text}
        hasKitchen={false}
        materialId={material.id}
      />
    </div>
  )
}

export default Fitting
