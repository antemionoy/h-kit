import cx from 'classnames'
import { PATH } from 'config/path'
import {
  CardDescription,
  CommonButton,
  ControlButton,
  H2,
  Image,
  P,
  PairButton,
  VideoBlock,
} from 'elements'
import { checkFavorite, toggleFavorite } from 'helpers'
import { useRouter } from 'next/router'
import CloseIcon from 'public/icons/close-popup-icon.svg'
import Icon from 'public/icons/favorite-icon.svg'
import OpenIcon from 'public/icons/open-popup-icon.svg'
import { useCallback, useEffect, useRef, useState, memo } from 'react'
import Swiper from 'react-id-swiper'
import { useSelector } from 'react-redux'

const GallerySwiper = memo(
  ({ gallerySwiperRef, videoRef, sliders, setActiveSlide }) => {
    const gallerySwiperParams = {
      loop: true,
      loopedSlides: sliders.length,
      slidesPerView: 1,
      rebuildOnUpdate: true,
      on: {
        slideChange: () => {
          const swiper = gallerySwiperRef.current.swiper
          if (swiper) {
            setActiveSlide(swiper.realIndex)
          }
        },
      },
    }
    return (
      <Swiper {...gallerySwiperParams} ref={gallerySwiperRef}>
        {sliders.map((item, i) => {
          return (
            <div
              className="kitchen-main__item"
              key={item?.image?.id || item?.video?.id}
            >
              {item?.video ? (
                <VideoBlock
                  videoId={item?.video?.link}
                  posterSrc={{
                    normal: item?.image?.path?.normal,
                    retina: item?.image?.path?.retina,
                  }}
                  ref={videoRef}
                  parentSelector="kitchen-main__slider-video"
                />
              ) : (
                <div className="kitchen-main__image">
                  <img
                    src={item?.image?.path?.normal}
                    srcSet={`${item?.image?.path?.normal} 1x, ${item?.image?.path?.retina} 2x`}
                    alt={item?.image?.id} // FIX
                  />
                </div>
              )}
            </div>
          )
        })}
      </Swiper>
    )
  }
)

const ThumbnailSwiper = memo(({ thumbnailSwiperRef, sliders }) => {
  const thumbnailSwiperParams = {
    containerClass: 'kitchen-main__thumbnail',
    spaceBetween: 24,
    loop: true,
    loopedSlides: sliders.length,
    slidesPerView: 'auto',
    slideToClickedSlide: true,
    rebuildOnUpdate: true,
  }

  return (
    <Swiper {...thumbnailSwiperParams} ref={thumbnailSwiperRef}>
      {sliders.map((item) => {
        return (
          <div
            className="kitchen-main__thumbnail-wrapper"
            key={item?.image?.id || item?.video?.id}
          >
            {item.image && (
              <img
                className="kitchen-main__thumbnail-img"
                src={item.image.path.normal}
                srcSet={`${item.image.path.normal} 1x, ${item.image.path.retina} 2x`}
                alt=""
              />
            )}
          </div>
        )
      })}
    </Swiper>
  )
})

