import cx from 'classnames'
import { PATH } from 'config/path'
import { CardPerson, H2, Image, PairButton } from 'elements'
import React from 'react'

function CardReview({ review, parentSelector, reverse }) {
  const {
    client,
    image,
    kitchen,
    label,
    review: reviewText,
    case: caseData,
  } = review
  return (
    <div
      className={cx('grid card-review', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      {image && (
        <div
          className={cx('card-review__img', {
            'card-review__img-reverse': reverse,
          })}
        >
          <Image
            src={image.path.normal}
            srcSet={`${image.path.normal} 1x, ${image.path.retina} 2x`}
            alt={label}
          />
        </div>
      )}
      <div
        className={cx('card-review__info', {
          'card-review__info-reverse': reverse,
        })}
      >
        {reviewText && (
          <H2 className="card-review__title" content={reviewText} />
        )}
        <div className="card-review__data">
          {client && (
            <CardPerson
              parentSelector="card-review__person"
              title={client.name}
              description={client.label}
              src={client.photo.path}
            />
          )}
          {kitchen && (
            <PairButton
              content="Смотреть кухню"
              parentSelector="card-review__button"
              href={`${PATH.CASES}/${caseData.slug}`}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default CardReview
