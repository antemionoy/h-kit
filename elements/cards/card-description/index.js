import cx from 'classnames'
import { Image, P } from 'elements'
import { memoObj } from 'helpers'
import Link from 'next/link'
import { memo } from 'react'

function CardDescription(props) {
  const { title, src = null, parentSelector, href = '/' } = props
  return (
    <Link href={href} passHref>
      <a
        className={cx('card-description', {
          'card-description--with-icon': src,
          [`${parentSelector}`]: parentSelector,
        })}
      >
        {src && (
          <div className="card-description__image">
            <Image 
              src={src.normal}
              srcSet={`${src.normal} 1x, ${src.retina} 2x`}
              alt={title}
            />
          </div>
        )}
        <div className="card-description__content">
          <P
            content={title}
            isTight
            parentSelector="card-description__description"
          />
        </div>
      </a>
    </Link>
  )
}

function equalFunc() {
  return memoObj.alwaysSkipRender()
}
export default memo(CardDescription)
