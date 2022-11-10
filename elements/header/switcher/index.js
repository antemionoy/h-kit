import cx from 'classnames'
import { memoObj } from 'helpers'
import { memo } from 'react'
// import './switcher.scss'

function HeaderSwitcher(props) {
  const {
    isActive,
    onLeftClick = () => {},
    onRightClick = () => {},
    leftIcon,
    rightIcon,
    parentSelector,
  } = props
  return (
    <div
      className={cx('header-switcher', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      <div
        className={cx('header-switcher__item', {
          'header-switcher__item--active': isActive,
        })}
        onClick={onLeftClick}
      >
        {leftIcon}
      </div>
      <div
        className={cx('header-switcher__item', {
          'header-switcher__item--active': !isActive,
        })}
        onClick={onRightClick}
      >
        {rightIcon}
      </div>
    </div>
  )
}

function equalFunc(prev, next) {
  return memoObj.byActive(prev, next)
}
export default memo(HeaderSwitcher)
