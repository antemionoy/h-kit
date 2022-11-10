import cx from 'classnames'
import orderStatic from 'config/static/order'
import {
  CommonButton,
  Input,
  InputRadio,
  P,
  Textarea,
  ToggleButton,
} from 'elements'
import { validate } from 'helpers'
import KitchenAngleIcon from 'public/icons/kitchen-angle.svg'
import KitchenCompactIcon from 'public/icons/kitchen-compact.svg'
import KitchenIslandIcon from 'public/icons/kitchen-island.svg'
import KitchenPIcon from 'public/icons/kitchen-p.svg'
import KitchenStraightIcon from 'public/icons/kitchen-straight.svg'
import { createElement, useCallback, useRef, useState } from 'react'

// import './form-basic.scss'

const fields = {
  name: {
    type: 'text',
    name: 'name',
    placeholder: 'Имя',
    // validate: ['required'],
  },
  phone: {
    type: 'tel',
    name: 'phone',
    placeholder: 'Телефон',
    validate: ['phone'],
  },
  message: {
    type: 'text',
    name: 'message',
    placeholder: 'Сообщение',
    // validate: ['required'],
  },
  kitchenType: {
    items: [
      {
        name: 'straight-form',
        placeholder: 'Прямая',
        img: KitchenStraightIcon,
        inputs: 1,
      },
      {
        name: 'angle-form',
        placeholder: 'Угловая',
        img: KitchenAngleIcon,
        inputs: 2,
      },
      {
        name: 'p-form',
        placeholder: 'П-образная',
        img: KitchenPIcon,
        inputs: 3,
      },
      {
        name: 'island-form',
        placeholder: 'Островная',
        img: KitchenIslandIcon,
        inputs: 2,
      },
      {
        name: 'compact-form',
        placeholder: 'Компактная',
        img: KitchenCompactIcon,
        inputs: 1,
      },
    ],
  },
  dimensions: {
    title: 'Введите длины сторон кухни',
    inputs: {
      type: 'number',
      name: 'length',
      placeholder: 'Длина',
    },
  },
}

const INITIAL_FIELD_VALUES = {
  name: {
    value: '',
    hasError: false,
    errorText: '',
  },
  phone: {
    value: '',
    hasError: false,
    errorText: '',
  },
  message: {
    value: '',
    hasError: false,
  },
  kitchenType: {
    value: '',
    hasError: false,
  },
  length0: {
    value: '',
    hasError: false,
  },
  length1: {
    value: '',
    hasError: false,
  },
  length2: {
    value: '',
    hasError: false,
  },
}

const { confidentiality, kitchenSize } = orderStatic

