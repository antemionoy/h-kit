import cx from 'classnames'
import {
  CardDescription,
  CommonButton,
  ControlButton,
  H1,
  H2,
  Image,
  P,
  PairButton,
} from 'elements'
import { checkFavorite, toggleFavorite } from 'helpers'
import IconLike from 'public/icons/favorite-icon.svg'
import IconOk from 'public/icons/info-ok-icon.svg'
import IconArrow from 'public/icons/materials-slider-arrow-icon.svg'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
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

function shallowEqual(object1, object2) {
  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (object1[key] !== object2[key]) {
      return false
    }
  }

  return true
}
const ProductSlider = memo(
  ({
    isMobile,
    onSlideChange,
    swiperParams,
    swiperRef,
    colors,
    filteredSlider,
    slider,
    title,
  }) => {
    return (
      <>
        {!isMobile && (
          <ControlButton
            isReverse
            parentSelector="product-main__control"
            onClick={onSlideChange.bind(this, false)}
          />
        )}

        <Swiper {...swiperParams} ref={swiperRef} shouldSwiperUpdate>
          {colors &&
          filteredSlider?.length > 0 &&
          filteredSlider[0].images?.length > 0
            ? filteredSlider[0].images.map((item) => {
                return (
                  <div
                    className="product-main__slider-item"
                    key={item.image.id}
                  >
                    <img
                      src={item.image?.path?.normal}
                      srcSet={`${item.image?.path?.normal} 1x, ${item.image?.path?.retina} 2x`}
                      alt={title}
                    />
                  </div>
                )
              })
            : slider?.map((item) => {
                return (
                  <div className="product-main__slider-item" key={item.id}>
                    <img
                      src={item?.image?.path?.normal || item?.path?.normal}
                      srcSet={`${
                        item?.image?.path?.normal || item?.path?.normal
                      } 1x, ${
                        item?.image?.path?.retina || item?.path?.retina
                      } 2x`}
                      alt={title}
                    />
                  </div>
                )
              })}
        </Swiper>

        {!isMobile && (
          <ControlButton
            parentSelector="product-main__control"
            onClick={onSlideChange.bind(this, true)}
          />
        )}
      </>
    )
  }
)

