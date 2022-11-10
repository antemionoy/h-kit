import { PATH } from 'config/path'
import { ProductGrid } from 'containers'
import { CardReview, H1 } from 'elements'
import reviewsMock from 'mock/reviews'
import React, { useMemo } from 'react'
const formatReview = (review) => {
  return {
    title: review.review,
    slug: review?.case?.slug,
    label: review.label,
    image: review.image,
  }
}

const formatArray = (array) =>
  array.reduce((prev, current, i) => {
    if (JSON.parse(current.is_highlight)) {
      prev.push([current], [])
    } else {
      if (prev[prev.length - 1]) {
        prev[prev.length - 1].push(current)
      } else {
        prev.push([current])
      }
    }
    return prev
  }, [])

function Reviews({ reviews, pagination, fetchMore }) {
  let isReverse = useMemo(() => true, [])
  return (
    <div className="main-wrapper reviews">
      <div className="container">
        <H1 content={reviewsMock.title} parentSelector="reviews__h1" />
        <p className="p reviews__description">{reviewsMock.subtitle}</p>

        {formatArray(reviews).map((item, i) => {
          if (!item.length) return
          if (JSON.parse(item[0].is_highlight)) {
            isReverse = !isReverse
            return (
              <CardReview
                parentSelector="reviews__card"
                review={item[0]}
                key={i}
                reverse={isReverse}
              />
            )
          } else {
            return (
              <ProductGrid
                key={i}
                parentSelector="product-grid--4 reviews__list"
                output={item.map(formatReview)}
                hideMore
                isAdvice
                slugPath={PATH.CASES}
              />
            )
          }
        })}
      </div>
      <ProductGrid
        parentSelector="product-grid--4 reviews__list"
        output={[]}
        totalLenght={pagination.total}
        offLoaded={reviews.length}
        fetchMore={fetchMore}
        onlyMore={true}
        isAdvice
      />
    </div>
  )
}

export default Reviews
