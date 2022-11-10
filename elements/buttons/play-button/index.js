import cx from 'classnames'
import Icon from 'public/icons/button-play-icon.svg'
import { memo } from 'react'
// import './play-button.scss'

function PlayButton(props) {
  const { isDisabled, parentSelector, onClick = () => {} } = props
  return (
    <button
      className={cx('button-play', {
        'button-play--disabled': isDisabled,
        [`${parentSelector}`]: parentSelector,
      })}
      onClick={onClick}
      aria-label="Воспроизвести"
      type="button"
    >
      <Icon />
    </button>
  )
}

export default memo(PlayButton)
