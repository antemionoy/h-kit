import cx from 'classnames'
import { H2, H4, Image, P } from 'elements'
import Icon from 'public/icons/materials-slider-arrow-icon.svg'
import { useCallback, useRef, useState } from 'react'
import Swiper from 'react-id-swiper'
import { useSelector } from 'react-redux'

function getNext(current, list) {
  const { min } = Math
  return min(current.activeIndex + 5, list.length - 1)
}
function getPrev(current) {
  const { max } = Math
  return max(current.activeIndex - 5, 0)
}

function Step3({ data }) {
  const { caption, title, description, bodyImage, list = [] } = data
  const isMobile = useSelector((state) => state.breakpoint.isMobile)
  const [activeColor, setActiveColor] = useState(0)
  const swiperRef = useRef(null)
  const imageRef = useRef(null)

  const onSetActiveColor = useCallback((index) => {
    try {
      setActiveColor(index)
    } catch (e) {}
  }, [])

  const onSlideChange = useCallback((isNext, list) => {
    if (swiperRef && swiperRef.current.swiper) {
      const { current } = swiperRef
      if (isNext) {
        current.swiper.slideTo(getNext(current.swiper, list))
      } else {
        current.swiper.slideTo(getPrev(current.swiper))
      }
    }
  }, [])

  const swiperParams = {
    spaceBetween: 20,
    slidesPerView: 5,
    allowTouchMove: false,
    breakpoints: {
      769: {
        spaceBetween: 10,
      },
      1281: {
        spaceBetween: 20,
      },
    },
    on: {
      init() {
        setTimeout(() => {
          try {
            swiperRef.current.swiper.update()
          } catch (e) {}
        }, 0)
      },
    },
  }
  return (
    <div className="step-3">
      <div className="step-3__content">
        <H4 parentSelector="step-3__caption" content={caption} />
        <H2 parentSelector="step-3__title" content={title} />
        <P parentSelector="step-3__description" content={description} />
      </div>
      <div className="step-3__slider">
        <div className="step-3__image">
          <Image src={bodyImage} className="step-3__image-body" />
          {list.map((material, idx) => {
            const isActive = idx === activeColor
            if (!isActive) {
              return null
            }
            return (
              <Image
                key={idx}
                ref={imageRef}
                src={material.materialSrc}
                className="step-3__image-selected step-3__image-selected--active"
              />
            )
          })}
        </div>
        {/* <div className="step-3__swiper"> 
          {!isMobile && (
            <div
              className="step-3__slider-control"
              onClick={onSlideChange.bind(this, false)}
            >
              <Icon />
            </div>
          )}
          {!isMobile && (
            <Swiper {...swiperParams} ref={swiperRef}>
              {list.map((item, idx) => {
                const isActive = idx === activeColor
                return (
                  <div
                    className={cx('step-3__slider-item', {
                      'step-3__slider-item--active': isActive,
                    })}
                    key={idx}
                    onClick={onSetActiveColor.bind(this, idx)}
                  >
                    <Image  src={item.colorSrc} />
                  </div>
                )
              })}
            </Swiper>
          )}
          {!isMobile && (
            <div
              className="step-3__slider-control step-3__slider-control--right"
              onClick={onSlideChange.bind(this, true, list)}
            >
              <Icon />
            </div>
          )}
          {isMobile &&
            list.map((item, idx) => {
              const isActive = idx === activeColor
              return (
                <div
                  className={cx('step-3__slider-item', {
                    'step-3__slider-item--active': isActive,
                  })}
                  key={idx}
                  onClick={onSetActiveColor.bind(this, idx)}
                >
                  <Image  src={item.colorSrc} />
                </div>
              )
            })}
        </div>*/}
      </div>
    </div>
  )
}

export default Step3
