import cx from 'classnames'
import { H4, H5, Image, P } from 'elements'
import { memoObj } from 'helpers'
import Link from 'next/link'
import { memo } from 'react'
// import './card-special.scss'

function CardSpecial({
  isLoading,
  note,
  title,
  description,
  src,
  parentSelector,
  href = '/',
  as,
  isMobile = false,
}) {
  return (
    <Link href={href} as={as} passHref>
      <a
        className={cx('card-special', {
          'card-special--loading': isLoading,
          [`${parentSelector}`]: parentSelector,
        })}
      >
        <div className="card-special__image">
          {src && (
            <Image 
              src={src.normal}
              srcSet={`${src.normal} 1x, ${src.retina} 2x`}
              alt={title}
            />
          )}
        </div>
        <div className="card-special__content">
          <H5 content={note} parentSelector="card-special__note" />
          <H4 content={title} parentSelector="card-special__title" />
          {!isMobile && (
            <P
              content={description}
              isTight
              parentSelector="card-special__description"
            />
          )}
        </div>
      </a>
    </Link>
  )
}

function equalFunc(prev, next) {
  return (
    memoObj.byParentSelector(prev, next) &&
    memoObj.byLoading(prev, next) &&
    memoObj.byKey(prev, next, 'isMobile')
  )
}
export default memo(CardSpecial)
