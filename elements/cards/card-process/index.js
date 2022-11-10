import cx from 'classnames'
import { H4, Image, P } from 'elements'
import { memo } from 'react'

function CardProcess(props) {
  const {
    index,
    title,
    description,
    src,
    parentSelector,
    onCardClick = () => {},
  } = props
  return (
    <div
      className={cx('card-process', {
        [`${parentSelector}`]: parentSelector,
      })}
      onClick={onCardClick}
    >
      <div className="card-process__image">
        {src && (
          <Image 
            src={src.normal}
            srcSet={`${src.normal} 1x, ${src.retina} 2x`}
            alt={title}
          />
        )}
        {index && <div className="card-process__index">{index}</div>}
      </div>
      <div className="card-process__content">
        <H4 content={title} parentSelector="card-process__title" />
        <P
          content={description}
          isTight
          parentSelector="card-process__description"
        />
      </div>
    </div>
  )
}

export default memo(CardProcess)
