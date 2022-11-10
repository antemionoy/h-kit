import cx from 'classnames'
import { PATH } from 'config/path'
import { H2, Image, P, PairButton } from 'elements'
import { memoObj } from 'helpers'
import Link from 'next/link'
import { memo } from 'react'
import { useSelector } from 'react-redux'

function CardCase(props) {
  const {
    title,
    description,
    buttonText,
    imageMain,
    imageCommon,
    parentSelector,
    href = '/',
  } = props
  const isDesktop = useSelector((state) => state.breakpoint.isDesktop)
  return (
    <div
      className={cx('card-case', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      <div className="card-case__content">
        <H2 content={title} parentSelector="card-case__title" />
        <P content={description} parentSelector="card-case__description" />
        {isDesktop && (
          <PairButton
            content={buttonText}
            parentSelector="card-case__button"
            href={href}
          />
        )}
      </div>
      <div className="card-case__image">
        {imageMain && (
          <Link href={`${PATH.CASES}/${imageMain.slug}`} passHref>
            <a>
              <Image 
                src={imageMain.preview_image.path.normal}
                srcSet={`${imageMain.preview_image.path.normal} 1x, ${imageMain.preview_image.path.retina} 2x`}
                alt={imageMain.title}
              />
              <span>{imageMain.title}</span>
            </a>
          </Link>
        )}
        {imageCommon && (
          <Link href={`${PATH.CASES}/${imageCommon.slug}`} passHref>
            <a className="card-case__image card-case__image--absolute">
              <Image 
                src={imageCommon.preview_image.path.normal}
                srcSet={`${imageCommon.preview_image.path.normal} 1x, ${imageCommon.preview_image.path.retina} 2x`}
                alt={imageCommon.title}
              />
              <span>{imageCommon.title}</span>
            </a>
          </Link>
        )}
      </div>
      {!isDesktop && (
        <PairButton
          content={buttonText}
          parentSelector="card-case__button"
          href={href}
        />
      )}
    </div>
  )
}

export default memo(CardCase)
