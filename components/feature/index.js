import cx from 'classnames'
import {
  CardExpand,
  CardPerson,
  CardProduct,
  ControlButton,
  H2,
  H3,
  H4,
  Image,
  P,
} from 'elements'
import { getCategoryPath, getNoun } from 'helpers'
import Icon from 'public/icons/favorite-icon.svg'
import { useCallback, useRef, useState } from 'react'
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
    return max(current.activeIndex - 3, 0)
  }
  if (window.innerWidth >= 768 && window.innerWidth < 1280) {
    return max(current.activeIndex - 2, 0)
  }
  return max(current.activeIndex - 1, 0)
}

function KitchenFeature({
  title,
  description,
  image,
  quote,
  card,
  list,
  slider,
  sliderPath,
  parentSelector,
}) {
  const isMobile = useSelector((state) => state.breakpoint.isMobile)
  const swiperRef = useRef(null)
  const swiperCatalogRef = useRef(null)
  const [isActive, setActive] = useState(null)
  const swiperParams = {
    slidesPerView: 1,
    effect: 'fade',
    on: {
      slideChange: () => {
        setActive(swiperRef.current.swiper.activeIndex)
      },
    },
  }
  const swiperParamsMobile = {
    slidesPerView: 1,
    spaceBetween: 16,
  }
  const swiperCatalogParams = {
    spaceBetween: 21,
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 32,
      },
      1240: {
        slidesPerView: 3,
        spaceBetween: 53,
      },
    },
  }

  const onSetActive = useCallback((value, e) => {
    try {
      e.stopPropagation()
      if (e.target.classList.contains('feature__controller--active')) {
        setActive(null)
        return
      }
      setActive(value)

      if (typeof value === 'number') {
        swiperRef.current.swiper.slideTo(value)
      }
    } catch (e) {}
  }, [])
  const onSlideChange = useCallback((isNext, e) => {
    try {
      e.stopPropagation()
      if (isNext) {
        if (swiperRef.current.swiper.isEnd) {
          swiperRef.current.swiper.slideTo(0)
        } else {
          swiperRef.current.swiper.slideNext()
        }
      } else if (swiperRef.current.swiper.isBeginning) {
        swiperRef.current.swiper.slideTo(list.length - 1)
      } else {
        swiperRef.current.swiper.slidePrev()
      }
      onSetActive(swiperRef.current.swiper.activeIndex, e)
    } catch (e) {}
  }, [])
  const onSlideCatalogChange = useCallback((isNext) => {
    if (swiperCatalogRef && swiperCatalogRef.current.swiper) {
      const { current } = swiperCatalogRef
      if (isNext) {
        current.swiper.slideTo(getNext(window, current.swiper, slider))
      } else {
        current.swiper.slideTo(getPrev(window, current.swiper))
      }
    }
  }, [])

  return (
    <div
      className={cx('feature', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      {quote && card && (
        <div className="feature__catalog-note">
          <H2 content={quote} parentSelector="feature__catalog-note-title" />
          <CardPerson
            parentSelector="feature__catalog-person"
            title={card.name}
            description={card.caption}
            src={card.image.path}
          />
        </div>
      )}
      <H2 parentSelector="feature__title" content={title} />
      {description && (
        <P parentSelector="feature__description" content={description} />
      )}
      <div className="feature__wrapper">
        {!isMobile && (
          <>
            <div
              className={cx('feature__bc', {
                'feature__bc--active': typeof isActive === 'number',
              })}
              onClick={onSetActive.bind(this, null)}
            />
            <div className="feature__image">
              <Image
                src={image.path.normal}
                srcSet={`${image.path.normal} 1x, ${image.path.retina} 2x`}
                alt={title}
              />
              {list.map((item, index) => {
                const isActiveItem = index === isActive
                return (
                  <div
                    key={item.id || item.image.id}
                    className={cx('feature__controller', {
                      'feature__controller--active': isActiveItem,
                    })}
                    onClick={onSetActive.bind(this, index)}
                    style={{
                      top: `${item.top}%`,
                      left: `${item.left}%`,
                    }}
                  />
                )
              })}
            </div>
            <div
              className={cx('feature__slider', {
                'feature__slider--active': typeof isActive === 'number',
              })}
            >
              <Swiper {...swiperParams} ref={swiperRef}>
                {list.map((item, index) => (
                  <div key={item.id || item.image.id} className="feature__item">
                    <Image
                      className="feature__item-img"
                      src={item.image.path.normal}
                      srcSet={`${item.image.path.normal} 1x, ${item.image.path.retina} 2x`}
                      alt={item.title}
                    />
                    {isActive === item.id && (
                      <CardExpand
                        parentSelector="feature__item-card"
                        title={item.title}
                        description={item.description}
                        onLikeClick={() => {}}
                        expanded={isActive === index}
                      />
                    )}
                  </div>
                ))}
              </Swiper>
              {list.map((item, index) => (
                <div key={item.id || item.image.id}>
                  {isActive === index && (
                    <CardExpand
                      parentSelector="feature__item-card"
                      title={item.title}
                      description={item.description}
                      onLikeClick={() => {}}
                      expanded={isActive === index}
                    />
                  )}
                </div>
              ))}
              {list.length > 1 && (
                <div className="feature__controls">
                  <ControlButton
                    isReverse
                    isGray
                    parentSelector="feature__control"
                    onClick={onSlideChange.bind(this, false)}
                  />
                  <ControlButton
                    isGray
                    parentSelector="feature__control"
                    onClick={onSlideChange.bind(this, true)}
                  />
                </div>
              )}
            </div>
          </>
        )}
        {isMobile && (
          <Swiper {...swiperParamsMobile} ref={swiperRef}>
            {list.map((item) => (
              <div key={item.id || item.image.id} className="feature__item">
                <Image
                  className="feature__item-img"
                  src={item.image.path.normal}
                  srcSet={`${item.image.path.normal} 1x, ${item.image.path.retina} 2x`}
                  alt={item.title}
                />
                <div className="feature__content">
                  <div className="feature__content-header">
                    <H4 content={item.title} />
                    <div
                      className="feature__content-icon fav"
                      onClick={() => {}}
                    >
                      <Icon />
                    </div>
                  </div>
                  <P content={item.description} />
                </div>
              </div>
            ))}
          </Swiper>
        )}
      </div>
      {slider && slider.length > 0 && (
        <div className="feature__catalog">
          <div className="feature__catalog-header">
            <H3
              parentSelector="feature__catalog-title"
              content={slider.title}
            />
            {!isMobile && (
              <div className="feature__catalog-controls">
                <ControlButton
                  isReverse
                  parentSelector="feature__catalog-control"
                  onClick={onSlideCatalogChange.bind(this, false)}
                />
                <ControlButton
                  parentSelector="feature__catalog-control"
                  onClick={onSlideCatalogChange.bind(this, true)}
                />
              </div>
            )}
          </div>
          <Swiper {...swiperCatalogParams} ref={swiperCatalogRef}>
            {slider.map((item) => {
              return (
                <div className="feature__catalog-item-wrap" key={item.id}>
                  <CardProduct
                    id={item.id}
                    type={item.type}
                    title={item.title}
                    description={item.summary}
                    src={item.preview.path}
                    options={
                      item.count_color &&
                      getNoun(item.count_color, 'цвет', 'цвета', 'цветов')
                    }
                    hoverSrc={item.preview_hover?.path}
                    parentSelector="feature__catalog-item"
                    href={`${getCategoryPath(item.category.slug, item.type)}/${
                      item.slug
                    }`}
                  />
                </div>
              )
            })}
          </Swiper>
        </div>
      )}
    </div>
  )
}

export default KitchenFeature
