import { Preview } from 'components'
import staticCareer from 'config/static/career'
import { ControlButton, H2 } from 'elements'
import React, { useCallback, useRef } from 'react'
import Swiper from 'react-id-swiper'

const CareerHistory = () => {
  const { history } = staticCareer
  const swiperRef = useRef(null)

  const swiperParams = {
    slidesPerView: 1,
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
    <div className="career__history">
      <H2 content={history.title} />
      <p className="p career__history-text">{history.text}</p>
      <div className="career__history-slider">
        <div className="career__history-controls">
          <ControlButton
            isReverse
            parentSelector="career__partnership-control"
            onClick={onSlideChange.bind(this, false)}
          />
          <ControlButton onClick={onSlideChange.bind(this, true)} />
        </div>
        <Swiper {...swiperParams} ref={swiperRef} shouldSwiperUpdate>
          {history.slider.map((item) => {
            return (
              <div key={item.id}>
                <Preview
                  data={item}
                  parentSelector="career__history-slider-item"
                />
                <div className="container">
                  <div className="career__history-story">
                    {item.story.split('\n').map((p, i) => (
                      <p className="p" key={i}>
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}

export default CareerHistory
