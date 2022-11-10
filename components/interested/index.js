import { useQuery } from '@apollo/client'
import { PATH } from 'config/path'
import { CardVertical, ControlButton, H2 } from 'elements'
import KITCHENS_LIST_QUERY from 'graphql/queries/kitchens_list.graphql'
import { useRef } from 'react'
import Swiper from 'react-id-swiper'
import { useSelector } from 'react-redux'

function getNext(window, current, list) {
  const { min } = Math
  if (window.innerWidth >= 1280) {
    return min(current.activeIndex + 4, list.length - 1)
  }
  if (window.innerWidth >= 768 && window.innerWidth < 1280) {
    return min(current.activeIndex + 2, list.length - 1)
  }
  return min(current.activeIndex + 1, list.length - 1)
}
function getPrev(window, current) {
  const { max } = Math
  if (window.innerWidth >= 1280) {
    return max(current.activeIndex - 4, 0)
  }
  if (window.innerWidth >= 768 && window.innerWidth < 1280) {
    return max(current.activeIndex - 2, 0)
  }
  return max(current.activeIndex - 1, 0)
}

function Interested({ title, ids }) {
  const {
    data: kitchensListData,
    error: kitchensListError,
    loading: kitchensListLoading,
    fetchMore,
  } = useQuery(KITCHENS_LIST_QUERY, {
    variables: { ids }, // arrayRotate(ids)
  })
  const isMobile = useSelector((state) => state.breakpoint.isMobile)
  const swiperRef = useRef(null)
  const swiperParams = {
    spaceBetween: 21,
    slidesPerView: 'auto',
    containerClass: 'interested__swiper-container',
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
  const onSlideChange = (isNext) => {
    if (swiperRef && swiperRef.current.swiper) {
      const { current } = swiperRef
      if (isNext) {
        current.swiper.slideTo(
          getNext(window, current.swiper, kitchensListData?.kitchens.data)
        )
      } else {
        current.swiper.slideTo(getPrev(window, current.swiper))
      }
    }
  }

  if (kitchensListLoading || kitchensListError || !kitchensListData) return null

  return (
    <div className="main__interested interested container">
      <div className="interested__content">
        <H2 content={title} parentSelector="interested__title" />
        {!isMobile && (
          <div className="interested__controls">
            <ControlButton
              isReverse
              isWhite
              parentSelector="interested__control"
              onClick={onSlideChange.bind(this, false)}
            />
            <ControlButton
              isWhite
              parentSelector="interested__control"
              onClick={onSlideChange.bind(this, true)}
            />
          </div>
        )}
      </div>
      <div className="interested__swiper">
        {!isMobile && (
          <Swiper {...swiperParams} ref={swiperRef}>
            {kitchensListData?.kitchens.data.map((item) => (
              <div className="interested__item-wrap" key={item.id}>
                <CardVertical
                  title={item.title}
                  price={item.price}
                  priceDiscount={item.discount_price}
                  src={item.preview.path}
                  parentSelector="interested__item"
                  href={`${PATH.KITCHEN}/[slug]`}
                  as={`${PATH.KITCHEN}/${item.slug}`}
                  id={item.id}
                  type="kitchens"
                />
              </div>
            ))}
          </Swiper>
        )}
        {isMobile &&
          kitchensListData?.kitchens.data.map((item) => (
            <CardVertical
              key={item.id}
              title={item.title}
              price={item.price}
              priceDiscount={item.discount_price}
              src={item.preview.path}
              parentSelector="interested__item"
              href={`${PATH.KITCHEN}/[slug]`}
              as={`${PATH.KITCHEN}/${item.slug}`}
              id={item.id}
              type="kitchens"
            />
          ))}
      </div>
    </div>
  )
}

export default Interested
