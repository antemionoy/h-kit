import cx from 'classnames'
import { memo } from 'react'

function CommonButton(props) {
  const {
    content,
    children,
    isDisabled,
    isWide,
    parentSelector,
    onClick = () => {},
    type = 'button',
  } = props
  return (
    <button
      className={cx('button-common', {
        'button-common--wide': isWide,
        'button-common--disabled': isDisabled,
        [`${parentSelector}`]: parentSelector,
      })}
      onClick={onClick}
      type={type}
    >
      {content}
      {children}
    </button>
  )
}

export default memo(CommonButton)
