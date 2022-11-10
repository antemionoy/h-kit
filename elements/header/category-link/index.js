import cx from 'classnames'
import { memoObj } from 'helpers'
import { memo } from 'react'
// import './category-link.scss'

function NavLink(props) {
  const {
    content,
    parentSelector,
    isActive,
    onMouseEnter = () => {},
    onMouseLeave = () => {},
  } = props
  return (
    <p
      className={cx('category-link', {
        'category-link--active': isActive,
        [`${parentSelector}`]: parentSelector,
      })}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {content}
    </p>
  )
}

function equalFunc(prev, next) {
  return memoObj.byActive(prev, next)
}
export default memo(NavLink)
