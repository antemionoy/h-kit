import cx from 'classnames'
import { memoObj } from 'helpers'
import { memo } from 'react'

function H4({ content, parentSelector, onClick = () => {} }) {
  return (
    <h4
      className={cx('h4', {
        [`${parentSelector}`]: parentSelector,
      })}
      onClick={onClick}
    >
      {content}
    </h4>
  )
}

function equalFunc(prev, next) {
  return memoObj.byContent(prev, next) && memoObj.byParentSelector(prev, next)
}
export default memo(H4)
