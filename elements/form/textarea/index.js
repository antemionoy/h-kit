import cx from 'classnames'
import { textareaResize } from 'helpers'
import { memo, useState } from 'react'
// import './textarea.scss'

function Textarea(props) {
  const {
    placeholder = '',
    name = '',
    ariaLabel,
    onFocus = () => {},
    onBlur = () => {},
    onChange = () => {},
    hasError,
    errorText,
    value = '',
    parentSelector,
    isSmall,
    isWhite,
  } = props

  const [rows, setRows] = useState(7)

  function onTextareaChange(e) {
    textareaResize(e, setRows)
    onChange(e)
  }

  return (
    <>
      <div
        className={cx('textarea', {
          'textarea--error': hasError,
          'textarea--small': isSmall,
          'textarea--white': isWhite,
          [`${parentSelector}`]: parentSelector,
        })}
      >
        <textarea
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onTextareaChange}
          value={value}
          name={name}
          rows={rows}
          aria-label={ariaLabel || placeholder}
        />
        <div
          className={cx('textarea__placeholder', {
            'textarea__placeholder--active': value.length > 0,
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
    </>
  )
}

export default memo(Textarea)
