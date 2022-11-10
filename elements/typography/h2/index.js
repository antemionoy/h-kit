import cx from 'classnames'
import { memoObj } from 'helpers'
import { memo } from 'react'
// import './h2.scss'

function H2({ content, parentSelector }) {
  return (
    <h2
      className={cx('h2', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      {content}
    </h2>
  )
}

function equalFunc() {
  return memoObj.alwaysSkipRender()
}
export default memo(H2)
