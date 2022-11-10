import cx from 'classnames'
import { memoObj } from 'helpers'
import { memo } from 'react'
// import './h5.scss'

function H5({ content, parentSelector }) {
  return (
    <h5
      className={cx('h5', {
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
export default memo(H5)