function FormBasic({
  buttonText,
  hasKitchen,
  parentSelector,
  expandTitle = kitchenSize,
  sendForm,
  kitchenId,
  materialId,
  technicId,
  sinkId,
  vacancyId,
  setToast = () => {},
  isGray,
  onSubmit: onSubmitInit = () => {},
}) {
  const hideRef = useRef(null)
  const [isExpand, setExpand] = useState(false)
  const [fieldsValue, setFieldsValue] = useState(INITIAL_FIELD_VALUES)
  const [kitchenType, setKitchenType] = useState()
  let lengths = 0 // inputs
  function inputManipulateNumber(name, e) {
    const {
      type,
      target: { value },
    } = e
    switch (type) {
      case 'focus':
        if (fieldsValue[name].hasError) {
          setFieldsValue((prev) => ({
            ...prev,
            [name]: { ...prev[name], hasError: false },
          }))
        }
        return
      case 'blur':
        const validateArr = fields[name].validate
        if (validateArr && value.length > 0) {
          for (const validateField of validateArr) {
            const validateObj = validate[validateField](value)
            if (!validateObj.isValid) {
              setFieldsValue((prev) => ({
                ...prev,
                [name]: {
                  ...prev[name],
                  hasError: true,
                  errorText: validateObj.errorText,
                },
              }))
              break
            }
          }
        }
        return
      case 'change':
        const validateObj = validate.number(value)
        if (validateObj.isValid) {
          setFieldsValue((prev) => ({
            ...prev,
            [name]: { ...prev[name], value },
          }))
        }
        break
      default:
        break
    }
  }

  function inputManipulate(name, e) {
    const {
      type,
      target: { value },
    } = e
    switch (type) {
      case 'focus':
        if (fieldsValue[name].hasError) {
          setFieldsValue((prev) => ({
            ...prev,
            [name]: { ...prev[name], hasError: false },
          }))
        }
        return
      case 'blur':
        const validateArr = fields[name].validate
        if (validateArr && value.length > 0) {
          for (const validateField of validateArr) {
            const validateObj = validate[validateField](value)
            if (!validateObj.isValid) {
              setFieldsValue((prev) => ({
                ...prev,
                [name]: {
                  ...prev[name],
                  hasError: true,
                  errorText: validateObj.errorText,
                },
              }))
              break
            }
          }
        }
        return
      case 'change':
        setFieldsValue((prev) => ({
          ...prev,
          [name]: { ...prev[name], value },
        }))
        break
      default:
        break
    }
  }

  const validateObject = useCallback((fieldsValue) => {
    let errorCount = 0

    for (const field in fieldsValue) {
      const { value, hasError } = fieldsValue[field]
      if (hasError) {
        errorCount++
      }
      const validateArr = fields[field] && fields[field].validate
      if (validateArr) {
        for (const validateField of validateArr) {
          const validateObj = validate[validateField](value)
          if (!validateObj.isValid) {
            setFieldsValue((prev) => ({
              ...prev,
              [field]: {
                ...prev[field],
                hasError: true,
                errorText: validateObj.errorText,
              },
            }))
            errorCount++
            break
          }
        }
      }
    }
    return errorCount
  }, [])

  const onSubmit = async (fieldsValue, type, e) => {
    e.preventDefault()
    const errorCount = validateObject(fieldsValue)
    const params =
      type &&
      `${
        type.inputs > 0
          ? fieldsValue.length0.value &&
            `Длина 1: ${fieldsValue.length0.value}.`
          : ''
      }${
        type.inputs > 1
          ? fieldsValue.length1.value &&
            ` Длина 2: ${fieldsValue.length1.value}.`
          : ''
      }${
        type.inputs > 2
          ? fieldsValue.length2.value &&
            ` Длина 3: ${fieldsValue.length2.value}.`
          : ''
      }`
    try {
      if (errorCount === 0) {
        let variables = {}
        if (kitchenId) {
          variables.kitchen_id = kitchenId
        }
        if (materialId) {
          variables.material_id = materialId
        }
        if (sinkId) {
          variables.sink_id = sinkId
        }
        if (technicId) {
          variables.technic_id = technicId
        }
        if (vacancyId) {
          variables.vacancy_id = vacancyId
        }
        if (!fieldsValue.name.hasError) {
          variables.name = fieldsValue.name.value
        }
        if (!fieldsValue.phone.hasError) {
          variables.phone = fieldsValue.phone.value
        }
        if (!fieldsValue.message.hasError) {
          variables.message = fieldsValue.message.value
        }
        if (type) {
          variables.type = type.placeholder
        }
        if (params) {
          variables.params = params
        }

        const data = await sendForm({
          variables,
        })
        if (data === 'loading') {
          return
        }
        if (data.errors) {
          throw data.errors
        }
        setToast({ text: 'Сообщение отправлено', show: true })
        onSubmitInit()
        setFieldsValue(INITIAL_FIELD_VALUES)
      }
    } catch (error) {
      setToast({ text: 'Не удалось оправить, попробуйте позже', show: true })
    }
  }
  const onToggle = useCallback((status, e) => {
    e.preventDefault()
    setExpand(status)
    if (hideRef && hideRef.current) {
      const { style } = hideRef.current
      // style.maxHeight = `${status ? 9999 : 0}px`
    }
  }, [])
  return (
    <form
      className={cx('form', {
        [`${parentSelector}`]: parentSelector,
      })}
      noValidate
      onSubmit={onSubmit.bind(this, fieldsValue, kitchenType)}
      autoComplete="off"
    >
      <div className="form__field">
        <Input
          placeholder={fields.name.placeholder}
          value={fieldsValue.name.value}
          onChange={inputManipulate.bind(this, fields.name.name)}
          onBlur={inputManipulate.bind(this, fields.name.name)}
          onFocus={inputManipulate.bind(this, fields.name.name)}
          hasError={fieldsValue[fields.name.name].hasError}
          errorText={fieldsValue[fields.name.name].errorText}
          type={fields.name.type}
          name={fields.name.name}
          parentSelector="form__input"
          ariaLabel={fields.name.name}
          autoComplete={fields.name.name}
          isWhite={isGray}
        />
        <Input
          placeholder={fields.phone.placeholder}
          value={fieldsValue.phone.value}
          onChange={inputManipulate.bind(this, fields.phone.name)}
          onBlur={inputManipulate.bind(this, fields.phone.name)}
          onFocus={inputManipulate.bind(this, fields.phone.name)}
          hasError={fieldsValue[fields.phone.name].hasError}
          errorText={fieldsValue[fields.phone.name].errorText}
          type={fields.phone.type}
          name={fields.phone.name}
          parentSelector="form__input"
          mask="+7 (999) 999-99-99"
          ariaLabel={fields.phone.name}
          autoComplete={fields.phone.type}
          isWhite={isGray}
        />
      </div>
      <div className="form__field">
        <Textarea
          placeholder={fields.message.placeholder}
          value={fieldsValue.message.value}
          onChange={inputManipulate.bind(this, fields.message.name)}
          onBlur={inputManipulate.bind(this, fields.message.name)}
          onFocus={inputManipulate.bind(this, fields.message.name)}
          type={fields.message.type}
          name={fields.message.name}
          parentSelector="form__textarea"
          ariaLabel={fields.message.name}
          isWhite={isGray}
          hasError={fieldsValue[fields.message.name].hasError}
          errorText={fieldsValue[fields.message.name].errorText}
        />
      </div>
      {hasKitchen && (
        <ToggleButton
          parentSelector="form__show"
          content={expandTitle}
          isActive={isExpand}
          onClick={onToggle.bind(this, !isExpand)}
        />
      )}
      {hasKitchen && (
        <div
          className={cx('form__hide', {
            'form__hide--active': isExpand,
          })}
          ref={hideRef}
        >
          <P
            content="Выберите планировку кухни"
            parentSelector="form__hide-title"
          />
          <div className="form__group">
            {fields.kitchenType.items.map((item, index) => (
              <InputRadio
                key={index}
                placeholder={item.placeholder}
                name={item.name}
                onChange={() => setKitchenType(item)}
                value={item.placeholder}
                activeValue={kitchenType?.placeholder}
                parentSelector="form__radio"
              />
            ))}
          </div>
          <div className="form__sizes">
            <ul className="form__images">
              {fields.kitchenType.items.map((item, index) => {
                item.placeholder === kitchenType?.placeholder
                  ? (lengths = item.inputs)
                  : null
                return (
                  <li
                    className={`form__image ${
                      item.placeholder === kitchenType?.placeholder
                        ? 'form__image--active'
                        : ''
                    }`}
                    key={index}
                    onClick={() => setKitchenType(item)}
                  >
                    {createElement(item.img)}
                  </li>
                )
              })}
            </ul>
            <div className="form__dimensions">
              {[...Array(lengths)].map((e, index) => (
                <Input
                  key={index}
                  placeholder={`${fields.dimensions.inputs.placeholder} (${
                    index + 1
                  })`}
                  value={
                    fieldsValue[fields.dimensions.inputs.name + index].value
                  }
                  onChange={inputManipulateNumber.bind(
                    this,
                    fields.dimensions.inputs.name + index
                  )}
                  type={fields.dimensions.inputs.type}
                  name={fields.dimensions.inputs.name}
                  parentSelector="form__input form__input--dimension"
                  ariaLabel={`${fields.dimensions.inputs.placeholder} (${
                    index + 1
                  })`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="form__field form__field--bottom">
        <P content={confidentiality} withHTML parentSelector="form__link" />
        <CommonButton
          content={buttonText}
          parentSelector="form__submit"
          type="submit"
        />
      </div>
    </form>
  )
}

export default FormBasic
