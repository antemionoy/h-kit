import { ControlButton, H2, Image, P } from 'elements'
import { useCallback, useRef } from 'react'
import Swiper from 'react-id-swiper'
import { useSelector } from 'react-redux'

function getNext(window, current, list) {
  const { min } = Math
  if (window.innerWidth >= 1280) {
    return min(current.activeIndex + 3, list.length - 1)
  }
  if (window.innerWidth >= 768 && window.innerWidth < 1280) {
    return min(current.activeIndex + 2, list.length - 1)
  }
  return min(current.activeIndex + 1, list.length - 1)
}
function getPrev(window, current) {
  const { max } = Math
  if (window.innerWidth >= 1280) {
    return max(current.activeIndex - 3, 0)
  }
  if (window.innerWidth >= 768 && window.innerWidth < 1280) {
    return max(current.activeIndex - 2, 0)
  }
  return max(current.activeIndex - 1, 0)
}

function ProductionCertificate({ title, description, marks = [], list = [] }) {
  const isMobile = useSelector((state) => state.breakpoint.isMobile)
  const swiperRef = useRef(null)

  const swiperParams = {
    spaceBetween: 20,
    slidesPerView: 2,
    containerClass: 'production-certificate__swiper-container',
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
      },
    },
  }
  const onSlideChange = useCallback((isNext) => {
    if (swiperRef && swiperRef.current.swiper) {
      const { current } = swiperRef
      if (isNext) {
        current.swiper.slideTo(getNext(window, current.swiper, list))
      } else {
        current.swiper.slideTo(getPrev(window, current.swiper))
      }
    }
  }, [])
  return (
    <div className="production-certificate">
      <div className="production-certificate__header">
        <H2 content={title} parentSelector="production-certificate__title" />
        {!isMobile && (
          <div className="production-certificate__controls">
            <ControlButton
              isReverse
              parentSelector="production-certificate__control"
              onClick={onSlideChange.bind(this, false)}
            />
            <ControlButton
              parentSelector="production-certificate__control"
              onClick={onSlideChange.bind(this, true)}
            />
          </div>
        )}
      </div>
      <div className="production-certificate__content">
        <div className="production-certificate__item">
          <P
            parentSelector="production-certificate__description"
            content={description}
          />
          <div className="production-certificate__marks">
            {marks.map((item) => (
              <div key={item.id} className="production-certificate__mark">
                <Image  src={item.src} alt={item.name} />
              </div>
            ))}
          </div>
        </div>
        <div className="production-certificate__swiper">
          <Swiper {...swiperParams} ref={swiperRef}>
            {list.map((item) => (
              <div className="production-certificate__item-wrap" key={item.id}>
                <Image 
                  src={item.image.path.normal}
                  srcSet={`${item.image.path.normal} 1x, ${item.image.path.retina} 2x`}
                  alt=""
                />
              </div>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default ProductionCertificate
