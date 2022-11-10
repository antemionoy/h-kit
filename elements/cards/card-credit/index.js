import cx from 'classnames'
import { P } from 'elements'
import { memoObj } from 'helpers'
import { memo } from 'react'
// import './card-credit.scss'

function CardCredit(props) {
  const { description, title, caption, isDown, parentSelector } = props
  return (
    <div
      className={cx('card-credit', {
        'card-credit--down': isDown,
        [`${parentSelector}`]: parentSelector,
      })}
    >
      <div className="card-credit__icon">
        <p className="card-credit__title">{title}</p>
        <p className="card-credit__caption">{caption}</p>
      </div>
      <P content={description} parentSelector="card-credit__description" />
    </div>
  )
}

export default memo(CardCredit)
