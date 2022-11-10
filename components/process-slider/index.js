import cx from 'classnames'
import { CardProcess, ControlButton, H2, P, PairButton } from 'elements'
import { useCallback, useRef } from 'react'
import Swiper from 'react-id-swiper'
import { useSelector } from 'react-redux'

function ProcessSlider({
  title,
  description,
  buttonText,
  slug,
  processesData,
  parentSelector,
}) {
  const isMobile = useSelector((state) => state.breakpoint.isMobile)
  const swiperRef = useRef(null)

  const swiperParams = {
    spaceBetween: 16,
    slidesPerView: 'auto',
    containerClass: 'process-slider__swiper-container',
    slideToClickedSlide: true,
    breakpoints: {
      769: { spaceBetween: 32 },
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
    <div
      className={cx('process-slider', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      <H2 content={title} parentSelector="process-slider__title" />
      <div className="process-slider__content">
        <P content={description} parentSelector="process-slider__description" />
        {!isMobile && (
          <div className="process-slider__controls">
            <ControlButton
              isReverse
              parentSelector="process-slider__control"
              onClick={onSlideChange.bind(this, false)}
            />
            <ControlButton
              parentSelector="process-slider__control"
              onClick={onSlideChange.bind(this, true)}
            />
          </div>
        )}
      </div>
      <div className="process-slider__swiper">
        <Swiper {...swiperParams} ref={swiperRef}>
          {processesData.map((item, i) => (
            <div className="process-slider__item-wrap" key={item.id}>
              <CardProcess
                index={i + 1}
                title={item.name || item.title}
                description={item.description}
                src={item.image.path}
                parentSelector="process-slider__item"
              />
            </div>
          ))}
        </Swiper>
      </div>
      {buttonText && <PairButton content={buttonText} href={slug} />}
    </div>
  )
}

export default ProcessSlider
