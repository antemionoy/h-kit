import cx from 'classnames'
import { Image, P, PairButton } from 'elements'
import { useSelector } from 'react-redux'

function CardDouble(props) {
  const {
    parentSelector,
    src,
    cardSrc,
    description,
    buttonText,
    href,
    isReverse,
  } = props
  const isMobile = useSelector((state) => state.breakpoint.isMobile)
  return (
    <div
      className={cx('card-double', {
        'card-double--reverse': isReverse,
        [`${parentSelector}`]: parentSelector,
      })}
    >
      {!isMobile && (
        <div className="card-double__image">
          {src && (
            <Image 
              src={src.normal}
              srcSet={`${src.normal} 1x, ${src.retina} 2x`}
              alt=""
            />
          )}
        </div>
      )}
      <div className="card-double__card">
        {cardSrc && (
          <Image 
            src={cardSrc.normal}
            srcSet={`${cardSrc.normal} 1x, ${cardSrc.retina} 2x`}
            alt=""
          />
        )}
        <P parentSelector="card-double__description" content={description} />
        {buttonText && (
          <PairButton
            parentSelector="card-double__button"
            content={buttonText}
            href={href}
          />
        )}
      </div>
    </div>
  )
}

export default CardDouble
