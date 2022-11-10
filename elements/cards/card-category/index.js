import cx from 'classnames'
import { H4, Image, P, PairButton } from 'elements'
import { memoObj } from 'helpers'
import Link from 'next/link'
import { memo } from 'react'
// import './card-category.scss'

function CardCategory(props) {
  const {
    title,
    description,
    buttonText,
    src,
    srcSet = src,
    parentSelector,
    withButton = true,
    href = '/',
  } = props

  if (!withButton) {
    return (
      <Link href={href} passHref>
        <a
          className={cx('card-category', {
            [`${parentSelector}`]: parentSelector,
          })}
        >
          <div
            className="card-category__image"
            style={{
              backgroundImage: src ? `url(${src})` : 'none',
            }}
          />
          <div className="card-category__content">
            <H4 content={title} parentSelector="card-category__title" />
            <P
              content={description}
              parentSelector="card-category__description"
            />
          </div>
        </a>
      </Link>
    )
  }
  return (
    <div
      className={cx('card-category', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      <div className="card-category__image">
        {src && <Image src={src} srcSet={srcSet} alt={title} />}
      </div>
      <div className="card-category__content">
        <H4 content={title} parentSelector="card-category__title" />
        <P content={description} parentSelector="card-category__description" />
        <PairButton
          content={buttonText}
          parentSelector="card-category__button"
          href={href}
        />
      </div>
    </div>
  )
}

export default memo(CardCategory)
