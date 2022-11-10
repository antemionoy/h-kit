import cx from 'classnames'
import { PATH } from 'config/path'
import { H3, H5, Image, P } from 'elements'
import Link from 'next/link'
import { memo } from 'react'
// import './card-preview.scss'

function CardPreview(props) {
  const {
    isLoading,
    note,
    title,
    description,
    src,
    parentSelector,
    onCardClick = () => {},
    href = '/',
    bigCardSlug = true,
  } = props
  return (
    <Link href={`${bigCardSlug ? `${PATH.IDEAS}/` : ''}${href}`} passHref>
      <a
        className={cx('card-preview', {
          'card-preview--loading': isLoading,
          [`${parentSelector}`]: parentSelector,
        })}
        onClick={onCardClick}
      >
        <div className="card-preview__image">
          {src && (
            <Image 
              src={src.normal}
              srcSet={`${src.normal} 1x, ${src.retina} 2x`}
              alt={title}
            />
          )}
        </div>
        <div className="card-preview__content">
          <H5 content={note} parentSelector="card-preview__note" />
          <H3 content={title} parentSelector="card-preview__title" />
          <P
            content={description}
            isTight
            parentSelector="card-preview__description"
          />
        </div>
      </a>
    </Link>
  )
}

export default memo(CardPreview)
