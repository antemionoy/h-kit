import cx from 'classnames'
import { useCallback } from 'react'
import Swiper from 'react-id-swiper'
import { useSelector } from 'react-redux'
import { Image } from 'elements'
function Gallery({ parentSelector, list }) {
  const isMobile = useSelector((state) => state.breakpoint.isMobile)
  const swiperCatalogParams = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    slidesPerView: 'auto',
    containerClass: 'gallery swiper-container',
  }
  const img = useCallback((item) => {
    if (!item.path) return null
    return (
      <Image
        src={item.path.normal}
        srcSet={`${item.path.normal} 1x, ${item.path.retina} 2x`}
        alt=""
      />
    )
  }, [])
  const renderImg = useCallback((arr) => {
    if (arr.length > 1) {
      let mod
      if (arr.length % 3 === 0) {
        mod = 3
      } else {
        mod = 2
      }
      return (
        <ul
          className={cx(`gallery gallery--${mod}`, {
            [`${parentSelector}`]: parentSelector,
          })}
        >
          {arr.map((item) => {
            return (
              <li className="gallery__item" key={item.id}>
                {img(item)}
              </li>
            )
          })}
        </ul>
      )
    }
    return <div className="gallery">{img(arr)}</div>
  }, [])

  return (
    <>
      {isMobile && list.length > 1 ? (
        <Swiper {...swiperCatalogParams}>
          {list.map((item) => (
            <div className="gallery__item" key={item.id}>
              {img(item)}
            </div>
          ))}
        </Swiper>
      ) : (
        renderImg(list)
      )}
    </>
  )
}

export default Gallery