function KitchenMain({
  title,
  description,
  price,
  priceDiscount,
  area,
  tags,
  sliders,
  buttonText,
  id,
  type,
  openModal,
  backContent,
}) {
  const isMobile = useSelector((state) => state.breakpoint.isMobile)
  const [activeSlide, setActiveSlide] = useState(0)
  const [isOpenPopup, setOpenPopup] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const gallerySwiperRef = useRef(null)
  const thumbnailSwiperRef = useRef(null)
  const router = useRouter()
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }, [activeSlide])

  useEffect(() => {
    if (gallerySwiperRef.current && thumbnailSwiperRef.current) {
      const gallery = gallerySwiperRef.current.swiper
      const thumb = thumbnailSwiperRef.current.swiper
      if (isOpenPopup) {
        gallery.controller.control = null
        thumb.controller.control = null
        document.body.classList.add('scroll-lock-hidden')
      } else {
        gallery.controller.control = thumb
        thumb.controller.control = gallery
        document.body.classList.remove('scroll-lock-hidden')
      }
      gallerySwiperRef.current.swiper.update()
    }
  }, [isOpenPopup, sliders])

  useEffect(() => {
    setIsFavorite(checkFavorite(id, type))
  }, [])
  const onSlideChange = useCallback((isNext) => {
    if (
      gallerySwiperRef &&
      gallerySwiperRef.current &&
      gallerySwiperRef.current.swiper
    ) {
      if (isNext) {
        gallerySwiperRef.current.swiper.slideNext()
      } else {
        gallerySwiperRef.current.swiper.slidePrev()
      }
    }
  }, [])
  const onTogglePopup = useCallback((bool, e) => {
    setOpenPopup(!bool)
  })
  const handleFavoriteClick = () => {
    toggleFavorite(id, type)
    setIsFavorite(!isFavorite)
  }

  if (!sliders || sliders.length < 1) {
    return ''
  }

  return (
    <div className="kitchen__main kitchen-main">
      <div className="kitchen-main__info">
        <PairButton
          isBack={true}
          content={backContent}
          parentSelector="kitchen-main__back"
          onClick={() => router.push(PATH.KITCHENS)}
        />
        <h1 className="kitchen-main__title">{title}</h1>
        {!isMobile && (
          <>
            <div className="kitchen-main__header">
              <P parentSelector="kitchen-main__caption" content={description} />
              <div className="kitchen-main__description">
                <p className="kitchen-main__old-price old-price">
                  {priceDiscount && price}
                </p>
                <div>
                  <H2
                    content={priceDiscount || price}
                    isCustomColor
                    parentSelector="kitchen-main__price"
                  />
                  <p className="kitchen-main__area">{area}</p>
                </div>
              </div>
            </div>
            <div className="kitchen-main__interactive">
              <div className="kitchen-main__tags">
                {tags.map((item) => (
                  <CardDescription
                    key={item.id}
                    title={item.name}
                    parentSelector="kitchen-main__tag"
                    href={`${PATH.KITCHENS}/?tags=${item.slug}`}
                  />
                ))}
              </div>
              <div className="kitchen-main__buttons">
                <CommonButton
                  content={buttonText}
                  parentSelector="kitchen-main__button"
                  onClick={openModal}
                />
                <CommonButton
                  parentSelector={`kitchen-main__like fav fav--inverted ${
                    isFavorite ? 'fav-kitchen--active' : ''
                  }`}
                  onClick={handleFavoriteClick}
                >
                  <Icon />
                </CommonButton>
              </div>
            </div>
          </>
        )}
      </div>
      {sliders?.length > 0 && (
        <>
          <div className={'kitchen-main__slider-wrapper'}>
            <div
              className={cx('kitchen-main__slider js-kitchen-fullscreen', {
                'kitchen-main__slider--active': isOpenPopup,
              })}
            >
              <div className="kitchen-main__counter">
                {activeSlide + 1} из {sliders.length}
              </div>
              {!isMobile && (
                <div
                  className="kitchen-main__fullscreen"
                  onClick={onTogglePopup.bind(this, isOpenPopup)}
                >
                  {isOpenPopup ? <CloseIcon /> : <OpenIcon />}
                </div>
              )}
              {!isMobile && (
                <ControlButton
                  isReverse
                  parentSelector="kitchen-main__control"
                  onClick={onSlideChange.bind(this, false)}
                />
              )}
              <GallerySwiper
                setActiveSlide={setActiveSlide}
                gallerySwiperRef={gallerySwiperRef}
                videoRef={videoRef}
                sliders={sliders}
              />
              {!isMobile && (
                <ControlButton
                  parentSelector="kitchen-main__control kitchen-main__control--right"
                  onClick={onSlideChange.bind(this, true)}
                />
              )}
            </div>
          </div>
          <ThumbnailSwiper
            thumbnailSwiperRef={thumbnailSwiperRef}
            sliders={sliders}
          />
        </>
      )}
      {isMobile && (
        <>
          <div className="kitchen-main__header">
            <div className="kitchen-main__description">
              <p className="kitchen-main__old-price old-price">
                {priceDiscount && price}
              </p>
              <div>
                <H2
                  content={priceDiscount || price}
                  isCustomColor
                  parentSelector="kitchen-main__price"
                />
                <p className="kitchen-main__area">{area}</p>
              </div>
            </div>
          </div>
          <div className="kitchen-main__buttons">
            <CommonButton
              content={buttonText}
              parentSelector="kitchen-main__button"
              onClick={openModal}
            />
            <CommonButton
              parentSelector={`kitchen-main__like fav fav--inverted ${
                isFavorite ? 'fav-kitchen--active' : ''
              }`}
              onClick={handleFavoriteClick}
            >
              <Icon />
            </CommonButton>
          </div>
          <P parentSelector="kitchen-main__caption" content={description} />
          <div className="kitchen-main__tags">
            {tags.map((item) => (
              <CardDescription
                key={item.id}
                title={item.name}
                parentSelector="kitchen-main__tag"
                href={`${PATH.KITCHENS}/?tags=${item.slug}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default KitchenMain
