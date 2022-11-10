import cx from 'classnames'
import { H2, H4, Image, P, PairButton } from 'elements'
import Icon from 'public/icons/materials-slider-arrow-icon.svg'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import Swiper from 'react-id-swiper'
import { useSelector } from 'react-redux'
import cn from 'classnames'
import { PATH } from 'config/path'

function getNext(current, list) {
  const { min } = Math
  return min(current.activeIndex + 5, list.length - 1)
}
function getPrev(current) {
  const { max } = Math
  return max(current.activeIndex - 5, 0)
}

function KitchenMaterials({ data }) {
  const { title, description, button_text, categories = [], button_link } = data
  const isDesktop = useSelector((state) => state.breakpoint.isDesktop)
  const [activeItem, setActiveItem] = useState(0)
  const [activeColor, setActiveColor] = useState(categories.map(() => 0))
  const swiperRef = useRef(null)

  const onSetActiveItem = useCallback((index, colorIndex) => {
    setActiveItem(index)
    setTimeout(() => {
      try {
        swiperRef.current.swiper.update()
        const activeIndex =
          colorIndex / 5 >= 1 ? Math.floor(colorIndex / 5) * 5 : 0
        swiperRef.current.swiper.slideTo(activeIndex, 0, false)
      } catch (e) {}
    }, 0)
  }, [])
  const onSetActiveColor = useCallback((parentIndex, index, currentState) => {
    try {
      const newState = currentState.map((i, idx) =>
        idx === parentIndex ? index : i
      )
      setActiveColor(newState)
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
  }
  const activeItemArr = categories.filter(
    (item, index) => index === activeItem
  )[0].items
  return (
    <div className="kitchen__materials kitchen-materials">
      <div className="kitchen-materials__content">
        <H2 parentSelector="kitchen-materials__title" content={title} />
        <P
          parentSelector="kitchen-materials__description"
          content={description}
        />
        <div className="kitchen-materials__list">
          {categories.map((item, index) => {
            const isActive = index === activeItem
            return (
              <H4
                parentSelector={cx('kitchen-materials__list-item', {
                  'kitchen-materials__list-item--active': isActive,
                })}
                content={item.name}
                onClick={onSetActiveItem.bind(this, index, activeColor[index])}
                key={index}
              />
            )
          })}
        </div>
        {/* {isDesktop && (
          <PairButton
            parentSelector="kitchen-materials__button"
            content={button_text}
            href={PATH.MATERIALS}
          />
        )} */}
      </div>
      <div className="kitchen-materials__interactive">
        <div className="kitchen-materials__image">
          <Image
            src={'/images/materials/kitchen-material-1-body.png'}
            className="kitchen-materials__image-body"
            alt={`Background image`}
          />
          {categories.map((category, i) => {
            return category.items.map((item, index) => {
              const isActive = index === activeColor[activeItem]
              return (
                <Image
                  src={item.image.path.normal}
                  srcSet={`${item.image.path.normal} 1x, ${item.image.path.retina} 2x`}
                  className={cn('kitchen-materials__image-selected ', {
                    'kitchen-materials__image-selected--active': isActive,
                  })}
                  alt={`Изображение ${index + 1}`}
                  key={index}
                />
              )
            })
          })}
        </div>

        <div className="kitchen-materials__slider">
          {isDesktop && activeItemArr.length > 5 && (
            <div
              className="kitchen-materials__slider-control"
              onClick={onSlideChange.bind(this, false)}
            >
              <Icon />
            </div>
          )}
          {isDesktop && (
            <Swiper {...swiperParams} ref={swiperRef}>
              {activeItemArr.map((item, idx) => {
                const isActive = idx === activeColor[activeItem]
                return (
                  <div
                    className={cx('kitchen-materials__slider-item', {
                      'kitchen-materials__slider-item--active': isActive,
                    })}
                    key={idx}
                    onClick={onSetActiveColor.bind(
                      this,
                      activeItem,
                      idx,
                      activeColor
                    )}
                  >
                    <Image
                      src={item.miniature.path.normal}
                      srcSet={`${item.miniature.path.normal} 1x, ${item.miniature.path.retina} 2x`}
                      alt={`Цвет ${idx + 1}`}
                    />
                  </div>
                )
              })}
            </Swiper>
          )}
          {isDesktop && activeItemArr.length > 5 && (
            <div
              className="kitchen-materials__slider-control kitchen-materials__slider-control--right"
              onClick={onSlideChange.bind(this, true, activeItemArr)}
            >
              <Icon />
            </div>
          )}
          {!isDesktop &&
            activeItemArr.map((item, idx) => {
              const isActive = idx === activeColor[activeItem]
              return (
                <div
                  className={cx('kitchen-materials__slider-item', {
                    'kitchen-materials__slider-item--active': isActive,
                  })}
                  key={idx}
                  onClick={onSetActiveColor.bind(
                    this,
                    activeItem,
                    idx,
                    activeColor
                  )}
                >
                  <Image
                    src={item.miniature.path.normal}
                    srcSet={`${item.miniature.path.normal} 1x, ${item.miniature.path.retina} 2x`}
                    alt={`Цвет ${idx + 1}`}
                  />
                </div>
              )
            })}
        </div>
      </div>
      {/* {!isDesktop && (
        <PairButton
          parentSelector="kitchen-materials__button"
          content={button_text}
          href={PATH.MATERIALS}
        />
      )} */}
    </div>
  )
}

export default KitchenMaterials
