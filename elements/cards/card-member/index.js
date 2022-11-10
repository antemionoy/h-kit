import cx from 'classnames'
import { Image, P } from 'elements'
import { memo } from 'react'

function CardMember(props) {
  const {
    description,
    src,
    name,
    parentSelector,
    onCardClick = () => {},
  } = props
  return (
    <div
      className={cx('card-member', {
        [`${parentSelector}`]: parentSelector,
      })}
      onClick={onCardClick}
    >
      <div className="card-member__image">
        {src && (
          <Image 
            className="kitchen-main__thumbnail-img"
            src={src.normal}
            srcSet={`${src.normal} 1x, ${src.retina} 2x`}
            alt={name}
          />
        )}
      </div>
      <div className="card-member__content">
        <P content={name} parentSelector="card-member__title" />
        <P content={description} parentSelector="card-member__description" />
      </div>
    </div>
  )
}

export default memo(CardMember)
