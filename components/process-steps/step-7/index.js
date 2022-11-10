import cx from 'classnames'
import { ControlButton, H2, H4, Image, P, PairButton } from 'elements'
import { useCallback, useRef } from 'react'
import Swiper from 'react-id-swiper'
import { useSelector } from 'react-redux'

function Step7({ data, parentSelector }) {
  const { caption, title, description, buttonText, href, list = [] } = data
  const isMobile = useSelector((state) => state.breakpoint.isMobile)
  const swiperRef = useRef(null)
  const swiperParams = {
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  }
  const onSlideChange = useCallback((isNext) => {
    if (swiperRef && swiperRef.current.swiper) {
      const { current } = swiperRef
      if (isNext) {
        current.swiper.slideNext()
      } else {
        current.swiper.slidePrev()
      }
    }
  }, [])

  return (
    <div
      className={cx('step-7', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      <H4 content={caption} parentSelector="step-7__caption" />
      <div className="step-7__header">
        <H2 parentSelector="step-7__title" content={title} />
        <div className="step-7__content">
          <P parentSelector="step-7__description" content={description} />
          <PairButton content={buttonText} href={href} />
        </div>
      </div>
      {!isMobile && (
        <div className="step-7__controls">
          <ControlButton
            isReverse
            isWhite
            parentSelector="step-7__control"
            onClick={onSlideChange.bind(this, false)}
          />
          <ControlButton
            isWhite
            parentSelector="step-7__control"
            onClick={onSlideChange.bind(this, true)}
          />
        </div>
      )}
      <div className="step-7__swiper">
        <Swiper {...swiperParams} ref={swiperRef}>
          {list.map((item, index) => (
            <div className="step-7__list" key={index}>
              {item.sublist.map((item, index) => (
                <div className="step-7__item" key={index}>
                  <Image  src={item.src} alt={item.name} />
                </div>
              ))}
            </div>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Step7
