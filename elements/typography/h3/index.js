import cx from 'classnames'
import { memoObj } from 'helpers'
import { memo } from 'react'

function H3({ content, parentSelector }) {
  return (
    <h3
      className={cx('h3', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      {content}
    </h3>
  )
}

function equalFunc() {
  return memoObj.alwaysSkipRender()
}
export default memo(H3)
