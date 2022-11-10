import cx from 'classnames'
import { P } from 'elements'
import { memoObj } from 'helpers'
import { memo } from 'react'

function FilterTag(props) {
  const { title, parentSelector, isActive, onClick = () => {} } = props
  return (
    <div
      className={cx('filter-tag', {
        'filter-tag--active': isActive,
        [`${parentSelector}`]: parentSelector,
      })}
      onClick={onClick}
      onKeyPress={onClick}
      role="button"
    >
      <P content={title} isTight parentSelector="filter-tag__description" />
    </div>
  )
}

function equalFunc(prev, next) {
  return memoObj.byActive(prev, next) && memoObj.byKey(prev, next, 'onClick')
}
export default memo(FilterTag)
