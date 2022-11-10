import cx from 'classnames'
import { H2, H4, Image, P } from 'elements'
import Icon from 'public/icons/eye-icon.svg'
import { useCallback, useState } from 'react'
import Swiper from 'react-id-swiper'
import { useSelector } from 'react-redux'

function CaseViews({ title, description, src, list = [] }) {
  const isMobile = useSelector((state) => state.breakpoint.isMobile)
  const [isActive, setActive] = useState(1)

  const swiperParams = {
    slidesPerView: 1,
    spaceBetween: 16,
  }

  const onSetActive = useCallback((id) => {
    setActive(id)
  }, [])
  const getCurrentSrc = useCallback((id, retina) => {
    const image = list.filter((item) => item.id === id)
    if (image.length > 0) {
      if (retina) return image[0].image.path.retina
      return image[0].image.path.normal
    }
    if (retina) return src.retina
    return src.normal
  }, [])

  return (
    <div className="case-views">
      <H2 parentSelector="case-views__title" content={title} />
      <P parentSelector="case-views__description" content={description} />
      <div className="case-views__wrapper">
        {!isMobile && (
          <div className="case-views__image">
            <Image 
              src={getCurrentSrc(isActive)}
              srcSet={`${getCurrentSrc(isActive)} 1x, ${getCurrentSrc(
                isActive,
                true
              )} 2x`}
              alt={title}
            />
            {list.map((item) => {
              const isActiveItem = item.id === isActive
              return (
                <div
                  key={item.id}
                  className={cx('case-views__controller', {
                    'case-views__controller--active': isActiveItem,
                  })}
                  onClick={onSetActive.bind(this, item.id)}
                  style={{
                    top: `${item.top}%`,
                    left: `${item.left}%`,
                  }}
                >
                  <Icon />
                  {item.button_text}
                </div>
              )
            })}
          </div>
        )}
        {isMobile && (
          <Swiper {...swiperParams}>
            {list.map((item) => {
              return (
                <div key={item.image.id} className="case-views__item">
                  <Image 
                    src={item.image.path.normal}
                    srcSet={`${item.image.path.normal} 1x, ${item.image.path.retina} 2x`}
                    alt={item.button_text}
                  />
                  <H4 content={item.button_text} />
                </div>
              )
            })}
          </Swiper>
        )}
      </div>
    </div>
  )
}

export default CaseViews
