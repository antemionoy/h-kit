import {
  H1,



  P
} from 'elements'
import { useCallback, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

function CatalogMain({ title, description, list }) {
  const isMobile = useSelector((state) => state.breakpoint.isMobile)
  const gallerySwiperRef = useRef(null)
  const thumbnailSwiperRef = useRef(null)
  const gallerySwiperParams = {
    containerClass: 'catalog-main__swiper',
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    loopedSlides: list.length,
    breakpoints: {
      768: {
        spaceBetween: 15,
      },
    },
  }
  const thumbnailSwiperParams = {
    containerClass: 'catalog-main__thumbnail',
    spaceBetween: 24,
    loop: true,
    loopedSlides: list.length,
    slidesPerView: 'auto',
    slideToClickedSlide: true,
    allowTouchMove: false,
  }

  useEffect(() => {
    if (isMobile) {
      try {
        gallerySwiperRef.current.swiper.controller.control =
          thumbnailSwiperRef.current.swiper
        thumbnailSwiperRef.current.swiper.controller.control =
          gallerySwiperRef.current.swiper
      } catch (e) {}
    }
  }, [isMobile])

  const onSlideChange = useCallback((isNext) => {
    if (gallerySwiperRef && gallerySwiperRef.current.swiper) {
      if (isNext) {
        gallerySwiperRef.current.swiper.slideNext()
      } else {
        gallerySwiperRef.current.swiper.slidePrev()
      }
    }
  }, [])

  return (
    <div className="catalog__slider catalog-main process-slider">
      <div className="catalog-main__header">
        {title && (
          <H1 parentSelector="catalog-main__title h2" content={title} />
        )}
        {!title && description && (
          <P content={description} parentSelector="catalog-main__description" />
        )}
        {/* {!isMobile && (
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
        )} */}
      </div>
      {/* <Swiper {...gallerySwiperParams} ref={gallerySwiperRef}>
        {list.map((item) => {
          return (
            <div className="catalog-main__item" key={item.id}>
              {!isMobile && (
                <div className="catalog-main__content">
                  <H5
                    content={item.caption}
                    isCustomColor
                    parentSelector="catalog-main__caption"
                  />
                  <H3
                    content={item.title}
                    isCustomColor
                    parentSelector="catalog-main__subtitle"
                  />
                  <PairButton
                    content={item.button_text}
                    parentSelector="catalog-main__button"
                    href={item.link}
                    disableKeyboard
                  />
                </div>
              )}
              <div className="catalog-main__image">
                {item.image.path && (
                  <Image 
                    src={item.image.path.normal}
                    srcSet={`${item.image.path.normal} 1x, ${item.image.path.retina} 2x`}
                    alt={item.title}
                  />
                )}
              </div>
              {!isMobile && (
                <div
                  className="catalog-main__vector"
                  style={{
                    backgroundImage: `url(/images/catalog-vector.png)`,
                  }}
                />
              )}
            </div>
          )
        })}
      </Swiper> */}

      {/* <Swiper {...thumbnailSwiperParams} ref={thumbnailSwiperRef}>
        {isMobile &&
          list.map((item) => {
            return (
              <div className="catalog-main__thumbnail-wrapper" key={item.id}>
                <CardThumbnail
                  note={item.caption}
                  title={item.title}
                  src={item.image.path}
                  parentSelector="catalog-main__thumbnail-item"
                />
              </div>
            )
          })}
      </Swiper> */}
    </div>
  )
}

export default CatalogMain
