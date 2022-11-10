import { PATH } from 'config/path'
import { CardProduction, ControlButton, H2, PairButton } from 'elements'
import { useCallback, useRef } from 'react'
import Swiper from 'react-id-swiper'
import { useSelector } from 'react-redux'

function ProductionSlider({ title, buttonText, productionsData }) {
  const isMobile = useSelector((state) => state.breakpoint.isMobile)
  const swiperRef = useRef(null)

  const swiperParams = {
    spaceBetween: 16,
    slidesPerView: 'auto',
    containerClass: 'production-slider__swiper-container',
    slideToClickedSlide: true,
    breakpoints: {
      769: {
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
  return (
    <div className="main__production-slider production-slider">
      <div className="production-slider__content">
        <H2 content={title} parentSelector="production-slider__title" />
        {!isMobile && (
          <div className="production-slider__controls">
            <ControlButton
              isReverse
              parentSelector="production-slider__control"
              onClick={onSlideChange.bind(this, false)}
            />
            <ControlButton
              parentSelector="production-slider__control"
              onClick={onSlideChange.bind(this, true)}
            />
          </div>
        )}
      </div>
      <div className="production-slider__swiper">
        <Swiper {...swiperParams} ref={swiperRef}>
          {productionsData.map((item) => (
            <div className="production-slider__item-wrap" key={item.id}>
              <CardProduction
                description={item.description}
                src={item.image.path}
                parentSelector="production-slider__item"
              />
            </div>
          ))}
        </Swiper>
      </div>
      <PairButton content={buttonText} href={PATH.PRODUCTION} />
    </div>
  )
}

export default ProductionSlider
