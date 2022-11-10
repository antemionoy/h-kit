import cx from 'classnames'
import { CardProduct, H3 } from 'elements'
import { getCategoryPath, getNoun } from 'helpers'
import Swiper from 'react-id-swiper'
import { useSelector } from 'react-redux'
import { useRef, useEffect } from 'react'

function ProductProposal({
  title,
  list = [],
  type,
  parentSelector,
  addOptions,
}) {
  const isMobile = useSelector((state) => state.breakpoint.isMobile)

  const swiperParams = {
    slidesPerView: 'auto',
    spaceBetween: 21,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  }

  const swiperRef = useRef(null)
  useEffect(() => {
    const onResize = () => {
      if (swiperRef.current) {
        if (swiperRef.current.swiper.pagination.bullets.length < 2) {
          swiperRef.current.swiper.pagination.el.style.opacity = 0
          swiperRef.current.swiper.pagination.el.style.pointerEvents = 'none'
        } else {
          swiperRef.current.swiper.pagination.el.style.opacity = 1
          swiperRef.current.swiper.pagination.el.style.pointerEvents = 'initial'
        }
      }
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [isMobile])

  return (
    <div
      className={cx('product-proposal', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      <H3 content={title} parentSelector="product-proposal__title" />
      <div className="product-proposal__list">
        {!isMobile && (
          <>
            {list.map((item) => {
              let options = ''
              if (addOptions && item.count_color) {
                options = getNoun(item.count_color, 'цвет', 'цвета', 'цветов')
              }
              return (
                <CardProduct
                  key={item.id}
                  parentSelector={cx('product-proposal__item', {
                    'product-proposal__item--short':
                      type === 'accessories' || type === 'fittings',
                  })}
                  id={item.id}
                  type={item.type}
                  title={item.title}
                  description={item.summary}
                  src={item.preview.path}
                  options={options}
                  hoverSrc={item.preview_hover?.path}
                  href={`${getCategoryPath(item.category.slug, item.type)}/${
                    item.slug
                  }`}
                />
              )
            })}
          </>
        )}
        {isMobile && (
          <Swiper {...swiperParams} ref={swiperRef}>
            {list.map((item) => {
              let options = ''
              if (addOptions && item.count_color) {
                options = getNoun(item.count_color, 'цвет', 'цвета', 'цветов')
              }
              return (
                <div className="product-proposal__item" key={item.id}>
                  <CardProduct
                    parentSelector={cx('product-proposal__item', {
                      'product-proposal__item--short':
                        type === 'accessories' || type === 'fittings',
                    })}
                    id={item.id}
                    type={item.type}
                    title={item.title}
                    description={item.summary}
                    src={item.preview.path}
                    options={options}
                    hoverSrc={item.preview_hover?.path}
                    href={`${getCategoryPath(item.category.slug, item.type)}/${
                      item.slug
                    }`}
                  />
                </div>
              )
            })}
          </Swiper>
        )}
      </div>
    </div>
  )
}

export default ProductProposal
