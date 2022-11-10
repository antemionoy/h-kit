import cx from 'classnames'
import { memoObj } from 'helpers'
import { memo } from 'react'
import InputMask from 'react-input-mask'

// import './input.scss'

function Input(props) {
  const {
    placeholder = '',
    hasError = false,
    errorText = '',
    type = 'text',
    name = '',
    ariaLabel,
    onFocus = () => {},
    onBlur = () => {},
    onChange = () => {},
    value = '',
    parentSelector,
    mask = null,
    isSmall,
    isWhite,
    autoComplete,
  } = props

  return (
    <div className={cx('', { [`${parentSelector}`]: parentSelector })}>
      <div
        className={cx('input', {
          'input--error': hasError,
          'input--small': isSmall,
          'input--white': isWhite,
        })}
      >
        {mask && (
          <InputMask
            mask={mask}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            type={type}
            name={name}
            aria-label={ariaLabel || placeholder}
            autoComplete={autoComplete}
          />
        )}
        {!mask && (
          <input
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            type={type === 'number' ? 'text' : type}
            value={value}
            name={name}
            aria-label={ariaLabel || placeholder}
            autoComplete={autoComplete}
          />
        )}
        <div
          className={cx('input__placeholder', {
            'input__placeholder--active': value.length > 0,
          })}
        >
          {placeholder}
        </div>
      </div>
      <div
        className={cx('form-error', {
          'form-error--active': hasError,
        })}
      >
        {errorText}
      </div>
    </div>
  )
}

function equalFunc(prev, next) {
  return memoObj.byValue(prev, next) && memoObj.byErrorStatus(prev, next)
}

export default memo(Input)
