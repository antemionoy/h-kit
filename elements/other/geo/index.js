import cx from 'classnames'
import { memoObj } from 'helpers'
import Icon from 'public/icons/geo-control-icon.svg'
import { memo, useCallback, useEffect, useState, useRef } from 'react'

function Geo(props) {
  const {
    parentSelector,
    list,
    onClick,
    activeCity,
    hasScroll = false,
    onResetHasScroll = () => {},
  } = props

  const [dropdownStatus, setDropdownStatus] = useState(false)

  const onClickOutside = useCallback((status, e) => {
    try {
      if (!e.target.closest('.geo') && status) {
        setDropdownStatus(false)
      }
    } catch (e) {
      if (status) {
        setDropdownStatus(false)
      }
    }
  }, [])

  useEffect(() => {
    document.addEventListener(
      'click',
      onClickOutside.bind(this, dropdownStatus)
    )
    return () =>
      document.removeEventListener(
        'click',
        onClickOutside.bind(this, dropdownStatus)
      )
  }, [dropdownStatus])

  useEffect(() => {
    if (hasScroll) {
      setDropdownStatus(false)
    }
  }, [hasScroll])

  const onToggleDropdown = useCallback((status) => {
    setDropdownStatus(status)
    if (status) {
      onResetHasScroll()
    }
  }, [])

  const onItemClick = useCallback((city) => {
    setDropdownStatus(false)
    onClick(city)
  }, [])

  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.style.display = 'block'
    }
  }, [])
  return (
    <div
      className={cx('geo', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      <p
        className={cx('geo__text geo__active', {
          'geo__active--open': dropdownStatus,
        })}
        onClick={onToggleDropdown.bind(this, !dropdownStatus)}
      >
        {activeCity}
        <Icon />
      </p>
      <div
        className={cx('geo__dropdown', {
          'geo__dropdown--active': dropdownStatus,
        })}
        ref={ref}
      >
        {list.map((item, index) => {
          const isActive = item.city === activeCity
          return (
            <p
              className={cx('geo__text geo__city', {
                'geo__city--active': isActive,
              })}
              key={index}
              onClick={onItemClick.bind(this, item)}
            >
              {item.city}
            </p>
          )
        })}
      </div>
    </div>
  )
}

export default memo(Geo)
