import cx from 'classnames'
import { H4, P } from 'elements'
import { memo } from 'react'
// import './card-material.scss'

function CardMaterial(props) {
  const {
    title,
    description,
    src,
    parentSelector,
    onMouseEnter = () => {},
    isActive,
    href,
  } = props
  return (
    <div
      className={cx('card-material', {
        'card-material--active': isActive,
        [`${parentSelector}`]: parentSelector,
      })}
      onMouseEnter={onMouseEnter}
    >
      <div
        className="card-material__image"
        style={{
          backgroundImage: src ? `url(${src})` : 'none',
        }}
      />
      <div className="card-material__content">
        <H4 content={title} parentSelector="card-material__title" />
        <P content={description} parentSelector="card-material__description" />
      </div>
    </div>
  )
}

export default memo(CardMaterial)
