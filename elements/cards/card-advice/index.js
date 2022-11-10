import cx from 'classnames'
import { H4, H5, Image, P } from 'elements'
import { memoObj } from 'helpers'
import Link from 'next/link'
import { memo } from 'react'
// import './card-advice.scss'

function CardAdvice(props) {
  const {
    isLoading,
    note,
    title,
    description,
    src,
    parentSelector,
    onCardClick = () => {},
    href = '/',
  } = props
  return (
    <Link href={href} passHref>
      <a
        className={cx('card-advice', {
          'card-advice--loading': isLoading,
          [`${parentSelector}`]: parentSelector,
        })}
        onClick={onCardClick}
      >
        <div className="card-advice__image">
          {src && (
            <Image
              src={src.normal}
              srcSet={`${src.normal} 1x, ${src.retina} 2x`}
              alt={title}
            />
          )}
        </div>
        <div className="card-advice__content">
          <H5 content={note} parentSelector="card-advice__note" />
          <H4 content={title} parentSelector="card-advice__title" />
          {description && (
            <P
              content={description}
              isTight
              parentSelector="card-advice__description"
            />
          )}
        </div>
      </a>
    </Link>
  )
}

export default memo(CardAdvice)
