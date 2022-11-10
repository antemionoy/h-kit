import { ControlButton, H2, H4, Image, P } from 'elements'
import { useCallback, useEffect, useRef, useState } from 'react'
import Swiper from 'react-id-swiper'
import { useSelector } from 'react-redux'

function CaseStages({ title, list = [] }) {
  const isMobile = useSelector((state) => state.breakpoint.isMobile)
  const [currentSlide, setCurrentSlide] = useState(0)
  const swiperRef = useRef(null)
  const swiperImagesRef = useRef(null)

  useEffect(() => {
    try {
      swiperRef.current.swiper.controller.control =
        swiperImagesRef.current.swiper
      swiperImagesRef.current.swiper.controller.control =
        swiperRef.current.swiper
    } catch (e) {}
  }, [])

  const swiperParams = {
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    on: {
      slideChange: () => {
        try {
          setCurrentSlide(swiperRef.current.swiper.activeIndex)
        } catch (e) {}
      },
    },
  }
  const swiperImagesParams = {
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
    <div className="case-stages">
      <H2 content={title} parentSelector="case-stages__title" />
      <div className="case-stages__images">
        <Swiper {...swiperImagesParams} ref={swiperImagesRef}>
          {list.map((item) => (
            <div key={item.image.id} className="case-stages__image">
              <Image 
                src={item.image.path.normal}
                srcSet={`${item.image.path.normal} 1x, ${item.image.path.retina} 2x`}
                alt={item.title}
              />
            </div>
          ))}
        </Swiper>
        <div className="case-stages__counter">
          {currentSlide + 1}/{list.length}
        </div>
      </div>
      <div className="case-stages__swiper">
        {!isMobile && (
          <div className="case-stages__controls">
            <ControlButton
              isReverse
              parentSelector="case-stages__control"
              onClick={onSlideChange.bind(this, false)}
            />
            <ControlButton
              parentSelector="case-stages__control"
              onClick={onSlideChange.bind(this, true)}
            />
          </div>
        )}
        <Swiper {...swiperParams} ref={swiperRef}>
          {list.map((item) => {
            return (
              <div className="case-stages__item" key={item.image.id}>
                <H4
                  parentSelector="case-stages__subtitle"
                  content={item.title}
                />
                <P
                  parentSelector="case-stages__description"
                  content={item.description}
                />
              </div>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}

export default CaseStages
