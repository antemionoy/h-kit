import cx from 'classnames'
import { memoObj } from 'helpers'
import { memo } from 'react'
// import './nav-link.scss'

function NavLink({ content, parentSelector, isBold }) {
  return (
    <p
      className={cx('nav-link', {
        'nav-link--bold': isBold,
        [`${parentSelector}`]: parentSelector,
      })}
    >
      {content}
    </p>
  )
}

function equalFunc() {
  return memoObj.alwaysSkipRender()
}
export default memo(NavLink)
