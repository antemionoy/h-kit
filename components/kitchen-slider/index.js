import { CardProduction, ControlButton, H2, P } from 'elements'
import { useCallback, useRef } from 'react'
import Swiper from 'react-id-swiper'
import { useSelector } from 'react-redux'

function KitchenSlider({ title, description, kitchenSpecData }) {
  const isMobile = useSelector((state) => state.breakpoint.isMobile)
  const swiperRef = useRef(null)

  const swiperParams = {
    spaceBetween: 32,
    slidesPerView: 'auto',
    containerClass: 'kitchen-slider__swiper-container',
    slideToClickedSlide: true,
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
    <div className="kitchen__kitchen-slider kitchen-slider">
      <H2 content={title} parentSelector="kitchen-slider__title" />
      <div className="kitchen-slider__content">
        <P content={description} parentSelector="kitchen-slider__description" />
        {!isMobile && (
          <div className="kitchen-slider__controls">
            <ControlButton
              isReverse
              parentSelector="kitchen-slider__control"
              onClick={onSlideChange.bind(this, false)}
            />
            <ControlButton
              parentSelector="kitchen-slider__control"
              onClick={onSlideChange.bind(this, true)}
            />
          </div>
        )}
      </div>
      <div className="kitchen-slider__swiper">
        <Swiper {...swiperParams} ref={swiperRef}>
          {kitchenSpecData.map((item) => (
            <div className="kitchen-slider__item-wrap" key={item.id}>
              <CardProduction
                title={item.title}
                description={item.description}
                src={item.image.path}
                parentSelector="kitchen-slider__item"
              />
            </div>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default KitchenSlider
