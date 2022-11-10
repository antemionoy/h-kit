import cx from 'classnames'
import { RouterLink } from 'elements'
import Icon from 'public/icons/button-arrow-icon.svg'
import { memo } from 'react'
// import './pair-button.scss'

const BACK_BTN_TEXT = 'назад к'

function PairButton(props) {
  const {
    content,
    isDisabled,
    parentSelector,
    onClick = () => {},
    href = null,
    as,
    disableKeyboard = false,
    isBack,
    ariaLabel,
  } = props

  if (href) {
    return (
      <RouterLink
        href={href}
        as={as}
        parentSelector="router-link--button"
        disableKeyboard={disableKeyboard}
        ariaLabel={isBack ? BACK_BTN_TEXT : ariaLabel || null}
        tabIndex={disableKeyboard ? '-1' : '0'}
      >
        <div
          className={cx('button-pair', {
            'button-pair--disabled': isDisabled,
            'button-pair--back': isBack,
            [`${parentSelector}`]: parentSelector,
          })}
        >
          {content}
          <div className="button-pair__icon">
            <Icon />
          </div>
        </div>
      </RouterLink>
    )
  }
  return (
    <button
      className={cx('button-pair', {
        'button-pair--disabled': isDisabled,
        'button-pair--back': isBack,
        [`${parentSelector}`]: parentSelector,
      })}
      onClick={onClick}
      type="button"
    >
      {content}
      <span className="button-pair__icon">
        <Icon />
      </span>
    </button>
  )
}

export default memo(PairButton)
