import cx from 'classnames'
import { Image, P } from 'elements'
import { memoObj } from 'helpers'
import { memo } from 'react'

function CardSmi({
  parentSelector,
  title,
  preview,
  link = '/',
  sourceLogo,
  source,
  date,
}) {
  return (
    <a
      className={cx('card-smi', {
        [`${parentSelector}`]: parentSelector,
      })}
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      <div className="card-smi__image">
        {preview && (
          <Image 
            src={preview.path.normal}
            srcSet={`${preview.path.normal} 1x, ${preview.path.retina} 2x`}
            alt={title}
          />
        )}
      </div>
      <div className="card-smi__content">
        <div className="card-smi__header">
          {sourceLogo && (
            <div className="card-smi__avatar">
              <Image 
                src={sourceLogo.path.normal}
                srcSet={`${sourceLogo.path.normal} 1x, ${sourceLogo.path.retina} 2x`}
                alt={source}
              />
            </div>
          )}
          <P parentSelector="card-smi__info" content={source} />
          <P parentSelector="card-smi__info" content={date} />
        </div>
        <p className="h4 card-smi__title">{title}</p>
      </div>
    </a>
  )
}

function equalFunc(prev, next) {
  return memoObj.byParentSelector(prev, next)
}
export default memo(CardSmi)
