import cx from 'classnames'
import Icon from 'public/icons/button-arrow-icon.svg'
import { memo } from 'react'
// import './control-button.scss'

const BACK = 'назад'
const FORWARD = 'вперед'

function ControlButton(props) {
  const {
    isCircle,
    isWhite,
    isGray,
    isDisabled,
    isReverse,
    parentSelector,
    onClick = () => {},
  } = props
  return (
    <button
      className={cx('button-control', {
        'button-control--circle': isCircle,
        'button-control--gray': isGray,
        'button-control--white': isWhite,
        'button-control--disabled': isDisabled,
        'button-control--reverse': isReverse,
        [`${parentSelector}`]: parentSelector,
      })}
      onClick={onClick}
      aria-label={isReverse ? BACK : FORWARD}
      type="button"
    >
      <Icon />
    </button>
  )
}

export default memo(ControlButton)
