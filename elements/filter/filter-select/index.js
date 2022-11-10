import cx from 'classnames'
import { memoObj } from 'helpers'
import CheckIcon from 'public/icons/checkbox-icon.svg'
import Icon from 'public/icons/geo-control-icon.svg'
import { memo, useCallback, useEffect, useState } from 'react'
import { Image } from 'elements'
const RESET_ALL = 'Сбросить все'

function FilterSelect(props) {
  const {
    parentSelector,
    list = [],
    onClick = () => {},
    activeArr = [],
    placeholder,
    countOptions = 0,
    type,
    slug,
    query,
    onReset = () => {},
    index,
  } = props

  const [dropdownStatus, setDropdownStatus] = useState(false)

  const onClickOutside = useCallback((status, e) => {
    try {
      if (!e.target.closest(`.filter-select-${index}`) && status) {
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

  const onToggleDropdown = useCallback((status) => {
    setDropdownStatus(status)
  }, [])

  const onItemClick = useCallback((groupSlug, slug, query, alreadyHas) => {
    onClick(groupSlug, slug, query, alreadyHas)
  }, [])

  const onResetClick = useCallback((query, slug) => {
    setDropdownStatus(false)
    onReset(query, slug)
  }, [])
  return (
    <div
      className={cx('filter-select', {
        [`filter-select-${index}`]: typeof index === 'number',
        [`${parentSelector}`]: parentSelector,
      })}
    >
      <div
        className={cx('filter-select__button', {
          'filter-select__button--open': dropdownStatus,
        })}
        onClick={onToggleDropdown.bind(this, !dropdownStatus)}
      >
        <div className="filter-select__button-text">
          {placeholder}
          {typeof countOptions === 'number' && countOptions > 0 && (
            <div className="filter-select__button-count">{countOptions}</div>
          )}
        </div>
        <Icon />
      </div>
      <div
        className={cx('filter-select__dropdown', {
          'filter-select__dropdown--active': dropdownStatus,
        })}
      >
        {Object.keys(list).map((key) => {
          const isActive = activeArr.includes(list[key].slug)
          return (
            <div
              className={cx('filter-select__option', {
                'filter-select__option--active': isActive,
              })}
              key={key}
              onClick={onItemClick.bind(
                this,
                slug,
                list[key].slug,
                query,
                isActive
              )}
            >
              {list[key].icon && (
                <div
                  className={cx('filter-select__option-icon', {
                    'filter-select__option-icon--square': type === 'form',
                    'filter-select__option-icon--round': type === 'color',
                  })}
                >
                  <div
                    className={cx('filter-select__option-icon-wrapper', {
                      'filter-select__option-icon-wrapper--square':
                        type === 'form',
                      'filter-select__option-icon-wrapper--round':
                        type === 'color',
                    })}
                  >
                    <Image
                      src={list[key].icon.path.normal}
                      srcSet={`${list[key].icon.path.normal} 1x, ${list[key].icon.path.retina} 2x`}
                      alt={key}
                    />
                  </div>
                </div>
              )}
              {!list[key].icon && (
                <div className="filter-select__option-checkbox">
                  <CheckIcon />
                </div>
              )}
              {list[key].name}
            </div>
          )
        })}
        <button
          className={cx('filter-select__reset', {
            'filter-select__reset--disabled': !countOptions,
          })}
          tabIndex={dropdownStatus ? '0' : '-1'}
          onClick={onResetClick.bind(this, query, slug)}
          type="button"
        >
          {RESET_ALL}
        </button>
      </div>
    </div>
  )
}

function equalFunc(prev, next) {
  return memoObj.byKey(prev, next, 'query')
}
export default memo(FilterSelect)
