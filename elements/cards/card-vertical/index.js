import cx from 'classnames'
import { checkFavorite, memoObj, toggleFavorite } from 'helpers'
import { priceFormat } from 'lib/price'
import Link from 'next/link'
import Icon from 'public/icons/favorite-icon.svg'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Image } from 'elements'
function CardVertical(props) {
  const {
    isLoading,
    title,
    price,
    priceDiscount,
    src,
    parentSelector,
    href = '/',
    as,
    video = null,
    poster = null,
    onClick = () => {},
    id,
    type,
  } = props
  const [isFavorite, setIsFavorite] = useState(false)
  const videoRef = useRef(null)

  const returnPoster = useCallback((DOMRef) => {
    DOMRef.classList.remove('card-vertical__image-video--show')
  })

  useEffect(() => {
    setIsFavorite(checkFavorite(id, type))
    try {
      if (videoRef && videoRef.current) {
        videoRef.current.addEventListener(
          'ended',
          returnPoster.bind(this, videoRef.current)
        )
        return () => {
          videoRef.current.removeEventListener(
            'ended',
            returnPoster.bind(this, videoRef.current)
          )
        }
      }
    } catch (e) {}
  }, [])

  const handleFavoriteClick = () => {
    toggleFavorite(id, type)
    setIsFavorite(!isFavorite)
  }

  const onMouseEvent = useCallback((e) => {
    const { type } = e
    if (videoRef && videoRef.current) {
      if (type === 'mouseenter') {
        videoRef.current.play()
        videoRef.current.classList.add('card-vertical__image-video--show')
      }
      if (type === 'mouseleave') {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
        videoRef.current.classList.remove('card-vertical__image-video--show')
      }
    }
  }, [])

  return (
    <div
      className={cx('card-vertical', {
        'card-vertical--loading': isLoading,
        [`${parentSelector}`]: parentSelector,
      })}
      onClick={onClick}
    >
      <div className="card-vertical__image">
        <Link href={href} as={as} passHref>
          <a>
            {src && (
              <Image
                src={src.normal}
                srcSet={`${src.normal} 1x, ${src.retina} 2x`}
                alt={title}
              />
            )}
            {poster && video && (
              <>
                <Image
                  src={poster.normal}
                  srcSet={`${poster.normal} 1x, ${poster.retina} 2x`}
                  alt={title}
                />
                <video
                  src={video}
                  onMouseEnter={onMouseEvent}
                  onMouseLeave={onMouseEvent}
                  ref={videoRef}
                  className="card-vertical__image-video"
                  muted
                />
              </>
            )}
          </a>
        </Link>
      </div>
      <div className="card-vertical__content">
        <div className="card-vertical__header">
          <Link href={href} as={as} passHref>
            <a>
              <h4 className="h4 card-vertical__title">{title}</h4>
            </a>
          </Link>
          <div
            className={`card-vertical__favorite fav ${
              isFavorite ? 'fav--active' : ''
            }`}
            onClick={handleFavoriteClick}
          >
            <Icon />
          </div>
        </div>
        {price && (
          <div className="price card-vertical__price h4">
            <span className={priceDiscount && 'price__new'}>
              {priceFormat(priceDiscount || price)}
            </span>
            {priceDiscount && (
              <p className="price__diff">
                <span className="old-price">{priceFormat(price, false)}</span>
                <span className="card-label">
                  {priceFormat(priceDiscount - price, false)}
                </span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function equalFunc(prev, next) {
  return memoObj.byParentSelector(prev, next) && memoObj.byLoading(prev, next)
}
export default memo(CardVertical)
