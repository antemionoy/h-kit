import cx from 'classnames'
import { Image, P } from 'elements'
import { memo } from 'react'

function CardPerson(props) {
  const { title, description, src, parentSelector } = props
  return (
    <div
      className={cx('card-person', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      <div className="card-person__image">
        {src && (
          <Image 
            src={src.normal}
            srcSet={`${src.normal} 1x, ${src.retina} 2x`}
            alt={title}
          />
        )}
      </div>
      <div className="card-person__content">
        <p className="card-person__title p">{title},</p>
        <P content={description} parentSelector="card-person__description" />
      </div>
    </div>
  )
}

export default memo(CardPerson)
