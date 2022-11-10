import cx from 'classnames'
import { H4, Image } from 'elements'
import { checkFavorite, toggleFavorite } from 'helpers'
// import './card-horizontal.scss'
import { priceFormat } from 'lib/price'
import Link from 'next/link'
import Icon from 'public/icons/favorite-icon.svg'
import { useCallback, useEffect, useRef, useState } from 'react'

function CardHorizontal(props) {
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
    id,
    type,
  } = props
  const [isFavorite, setIsFavorite] = useState(false)
  const videoRef = useRef(null)

  const returnPoster = useCallback((DOMRef) => {
    DOMRef.classList.remove('card-horizontal__image-video--show')
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
        videoRef.current.classList.add('card-horizontal__image-video--show')
      }
      if (type === 'mouseleave') {
        videoRef.current.currentTime = 0
        videoRef.current.pause()
        videoRef.current.classList.remove('card-horizontal__image-video--show')
      }
    }
  }, [])
  return (
    <div
      className={cx('card-horizontal', {
        'card-horizontal--loading': isLoading,
        [`${parentSelector}`]: parentSelector,
      })}
    >
      <div className="card-horizontal__image">
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
                  className="card-horizontal__image-video"
                  muted
                />
              </>
            )}
          </a>
        </Link>
      </div>
      <div className="card-horizontal__content">
        <div className="card-horizontal__header">
          <Link href={href} as={as} passHref>
            <a>
              <H4 content={title} parentSelector="card-horizontal__title" />
            </a>
          </Link>
          <div
            className={`card-horizontal__favorite fav ${
              isFavorite ? 'fav--active' : ''
            }`}
            onClick={handleFavoriteClick}
          >
            <Icon />
          </div>
        </div>
        {price && (
          <div className="price h4 card-horizontal__price">
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

export default CardHorizontal
