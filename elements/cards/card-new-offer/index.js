import cx from 'classnames'
import { PATH } from 'config/path'
import { Image, PairButton } from 'elements'
import { memo } from 'react'

function CardNewOffer({ data, parentSelector }) {
  // как сделать extends CardHorizontal например
  const { label, title, description, slug, image } = data

  return (
    <div
      className={cx('card-new-offer grid', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      <div className="grid__col grid__col--xs card-new-offer__info">
        {label && <p className="h5 card-new-offer__caption">{label}</p>}
        {title && <p className="h3 card-new-offer__title">{title}</p>}
        {description && (
          <p className="p card-new-offer__description">{description}</p>
        )}
        {slug && (
          <PairButton
            content="Смотреть акцию"
            parentSelector="card-new-offer__button"
            href={`${PATH.SPECIALS}/${slug}`}
          />
        )}
      </div>
      {image && (
        <div className="grid__col grid__col--md card-new-offer__img">
          <img
            src={image.path.normal}
            srcSet={`${image.path.normal} 1x, ${image.path.retina} 2x`}
            alt={title}
          />
        </div>
      )}
    </div>
  )
}

export default memo(CardNewOffer)
