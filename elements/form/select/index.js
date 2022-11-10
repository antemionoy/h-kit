import cx from 'classnames'
import { memoObj } from 'helpers'
import Icon from 'public/icons/dropdown-arrow-icon.svg'
import { memo, useCallback, useEffect, useState } from 'react'
// import './select.scss'

function Select(props) {
  const {
    options = [],
    type = 'text',
    name = '',
    ariaLabel,
    onChange = () => {},
    value = options[0] || '',
    parentSelector,
  } = props

  const [isOpen, setIsOpen] = useState(false)
  const onOpenDropdown = useCallback((status) => {
    setIsOpen(!status)
  }, [])

  const onClickOutside = useCallback((status, e) => {
    try {
      if (!e.target.closest('.select') && status) {
        setIsOpen(false)
      }
    } catch (e) {
      if (status) {
        setIsOpen(false)
      }
    }
  }, [])

  useEffect(() => {
    document.addEventListener('click', onClickOutside.bind(this, isOpen))
    return () =>
      document.removeEventListener('click', onClickOutside.bind(this, isOpen))
  }, [isOpen])

  return (
    <div
      className={cx('select', {
        [`${parentSelector}`]: parentSelector,
      })}
      onClick={onOpenDropdown.bind(this, isOpen)}
    >
      <input
        onChange={onChange}
        type={type}
        value={value}
        name={name}
        aria-label={ariaLabel}
      />
      <div
        className={cx('select__dropdown', {
          'select__dropdown--active': isOpen,
        })}
      >
        {options.map((item, index) => (
          <div
            key={index}
            className={cx('select__option', {
              'select__option--active': item === value,
            })}
            onClick={onChange.bind(this, item)}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="select__icon">
        <Icon />
      </div>
    </div>
  )
}

function equalFunc(prev, next) {
  return memoObj.byValue(prev, next)
}
export default memo(Select)