function ProductMain({
  title,
  id,
  type,
  slider = [],
  description,
  colorsTitle,
  colors,
  shadesTitle,
  shades,
  shadesPath,
  pageSlug,
  materialsTitle,
  materials,
  advantagesTitle,
  advantages,
  specificationsTitle,
  specifications,
  priceDiscount,
  price,
  buttonText,
  isMaterial,
  onButtonClick = () => {},
  back = false,
}) {
  const isMobile = useSelector((state) => state.breakpoint.isMobile)
  const isTablet = useSelector((state) => state.breakpoint.isTablet)
  const isDesktop = useSelector((state) => state.breakpoint.isDesktop)

  const swiperRef = useRef(null)
  const swiperRefColors = useRef(null)

  const [activeColor, setActiveColor] = useState(colors && colors[0].color)
  const [filteredSlider, setFilteredSlider] = useState()
  const [isFavorite, setIsFavorite] = useState(false)

  const swiperParams = useMemo(
    () => ({
      slidesPerView: 1,
      loop: true,
      loopedSlides: slider.length,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      rebuildOnUpdate: true,
    }),
    []
  )
  const swiperColorsParams = {
    spaceBetween: 20,
    slidesPerView: 5,
    allowTouchMove: false,
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

  const onSetActiveColor = useCallback((slug, currentActive) => {
    if (currentActive === slug) {
      return
    }
    setActiveColor(slug)
  }, [])

  const onSlideColorChange = useCallback((isNext, list) => {
    if (swiperRefColors && swiperRefColors.current.swiper) {
      const { current } = swiperRefColors
      if (isNext) {
        current.swiper.slideTo(getNext(current.swiper, list))
      } else {
        current.swiper.slideTo(getPrev(current.swiper))
      }
    }
  }, [])

  useEffect(() => {
    setIsFavorite(checkFavorite(id, type))
  }, [])

  useEffect(() => {
    if (colors) {
      setFilteredSlider(slider.filter((item) => item.color === activeColor))
    }
  }, [activeColor])

  const handleFavoriteClick = () => {
    toggleFavorite(id, type)
    setIsFavorite(!isFavorite)
  }
  const showArrows =
    (isDesktop && colors?.length > 6) || (isTablet && colors?.length > 4)
  return (
    <div className="product-main">
      <div className="product-main__content">
        <div className="product-main__info">
          <div>
            {back && (
              <PairButton
                isBack={true}
                content={back.content}
                parentSelector="product-main__back"
                onClick={back.onClick}
              />
            )}
            <H1 parentSelector="product-main__title h2" content={title} />
          </div>
          {isMobile && (
            <div
              className={`product-main__like fav fav--inverted ${
                isFavorite ? 'fav--active' : ''
              }`}
              onClick={handleFavoriteClick}
            >
              <IconLike />
            </div>
          )}
          {!isMobile && (
            <>
              <P
                parentSelector="product-main__description"
                content={description}
              />
              {advantages?.length > 0 && isMaterial && (
                <div className="product-main__advantages--materials">
                  {advantages.map((item, index) => (
                    <div className="product-main__advantages-item" key={index}>
                      <IconOk />
                      <P content={item} />
                    </div>
                  ))}
                </div>
              )}
              {priceDiscount && price && (
                <p className="product-main__price-old">{price}</p>
              )}
              {price && (
                <H2
                  parentSelector="product-main__price"
                  content={`${priceDiscount || price} ₽`}
                />
              )}
              {buttonText && (
                <CommonButton
                  parentSelector="product-main__button"
                  content={buttonText}
                  onClick={onButtonClick}
                />
              )}
            </>
          )}
        </div>
        <div className="product-main__slider">
          {!isMobile && (
            <div
              className={`product-main__like fav fav--inverted ${
                isFavorite ? 'fav--active' : ''
              }`}
              onClick={handleFavoriteClick}
            >
              <IconLike />
            </div>
          )}
          {slider?.length > 0 && (
            <ProductSlider
              slider={slider}
              isMobile={isMobile}
              onSlideChange={onSlideChange}
              swiperParams={swiperParams}
              swiperRef={swiperRef}
              colors={colors}
              filteredSlider={filteredSlider}
              title={title}
            />
          )}
        </div>
      </div>
      {isMobile && (
        <>
          {priceDiscount && price && (
            <p className="product-main__price-old">{price}</p>
          )}
          {price && (
            <H2
              parentSelector="product-main__price"
              content={`${priceDiscount || price} ₽`}
            />
          )}
          {buttonText && (
            <CommonButton
              parentSelector="product-main__button"
              content={buttonText}
              onClick={onButtonClick}
            />
          )}
        </>
      )}
      {colors && (
        <div className="product-main__row product-main__row--colors">
          <H2
            parentSelector="product-main__row-title h4"
            content={colorsTitle}
          />
          <div
            className={`product-main__colors ${
              !showArrows && !isMobile
                ? 'product-main__colors--with-arrows'
                : ''
            }`}
          >
            {showArrows && (
              <div
                className="product-main__colors-control"
                onClick={onSlideColorChange.bind(this, false)}
              >
                <IconArrow />
              </div>
            )}

            {!isMobile && (
              <Swiper {...swiperColorsParams} ref={swiperRefColors}>
                {colors.map((item) => {
                  const isActive = item.color === activeColor
                  return (
                    <div
                      className={cx('product-main__colors-item', {
                        'product-main__colors-item--active': isActive,
                      })}
                      key={item.id}
                      onClick={onSetActiveColor.bind(
                        this,
                        item.color,
                        activeColor
                      )}
                    >
                      <Image
                        src={item.image?.path?.normal}
                        srcSet={`${item.image?.path?.normal} 1x, ${item.image?.path?.retina} 2x`}
                        alt={item.color}
                      />
                    </div>
                  )
                })}
              </Swiper>
            )}
            {isMobile &&
              colors.map((item) => {
                const isActive = item.color === activeColor
                return (
                  <div
                    className={cx('product-main__colors-item', {
                      'product-main__colors-item--active': isActive,
                    })}
                    key={item.id}
                    onClick={onSetActiveColor.bind(
                      this,
                      item.color,
                      activeColor
                    )}
                  >
                    <Image
                      src={item.image.path.normal}
                      srcSet={`${item.image.path.normal} 1x, ${item.image.path.retina} 2x`}
                      alt={item.color}
                    />
                  </div>
                )
              })}
            {showArrows && (
              <div
                className="product-main__colors-control product-main__colors-control--right"
                onClick={onSlideColorChange.bind(this, true, colors)}
              >
                <IconArrow />
              </div>
            )}
          </div>
        </div>
      )}
      {shades?.length > 0 && (
        <div className="product-main__row">
          <H2
            parentSelector="product-main__row-title h4"
            content={shadesTitle}
          />
          <div className="product-main__row-content">
            {shades.map((item) => (
              <CardDescription
                key={item.id}
                title={item.name}
                parentSelector="product-main__row-shades"
                href={`${shadesPath}${item.slug}`}
              />
            ))}
          </div>
        </div>
      )}
      {materials?.length > 0 && (
        <div className="product-main__row">
          <H2
            parentSelector="product-main__row-title h4"
            content={materialsTitle}
          />
          <div className="product-main__row-content">
            {materials.map((item, index, arr) => (
              <P
                key={index}
                content={item + (index === arr.length - 1 ? '' : ',')}
                parentSelector="product-main__row-material"
              />
            ))}
          </div>
        </div>
      )}
      {isMobile && (
        <P parentSelector="product-main__description" content={description} />
      )}
      {advantages?.length > 0 && (!isMaterial || isMobile) && (
        <div className="product-main__row">
          {!isMaterial && (
            <H2
              parentSelector="product-main__row-title h4"
              content={advantagesTitle}
            />
          )}
          <div className="product-main__advantages">
            {advantages.map((item, index) => (
              <div className="product-main__advantages-item" key={index}>
                <IconOk />
                <P content={item} />
              </div>
            ))}
          </div>
        </div>
      )}
      {specifications && Object.keys(specifications).length > 0 && (
        <div className="product-main__row">
          {!isMaterial && (
            <H2
              parentSelector="product-main__row-title h4"
              content={specificationsTitle}
            />
          )}
          <div className="product-main__specifications">
            {Object.entries(specifications).map(([key, value]) => {
              return (
                <div className="product-main__specifications-item" key={key}>
                  <P content={key} />
                  <span className="product-main__specifications-item-dots" />
                  <P content={value} />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductMain
