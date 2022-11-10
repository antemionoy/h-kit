import staticCareer from 'config/static/career'
import { ControlButton, H2, H4 } from 'elements'
import { useCallback, useRef } from 'react'
import Swiper from 'react-id-swiper'
const index = () => {
  const { partnership } = staticCareer
  const swiperRef = useRef(null)

  const swiperParams = {
    slidesPerView: 1,
    spaceBetween: 40,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      769: { slidesPerView: 2 },
      1279: {
        slidesPerView: 1,
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
    <div className="career__partnership">
      <H2
        content={partnership.title}
        parentSelector="career__partnership-title"
      />
      <div className="career__partnership-content">
        <div className="career__partnership-slider">
          <Swiper {...swiperParams} ref={swiperRef} shouldSwiperUpdate>
            {partnership.slider.map((item) => {
              return (
                <div
                  className="career__partnership-slider-item"
                  key={item.id}
                  style={{
                    backgroundImage: `url(${item.normal})`,
                  }}
                />
              )
            })}
          </Swiper>

          <div className="career__partnership-controls">
            <ControlButton
              isReverse
              parentSelector="career__partnership-control"
              onClick={onSlideChange.bind(this, false)}
            />
            <ControlButton onClick={onSlideChange.bind(this, true)} />
          </div>
        </div>
        <div className="career__partnership-data">
          {partnership.reasons.map((reason, i) => (
            <div className="career__partnership-reasons" key={i}>
              <H4
                content={reason.title}
                parentSelector="career__partnership-title"
              />
              <p className="p career__partnership-par">{reason.text}</p>
            </div>
          ))}
          <div className="career__partnership-reasons" />
        </div>
      </div>
    </div>
  )
}

export default index
