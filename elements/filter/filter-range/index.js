import cx from 'classnames'
import { Input } from 'elements'
import { memoObj, validate } from 'helpers'
import Icon from 'public/icons/geo-control-icon.svg'
import { memo, useCallback, useEffect, useState } from 'react'
import ReactSlider from 'react-slider'

const DISTANCE = 1000
const STEP = 10000

const RESET_ALL = 'Сбросить все'
const TYPE_NUMBER = 'number'
const FROM_INPUT_NAME = 'input-price-from'
const TO_INPUT_NAME = 'input-price-to'
const FROM_INPUT_PLACEHOLDER = 'От'
const TO_INPUT_PLACEHOLDER = 'До'

function FilterRange(props) {
  const {
    parentSelector,
    isDefault,
    defaultMin,
    defaultMax,
    min,
    max,
    placeholder,
    query,
    onReset = () => {},
    onChange = () => {},
  } = props

  const [inputValue, setInputValue] = useState({
    min: isDefault ? `${defaultMin}` : min,
    max: isDefault ? `${defaultMax}` : max,
  })

  const [dropdownStatus, setDropdownStatus] = useState(false)

  const onClickOutside = useCallback((status, e) => {
    try {
      if (!e.target.closest('.filter-range') && status) {
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
    setInputValue({
      min: isDefault ? `${defaultMin}` : min,
      max: isDefault ? `${defaultMax}` : max,
    })
  }, [min, max])

  const onToggleDropdown = useCallback((status) => {
    setDropdownStatus(status)
  }, [])

  const onResetClick = useCallback((query) => {
    setDropdownStatus(false)
    onReset(query, ['min', 'max'])
  }, [])

  const onSliderAfter = useCallback((query, [min, max]) => {
    onChange(query, min, max)
  }, [])

  const onInputChange = useCallback((slug, e) => {
    try {
      const { value } = e.target
      const validateObj = validate.number(value)
      if (validateObj.isValid) {
        setInputValue((prev) => ({
          ...prev,
          [slug]: value,
        }))
      }
    } catch (e) {}
  }, [])

  const onInputBlur = useCallback((slug, query, e) => {
    try {
      let newMinValue = slug === 'min' ? +e.target.value : +inputValue.min
      let newMaxValue = slug === 'max' ? +e.target.value : +inputValue.max

      if (newMinValue < defaultMin) {
        newMinValue = defaultMin
      } else if (newMinValue - DISTANCE >= defaultMax) {
        newMinValue = defaultMax - DISTANCE
      }

      if (newMaxValue > defaultMax) {
        newMaxValue = defaultMax
      } else if (newMaxValue - DISTANCE <= defaultMin) {
        newMaxValue = defaultMin + DISTANCE
      }

      if (newMinValue - DISTANCE >= newMaxValue) {
        newMaxValue = newMinValue + DISTANCE
      }

      onChange(query, newMinValue, newMaxValue)
      setInputValue({
        min: newMinValue.toString(),
        max: newMaxValue.toString(),
      })
    } catch (e) {}
  }, [])

  return (
    <div
      className={cx('filter-range', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      <button
        className={cx('filter-range__button', {
          'filter-range__button--open': dropdownStatus,
        })}
        onClick={onToggleDropdown.bind(this, !dropdownStatus)}
        type="button"
      >
        <div className="filter-range__button-text">{placeholder}</div>
        <Icon />
      </button>
      <div
        className={cx('filter-range__dropdown', {
          'filter-range__dropdown--active': dropdownStatus,
        })}
      >
        <div className="filter-range__inputs">
          <Input
            placeholder={FROM_INPUT_PLACEHOLDER}
            value={inputValue.min}
            onChange={onInputChange.bind(this, 'min')}
            onBlur={onInputBlur.bind(this, 'min', query)}
            type={TYPE_NUMBER}
            name={FROM_INPUT_NAME}
            parentSelector="filter-range__input"
            isSmall
          />
          <Input
            placeholder={TO_INPUT_PLACEHOLDER}
            value={inputValue.max}
            onChange={onInputChange.bind(this, 'max')}
            onBlur={onInputBlur.bind(this, 'max', query)}
            type={TYPE_NUMBER}
            name={TO_INPUT_NAME}
            parentSelector="filter-range__input"
            isSmall
          />
        </div>
        <div className="filter-range__control">
          <ReactSlider
            className="range-block"
            thumbClassName="range-block__thumb"
            trackClassName="range-block__track"
            value={[+inputValue.min, +inputValue.max]}
            min={defaultMin}
            max={defaultMax}
            onAfterChange={onSliderAfter.bind(this, query)}
            pearling
            minDistance={DISTANCE}
            step={STEP}
            ariaLabel={[FROM_INPUT_PLACEHOLDER, TO_INPUT_PLACEHOLDER]}
          />
          <div className="filter-range__result">
            <span>{inputValue.min} ₽</span>
            <span>{inputValue.max} ₽</span>
          </div>
        </div>
        <button
          className={cx('filter-range__reset', {
            'filter-range__reset--disabled': isDefault,
          })}
          tabIndex={dropdownStatus ? '0' : '-1'}
          onClick={onResetClick.bind(this, query)}
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
export default memo(FilterRange)
