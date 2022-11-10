import cx from 'classnames'
import { Image, P } from 'elements'
import { checkFavorite, toggleFavorite } from 'helpers'
import { priceFormat } from 'lib/price'
import Link from 'next/link'
import Icon from 'public/icons/favorite-icon.svg'
import { memo, useEffect, useState } from 'react'

function CardProduct(props) {
  const {
    parentSelector,
    id,
    type,
    title,
    description,
    options,
    src,
    hoverSrc,
    href = '/',
    price,
    priceDiscount,
    fadeOnFavorite,
    favRemoveItemFromState,
    favStateCategoryName,
  } = props
  const [isFavorite, setIsFavorite] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)
  useEffect(() => {
    setIsFavorite(checkFavorite(id, type))
  }, [])

  const fadeOut = () => {
    setIsFadingOut(true)
  }

  const handleFavoriteClick = () => {
    if (fadeOnFavorite) {
      fadeOut(
        setTimeout(() => {
          toggleFavorite(id, type)
          setIsFavorite(!isFavorite)
          favRemoveItemFromState(id, favStateCategoryName)
        }, 300)
      )
    } else {
      toggleFavorite(id, type)
      setIsFavorite(!isFavorite)
    }
  }

  if (fadeOnFavorite && !isFavorite) {
    return null
  }
  return (
    <div
      className={cx(
        `card-product ${isFadingOut ? 'card-product--fadeout' : ''}`,
        {
          [`${parentSelector}`]: parentSelector,
        }
      )}
    >
      <div className="card-product__image">
        <Link href={href} passHref>
          <a>
            {src && (
              <Image 
                src={src.normal}
                srcSet={`${src.normal} 1x, ${src.retina} 2x`}
                alt={title}
              />
            )}
            {hoverSrc && (
              <Image 
                src={hoverSrc.normal}
                srcSet={`${hoverSrc.normal} 1x, ${hoverSrc.retina} 2x`}
                alt={title}
                className="card-product__image-hover"
              />
            )}
          </a>
        </Link>
      </div>
      <div className="card-product__content">
        <div className="card-product__header">
          <Link href={href} passHref>
            <a>
              <p className="h4 card-product__title">{title}</p>
            </a>
          </Link>
          {type && (
            <div
              className={`card-product__favorite fav ${
                isFavorite ? 'fav--active' : ''
              }`}
              onClick={handleFavoriteClick}
            >
              <Icon />
            </div>
          )}
        </div>
        <div className="card-product__footer">
          <P content={description} parentSelector="card-product__description" />
          {options && (
            <P content={options} parentSelector="card-product__options" />
          )}
        </div>
        {price && (
          <div className="price card-product__price h4">
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

export default memo(CardProduct)
