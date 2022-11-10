import cx from 'classnames'
import { CardDescription, CommonButton, Image } from 'elements'
import { getCategoryPath, toggleFavorite } from 'helpers'
import Link from 'next/link'
import Icon from 'public/icons/favorite-icon.svg'
import { memo, useState } from 'react'
import { priceFormat } from '../../../lib/price'

function CardFull({
  data,
  buttonText,
  onCommonButtonClick,
  parentSelector,
  fadeOnFavorite,
  favRemoveItemFromState,
  href = '/',
}) {
  const {
    title,
    description,
    price,
    discount_price,
    price_pm: countPrice,
    preview,
    materials,
    id,
  } = data
  const [isFavorite, setIsFavorite] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)

  const fadeOut = () => {
    setIsFadingOut(true)
  }

  const handleFavoriteClick = () => {
    if (fadeOnFavorite) {
      fadeOut(
        setTimeout(() => {
          setIsFavorite(!isFavorite)
          toggleFavorite(id, 'kitchens')
          favRemoveItemFromState(id, 'kitchens')
        }, 300)
      )
    } else {
      setIsFavorite(!isFavorite)
      toggleFavorite(id, 'kitchens')
    }
  }
  if (fadeOnFavorite && !isFavorite) return null

  return (
    <div
      className={cx(
        `card-full card-horizontal grid ${
          isFadingOut ? 'card-full--fadeout' : ''
        }`,
        {
          [`${parentSelector}`]: parentSelector,
        }
      )}
    >
      <div className="card-full__image grid__col grid__col--md">
        <Link href={href} passHref>
          <a>
            {preview && (
              <Image
                src={preview.path.normal}
                srcSet={`${preview.path.normal} 1x, ${preview.path.retina} 2x`}
                alt={title}
              />
            )}
          </a>
        </Link>
      </div>
      <div className="card-full__content card-horizontal__content">
        <div className="card-full__header">
          <div className="card-full__title h3">
            <Link href={href} passHref>
              <a>
                <p className="h3">{title}</p>
              </a>
            </Link>

            <div
              className={`card-full__favorite card-horizontal__favorite fav ${
                isFavorite ? 'fav--active' : ''
              }`}
              onClick={handleFavoriteClick}
            >
              <Icon />
            </div>
          </div>
          <p className="p card-full__description">{description}</p>
          {price && (
            <div className="card-full__price">
              <span className="h3">{priceFormat(discount_price || price)}</span>
              {countPrice && (
                <span className="count-price">
                  / {priceFormat(countPrice)} за&nbsp;п&nbsp;/&nbsp;м
                </span>
              )}
              {discount_price && (
                <p className="card-full__old-price">
                  <span className="old-price old-price--big old-price--light">
                    {priceFormat(price, false)}
                  </span>
                  <span className="card-label card-label--light card-label--up">
                    {priceFormat(discount_price - price, false)}
                  </span>
                </p>
              )}
            </div>
          )}
        </div>
        <ul className="card-full__type-list tags-list">
          {materials.map(
            (item) =>
              item.material && (
                <li
                  className="card-full__type-list-item tags-list__item"
                  key={item.material.id}
                >
                  <CardDescription
                    title={item.material.title}
                    src={item.image.path}
                    href={`${getCategoryPath(
                      item.material.category.slug,
                      item.material.type
                    )}/${item.material.slug}`}
                  />
                </li>
              )
          )}
        </ul>
        <CommonButton
          content={buttonText}
          onClick={() => onCommonButtonClick(id, title)}
          parentSelector="card-full__button"
        />
      </div>
    </div>
  )
}

export default memo(CardFull)
