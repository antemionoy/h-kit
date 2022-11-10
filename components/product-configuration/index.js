import { ControlButton, H2, Image, P } from 'elements'
import { useCallback, useRef } from 'react'
import Swiper from 'react-id-swiper'
import { useSelector } from 'react-redux'

function getNext(window, current, list) {
  const { min } = Math
  if (window.innerWidth <= 768) {
    return min(current.activeIndex + 1, list.length - 1)
  }
  return min(current.activeIndex + 4, list.length - 1)
}
function getPrev(window, current) {
  const { max } = Math
  if (window.innerWidth <= 768) {
    return max(current.activeIndex - 1, 0)
  }
  return max(current.activeIndex - 4, 0)
}

function ProductConfiguration({ title, list }) {
  const isMobile = useSelector((state) => state.breakpoint.isMobile)
  const swiperRef = useRef(null)

  const swiperParams = {
    spaceBetween: 32,
    slidesPerView: 1,
    containerClass: 'product-configuration__swiper-container',
    slideToClickedSlide: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        spaceBetween: 32,
        slidesPerView: 4,
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
    <div className="product-configuration">
      <div className="product-configuration__content">
        <H2 content={title} parentSelector="product-configuration__title" />
        {!isMobile && (
          <div className="product-configuration__controls">
            <ControlButton
              isReverse
              parentSelector="product-configuration__control"
              onClick={onSlideChange.bind(this, false)}
            />
            <ControlButton
              parentSelector="product-configuration__control"
              onClick={onSlideChange.bind(this, true)}
            />
          </div>
        )}
      </div>
      <div className="product-configuration__swiper">
        <Swiper {...swiperParams} ref={swiperRef}>
          {list.map((item) => (
            <div className="product-configuration__item" key={item.id}>
              <Image 
                className="product-configuration__item-img"
                src={item.image.path.normal}
                srcSet={`${item.image.path.normal} 1x, ${item.image.path.retina} 2x`}
                alt={item.name}
              />
              <P
                parentSelector="product-configuration__item-title"
                content={item.name}
              />
            </div>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default ProductConfiguration
