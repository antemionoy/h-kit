import cx from 'classnames'
import { memoObj } from 'helpers'
import { memo } from 'react'
// import './burger.scss'

function Burger({ isActive, onClick = () => {}, parentSelector }) {
  return (
    <div
      className={cx('burger', {
        'burger--active': isActive,
        [`${parentSelector}`]: parentSelector,
      })}
      onClick={onClick}
    >
      <div className="burger__line">
        <span />
      </div>
      <div className="burger__line">
        <span />
      </div>
      <div className="burger__line">
        <span />
      </div>
    </div>
  )
}

function equalFunc(prev, next) {
  return memoObj.byActive(prev, next)
}
export default memo(Burger)
