import cx from 'classnames'
import { CardPerson, ControlButton, H1, H2, Image, P } from 'elements'
import { formatNote } from 'helpers'
import { useCallback, useRef } from 'react'
import Swiper from 'react-id-swiper'
import { useSelector } from 'react-redux'

function WideSlider({
  parentSelector,
  sliders,
  title,
  description,
  note,
  card,
  bigTitle,
}) {
  const isMobile = useSelector((state) => state.breakpoint.isMobile)
  const swiperRef = useRef(null)

  const swiperParams = {
    spaceBetween: 20,
    slidesPerView: 'auto',
    containerClass: 'wide-slider__swiper-container',
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
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
      className={cx('wide-slider', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      {bigTitle ? (
        <H1 content={title} parentSelector="wide-slider__title" />
      ) : (
        <H2 content={title} parentSelector="wide-slider__title" />
      )}

      <div className="wide-slider__content">
        <P content={description} parentSelector="wide-slider__description" />
        {!isMobile && (
          <div className="wide-slider__controls">
            <ControlButton
              isReverse
              parentSelector="wide-slider__control"
              onClick={onSlideChange.bind(this, false)}
            />
            <ControlButton
              parentSelector="wide-slider__control"
              onClick={onSlideChange.bind(this, true)}
            />
          </div>
        )}
      </div>
      <div className="wide-slider__swiper">
        <Swiper {...swiperParams} ref={swiperRef}>
          {sliders.map((item, index) => (
            <div className="wide-slider__item-wrap" key={item.id || index}>
              <Image 
                src={item.image.path.normal}
                srcSet={`${item.image.path.normal} 1x, ${item.image.path.retina} 2x`}
                alt=""
              />
            </div>
          ))}
        </Swiper>
      </div>
      {note && card && (
        <div className="wide-slider__note">
          <h2
            className="wide-slider__note-title"
            dangerouslySetInnerHTML={{ __html: formatNote(note) }}
          />
          <CardPerson
            parentSelector="wide-slider__person"
            title={card.title}
            description={card.description}
            src={card.src}
          />
        </div>
      )}
    </div>
  )
}

export default WideSlider
