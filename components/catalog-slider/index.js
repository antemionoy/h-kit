import { PATH } from 'config/path'
import {
    CardHorizontal,
    CardVertical,
    ControlButton,
    H2,
    P,
    PairButton
} from 'elements'
import { useCallback, useRef } from 'react'
import Swiper from 'react-id-swiper'
import { useSelector } from 'react-redux'
// import './catalog-slider.scss'

function CatalogSlider({ data }) {
  const swiperRef = useRef(null)
  const isDesktop = useSelector((state) => state.breakpoint.isDesktop)

  const swiperParams = {
    slidesPerView: 1,
  }
  const mobileSwiperParams = {
    spaceBetween: 21,
    slidesPerView: 'auto',
    containerClass: 'catalog-slider__swiper-container',
    breakpoints: {
      500: {
        slidesPerView: 2,
        spaceBetween: 32,
      },
    },
  }

  const onSlideChange = useCallback((isNext) => {
    if (swiperRef && swiperRef.current.swiper) {
      if (isNext) {
        swiperRef.current.swiper.slideNext()
      } else {
        swiperRef.current.swiper.slidePrev()
      }
    }
  }, [])

  const [firstKitchen, ...restKitchens] = data.kitchens || []
  const catalogLink = data.link === '#' ? PATH.KITCHENS : data.link

  return (
    <div className="main__catalog-slider catalog-slider">
      <div className="catalog-slider__main">
        <div className="catalog-slider__content">
          <H2 content={data.title} parentSelector="catalog-slider__title" />
          <P
            content={data.description}
            parentSelector="catalog-slider__description"
          />
          <PairButton content={data.button_text} href={catalogLink} />
        </div>
        {isDesktop && data.images && (
          <div className="catalog-slider__preview">
            <Swiper {...swiperParams} ref={swiperRef}>
              {data.images.map((item) => {
                return (
                  <div
                    className="catalog-slider__preview-item"
                    key={item.id}
                    style={{
                      backgroundImage: `url(${item.path.normal})`,
                    }}
                  />
                )
              })}
            </Swiper>
            <div className="catalog-slider__preview-controls">
              <ControlButton
                isGray
                isReverse
                parentSelector="catalog-slider__preview-control"
                onClick={onSlideChange.bind(this, false)}
              />
              <ControlButton
                isGray
                parentSelector="catalog-slider__preview-control"
                onClick={onSlideChange.bind(this, true)}
              />
            </div>
          </div>
        )}
      </div>
      {!isDesktop && (
        <CardHorizontal
          title={firstKitchen.title}
          price={firstKitchen.price}
          priceDiscount={firstKitchen.discount_price}
          src={firstKitchen.preview.path}
          parentSelector="catalog-slider__card"
          href={`${PATH.KITCHEN}/${firstKitchen.slug}`}
          as={`${PATH.KITCHEN}/${firstKitchen.slug}`}
          poster={firstKitchen.poster}
          video={firstKitchen.video}
          id={firstKitchen.id}
          type="kitchens"
        />
      )}
      <div className="catalog-slider__list">
        {isDesktop &&
          data.kitchens.map((item) => (
            <CardVertical
              key={item.id}
              title={item.title}
              price={item.price}
              priceDiscount={item.discount_price}
              src={item.preview.path}
              parentSelector="catalog-slider__list-item"
              href={`${PATH.KITCHEN}/[slug]`}
              as={`${PATH.KITCHEN}/${item.slug}`}
              poster={item.poster}
              video={item.video}
              id={item.id}
              type="kitchens"
            />
          ))}
        {!isDesktop && (
          <Swiper {...mobileSwiperParams}>
            {restKitchens.map((item) => (
              <div className="catalog-slider__list-wrap" key={item.id}>
                <CardVertical
                  title={item.title}
                  price={item.price}
                  priceDiscount={item.discount_price}
                  src={item.preview.path}
                  parentSelector="catalog-slider__list-item"
                  href={`${PATH.KITCHEN}/[slug]`}
                  as={`${PATH.KITCHEN}/${item.slug}`}
                  poster={item.poster}
                  video={item.video}
                  id={item.id}
                  type="kitchens"
                />
              </div>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  )
}

export default CatalogSlider
