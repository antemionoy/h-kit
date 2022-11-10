import cx from 'classnames'
import { H4, H5, Image } from 'elements'
import { memoObj } from 'helpers'
import { memo } from 'react'
// import './card-thumbnail.scss'

function CardThumbnail(props) {
  const {
    isLoading,
    note,
    title,
    src,
    parentSelector,
    onCardClick = () => {},
    isActive,
  } = props
  return (
    <div
      className={cx('card-thumbnail', {
        'card-thumbnail--loading': isLoading,
        'card-thumbnail--active': isActive,
        [`${parentSelector}`]: parentSelector,
      })}
      onClick={onCardClick}
    >
      <div className="card-thumbnail__image">
        {src && (
          <img 
            src={src.normal}
            srcSet={`${src.normal} 1x, ${src.retina} 2x`}
            alt={title}
          />
        )}
      </div>
      <div className="card-thumbnail__content">
        <H5 content={note} parentSelector="card-thumbnail__note" />
        <H4 content={title} parentSelector="card-thumbnail__title" />
      </div>
    </div>
  )
}

function equalFunc(prev, next) {
  return (
    memoObj.byParentSelector(prev, next) &&
    memoObj.byLoading(prev, next) &&
    memoObj.byActive(prev, next)
  )
}
export default memo(CardThumbnail)
