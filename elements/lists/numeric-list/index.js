import cx from 'classnames'
import { memoObj } from 'helpers'
import { memo } from 'react'

function NumericList(props) {
  const { list, parentSelector } = props
  return (
    <ol
      className={cx('numeric-list', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      {list.map((item, index) => (
        <li className="numeric-list__item p" key={index}>
          {item}
        </li>
      ))}
    </ol>
  )
}

function equalFunc(prev, next) {
  return (
    memoObj.byParentSelector(prev, next) &&
    memoObj.byContent(prev, next) &&
    memoObj.byDisabled(prev, next)
  )
}
export default memo(NumericList)
