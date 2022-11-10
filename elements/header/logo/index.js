import cx from 'classnames'
import { memoObj } from 'helpers'
import LogoIcon from 'public/icons/logo.svg'
import { memo } from 'react'
// import './logo.scss'

function Logo({ text, parentSelector, isDesktop }) {
  return (
    <div
      className={cx('logo', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      <LogoIcon />
      {isDesktop && <p>{text}</p>}
    </div>
  )
}

function equalFunc(prev, next) {
  return memoObj.byKey(prev, next, 'isDesktop')
}
export default memo(Logo)
