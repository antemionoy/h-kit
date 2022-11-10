import cx from 'classnames'
import { H3, Image, P } from 'elements'
import { memo } from 'react'

function CardProduction(props) {
  const {
    description,
    src,
    title,
    parentSelector,
    onCardClick = () => {},
  } = props
  return (
    <div
      className={cx('card-production', {
        [`${parentSelector}`]: parentSelector,
      })}
      onClick={onCardClick}
    >
      <div className="card-production__image">
        {src && (
          <Image 
            src={src.normal}
            srcSet={`${src.normal} 1x, ${src.retina} 2x`}
            alt={title}
          />
        )}
      </div>
      <div className="card-production__content">
        {title && (
          <H3 content={title} parentSelector="card-production__title" />
        )}
        <P
          content={description}
          parentSelector="card-production__description"
        />
      </div>
    </div>
  )
}

export default memo(CardProduction)
