import cx from 'classnames'
import { CardMember, ControlButton, H2, P, PairButton } from 'elements'
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
    return max(current.activeIndex - 4, 0)
  }
  if (window.innerWidth >= 768 && window.innerWidth < 1280) {
    return max(current.activeIndex - 2, 0)
  }
  return max(current.activeIndex - 1, 0)
}

function Team({ parentSelector, title, description, buttonText, slug, list }) {
  const isMobile = useSelector((state) => state.breakpoint.isMobile)
  const swiperRef = useRef(null)

  const swiperParams = {
    slidesPerView: 1,
    spaceBetween: 24,
    containerClass: 'team__swiper-container',
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
      1239: {
        slidesPerView: 3,
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
    <div
      className={cx('team', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      <H2 content={title} parentSelector="team__title" />
      <div className="team__content">
        <P parentSelector="team__description" content={description} />
        {!isMobile && (
          <div className="team__controls">
            <ControlButton
              isReverse
              parentSelector="team__control"
              onClick={onSlideChange.bind(this, false)}
            />
            <ControlButton
              parentSelector="team__control"
              onClick={onSlideChange.bind(this, true)}
            />
          </div>
        )}
      </div>
      <div className="team__swiper">
        <Swiper {...swiperParams} ref={swiperRef}>
          {list.map((item) => (
            <div className="team__item-wrap" key={item.id}>
              <CardMember
                name={item.name}
                description={item.description}
                src={item.image.path}
                parentSelector="team__item"
              />
            </div>
          ))}
        </Swiper>
      </div>
      <PairButton content={buttonText} href={slug} />
    </div>
  )
}

export default Team
