import cx from 'classnames'
import { memoObj } from 'helpers'
import { memo } from 'react'
// import './radio.scss'

function InputRadio(props) {
  const {
    placeholder = '',
    name = '',
    onChange = () => {},
    value = '',
    activeValue = '',
    parentSelector,
  } = props
  return (
    <div
      className={cx('input-radio', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      <label
        className={cx('input-radio__label', {
          'input-radio__label-active': value === activeValue,
        })}
      >
        <input
          className="input-radio__input"
          type="radio"
          name={name}
          value={value}
          checked={value === activeValue}
          onChange={onChange}
          aria-label={placeholder}
        />
        {/* <div className="input-radio__circle" /> */}
        {placeholder}
      </label>
    </div>
  )
}

function equalFunc(prev, next) {
  return memoObj.byActiveValue(prev, next)
}
export default memo(InputRadio)
