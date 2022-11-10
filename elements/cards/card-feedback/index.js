import cx from 'classnames'
import { H2, H4, Image, P, PairButton } from 'elements'
import { memo } from 'react'

function CardFeedback(props) {
  const {
    caption,
    title,
    description,
    buttonText,
    src,
    parentSelector,
    href = '/',
    slugPath,
    isReverse,
     onPairClick = () => {},
  } = props
  return (
    <div
      className={cx('card-feedback', {
        'card-feedback--reverse': isReverse,
        [`${parentSelector}`]: parentSelector,
      })}
    >
      <div className="card-feedback__image">
        {src && (
          <Image
            src={src.normal}
            srcSet={`${src.normal} 1x, ${src.retina} 2x`}
            alt={title}
          />
        )}
      </div>
      <div className="card-feedback__content">
        {caption && (
          <H4 parentSelector="card-feedback__caption" content={caption} />
        )}
        <H2 content={title} parentSelector="card-feedback__title" />
        <P content={description} parentSelector="card-feedback__description" />
        <PairButton
          content={buttonText}
          parentSelector="card-feedback__button"
          href={slugPath ? `${slugPath}/${href}` : href}
          onClick={onPairClick}
        />
      </div>
    </div>
  )
}

export default memo(CardFeedback)
