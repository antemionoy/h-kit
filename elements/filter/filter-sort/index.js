import cx from 'classnames'
import { memoObj } from 'helpers'
import Icon from 'public/icons/geo-control-icon.svg'
import { memo, useCallback, useEffect, useState } from 'react'

function FilterSort(props) {
  const {
    parentSelector,
    list = [],
    onClick = () => {},
    activeItem,
    query,
  } = props

  const [dropdownStatus, setDropdownStatus] = useState(false)

  const onClickOutside = useCallback((status, e) => {
    try {
      if (!e.target.closest('.filter-sort') && status) {
        setDropdownStatus(false)
      }
    } catch (err) {
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

  const onToggleDropdown = useCallback((status) => {
    setDropdownStatus(status)
  }, [])

  const onItemClick = useCallback((query, slug) => {
    setDropdownStatus(false)
    onClick(query, slug)
  }, [])

  return (
    <div
      className={cx('filter-sort', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      <button
        className={cx('filter-sort__text filter-sort__active', {
          'filter-sort__active--open': dropdownStatus,
        })}
        type="button"
        onClick={onToggleDropdown.bind(this, !dropdownStatus)}
      >
        {activeItem}
        <Icon />
      </button>
      <div
        className={cx('filter-sort__dropdown', {
          'filter-sort__dropdown--active': dropdownStatus,
        })}
      >
        {list.map((item, index) => {
          const isActive = item.name === activeItem
          return (
            <button
              className={cx('filter-sort__text filter-sort__city', {
                'filter-sort__city--active': isActive,
              })}
              type="button"
              key={index}
              onClick={onItemClick.bind(this, query, item.slug)}
              tabIndex={dropdownStatus ? '0' : '-1'}
            >
              {item.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function equalFunc(prev, next) {
  return memoObj.byKey(prev, next, 'query')
}
export default memo(FilterSort)
