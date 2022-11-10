import cx from 'classnames'
import { memoObj } from 'helpers'
import Icon from 'public/icons/button-arrow-icon.svg'
import { memo } from 'react'
// import './toggle-button.scss'

function ToggleButton(props) {
  const {
    content,
    isActive,
    isDisabled,
    parentSelector,
    onClick = () => {},
  } = props
  return (
    <button
      className={cx('button-toggle', {
        'button-toggle--disabled': isDisabled,
        'button-toggle--active': isActive,
        [`${parentSelector}`]: parentSelector,
      })}
      onClick={onClick}
      aria-label={isActive ? 'Свернуть' : 'Развернуть'}
      type="button"
    >
      {content}
      <span className="button-toggle__icon">
        <Icon />
      </span>
    </button>
  )
}

export default memo(ToggleButton)
