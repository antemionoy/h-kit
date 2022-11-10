import cx from 'classnames'
import { memoObj } from 'helpers'
import { memo } from 'react'
// import './h6.scss'

function H6({ content, parentSelector }) {
  return (
    <h5
      className={cx('h6', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      {content}
    </h5>
  )
}

function equalFunc() {
  return memoObj.alwaysSkipRender()
}
export default memo(H6)
