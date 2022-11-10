import { CardPerson, CardProduction, ControlButton, H2, P } from 'elements'
import { useCallback, useRef } from 'react'
import Swiper from 'react-id-swiper'
import { useSelector } from 'react-redux'

function getNext(window, current, list) {
  const { min } = Math
  if (window.innerWidth >= 1280) {
    return min(current.activeIndex + 2, list.length - 1)
  }
  if (window.innerWidth >= 768 && window.innerWidth < 1280) {
    return min(current.activeIndex + 2, list.length - 1)
  }
  return min(current.activeIndex + 1, list.length - 1)
}
function getPrev(window, current) {
  const { max } = Math
  if (window.innerWidth >= 1280) {
    return max(current.activeIndex - 2, 0)
  }
  if (window.innerWidth >= 768 && window.innerWidth < 1280) {
    return max(current.activeIndex - 2, 0)
  }
  return max(current.activeIndex - 1, 0)
}

function ProductionEnvironment({ title, description, list = [], note, card }) {
  const isMobile = useSelector((state) => state.breakpoint.isMobile)
  const swiperRef = useRef(null)

  const swiperParams = {
    spaceBetween: 20,
    slidesPerView: 1,
    containerClass: 'production-environment__swiper-container',
    slideToClickedSlide: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 32,
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
    <div className="kitchen__production-environment production-environment">
      <H2 content={title} parentSelector="production-environment__title" />
      <div className="production-environment__content">
        <P
          content={description}
          parentSelector="production-environment__description"
        />
        {!isMobile && (
          <div className="production-environment__controls">
            <ControlButton
              isReverse
              parentSelector="production-environment__control"
              onClick={onSlideChange.bind(this, false)}
            />
            <ControlButton
              parentSelector="production-environment__control"
              onClick={onSlideChange.bind(this, true)}
            />
          </div>
        )}
      </div>
      <div className="production-environment__swiper">
        <Swiper {...swiperParams} ref={swiperRef}>
          {list.map((item) => (
            <div className="production-environment__item-wrap" key={item.id}>
              <CardProduction
                title={item.title}
                description={item.description}
                src={item.image.path}
                parentSelector="production-environment__item"
              />
            </div>
          ))}
        </Swiper>
      </div>
      <div className="production-environment__note">
        <H2
          content={note}
          parentSelector="production-environment__note-title"
        />
        <CardPerson
          parentSelector="production-environment__person"
          title={card.title}
          description={card.description}
          src={card.src}
        />
      </div>
    </div>
  )
}

export default ProductionEnvironment
