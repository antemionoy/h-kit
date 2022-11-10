import { PATH } from 'config/path'
import { CardThumbnail, Image, P, PairButton } from 'elements'
import { useEffect, useRef } from 'react'
import Swiper from 'react-id-swiper'

function MainSlider({ data }) {
  const gallerySwiperRef = useRef(null)
  const thumbnailSwiperRef = useRef(null)
  const gallerySwiperParams = {
    loop: true,
    loopedSlides: data.length,
    roundLengths: true,
  }
  const thumbnailSwiperParams = {
    containerClass: 'main-slider__thumbnail',
    spaceBetween: 24,
    loop: true,
    loopedSlides: data.length,
    slidesPerView: 'auto',
    slideToClickedSlide: true,
    // allowTouchMove: false,
  }
  useEffect(() => {
    try {
      gallerySwiperRef.current.swiper.controller.control =
        thumbnailSwiperRef.current.swiper
      thumbnailSwiperRef.current.swiper.controller.control =
        gallerySwiperRef.current.swiper
    } catch (e) {}
  }, [])
  return (
    <div className="main__slider main-slider">
      <Swiper {...gallerySwiperParams} ref={gallerySwiperRef}>
        {data.map((item, index) => {
          const href = item.link === '#' ? '/' : `${PATH.KITCHEN}/${item.link}`
          return (
            <div className="main-slider__item" key={item.id}>
              <div className="container">
                <div className="main-slider__content">
                  <h5 className="h5 main-slider__caption">{item.caption}</h5>
                  {index === 0 ? (
                    <h1 className="h2 main-slider__title">{item.title}</h1>
                  ) : (
                    <h2 className="h2 main-slider__title">{item.title}</h2>
                  )}
                  <P
                    content={item.description}
                    isCustomColor
                    parentSelector="main-slider__description"
                  />
                  <PairButton
                    content={item.button_text}
                    parentSelector="main-slider__button"
                    href={href}
                  />
                </div>
              </div>
              <div className="main-slider__image">
                {item.image && (
                  <img
                    src={item.image.path.normal}
                    srcSet={`${item.image.path.normal} 1x, ${item.image.path.retina} 2x`}
                    alt={item.title}
                  />
                )}
              </div>
              <div
                className="main-slider__vector"
                style={{
                  backgroundImage: `url(/images/main-slider-bg.png)`,
                }}
              />
            </div>
          )
        })}
      </Swiper>
      <Swiper {...thumbnailSwiperParams} ref={thumbnailSwiperRef}>
        {data.map((item) => {
          return (
            <div className="main-slider__thumbnail-wrapper" key={item.id}>
              <CardThumbnail
                note={item.caption}
                title={item.title}
                src={item.preview_image.path}
                parentSelector="main-slider__thumbnail-item"
              />
            </div>
          )
        })}
      </Swiper>
    </div>
  )
}

export default MainSlider
