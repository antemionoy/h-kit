import cx from 'classnames'
import { CardProduct, ControlButton, H3 } from 'elements'
import { getCategoryPath } from 'helpers'
import { useCallback, useRef } from 'react'
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

function CardProductSlider({ title, list, parentSelector }) {
  const isMobile = useSelector((state) => state.breakpoint.isMobile)
  const swiperCatalogRef = useRef(null)

  const swiperCatalogParams = {
    spaceBetween: 0,
    slidesPerView: 1,
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
        slidesPerView: 4,
        spaceBetween: 32,
      },
    },
  }

  const onSlideCatalogChange = useCallback((isNext) => {
    if (swiperCatalogRef && swiperCatalogRef.current.swiper) {
      const { current } = swiperCatalogRef
      if (isNext) {
        current.swiper.slideTo(getNext(window, current.swiper, list))
      } else {
        current.swiper.slideTo(getPrev(window, current.swiper))
      }
    }
  }, [])

  return (
    <div
      className={cx('card-product-slider feature', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      <div className="feature__catalog-header">
        <H3 parentSelector="feature__catalog-title" content={title} />
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
        {list.map((item) => (
          <div className="feature__catalog-item-wrap" key={item.id}>
            <CardProduct
              id={item.id}
              type={item.type}
              title={item.title}
              description={item.summary}
              src={item.preview.path}
              hoverSrc={item.preview_hover?.path}
              parentSelector="feature__catalog-item"
              href={`${getCategoryPath(item.category.slug, item.type)}/${
                item.slug
              }`}
            />
          </div>
        ))}
      </Swiper>
    </div>
  )
}

export default CardProductSlider
