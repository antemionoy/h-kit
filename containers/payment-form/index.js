import cx from 'classnames'
import orderStatic from 'config/static/order'
import { CommonButton, Input, P, Select, Textarea } from 'elements'
import { validate } from 'helpers'
import { useCallback, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const fields = {
  name: {
    type: 'text',
    name: 'name',
    placeholder: 'ФИО',
    validate: ['required'],
  },
  city: {
    type: 'text',
    name: 'city',
    placeholder: 'Город',
    validate: ['required'],
    options: ['СПБ МОК', 'МОСКВА МОК'],
  },
  email: {
    type: 'email',
    name: 'email',
    placeholder: 'Эл. почта',
    validate: ['email'],
  },
  phone: {
    type: 'tel',
    name: 'phone',
    placeholder: 'Телефон',
    validate: ['phone'],
  },
  id: {
    type: 'text',
    name: 'id',
    placeholder: 'Номер договора',
    validate: ['required'],
  },
  sum: {
    type: 'number',
    name: 'sum',
    placeholder: 'Сумма',
    validate: ['required'],
  },
  select: {
    type: 'text',
    name: 'sum',
    placeholder: 'Сумма',
    validate: ['required'],
    options: ['Предоплата', 'Оплата при получении'],
  },
  info: 'Минимальная сумма предоплаты 1\u00a0000\u00a0₽',

  message: {
    type: 'text',
    name: 'message',
    placeholder: 'Комментарий к оплате',
  },
}

const { confidentiality } = orderStatic

function PaymentForm({ parentSelector }) {
  const { contacts, activeContact } = useSelector((state) => state)
  const cities = contacts.map((contact) => contact.city)
  useEffect(() => {
    onCityChange(activeContact.city)
  }, [activeContact])

  const [fieldsValue, setFieldsValue] = useState({
    name: {
      value: '',
      hasError: false,
      errorText: '',
    },
    city: { value: activeContact.city, hasError: false, errorText: '' },
    email: {
      value: '',
      hasError: false,
      errorText: '',
    },
    phone: {
      value: '',
      hasError: false,
      errorText: '',
    },
    sum: {
      value: '',
      hasError: false,
      errorText: '',
    },
    id: {
      value: '',
      hasError: false,
      errorText: '',
    },
    select: {
      value: fields.select.options[0],
      hasError: false,
      errorText: '',
    },
    message: {
      value: '',
      hasError: false,
    },
    kitchenType: '',
    width: {
      value: '',
      hasError: false,
    },
    length: {
      value: '',
      hasError: false,
    },
  })

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

  const onSubmit = useCallback((fieldsValue, e) => {
    e.preventDefault()
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
            break
          }
        }
      }
    }
  }, [])

  const onPaymentChange = useCallback((value) => {
    fields.select.options.map((item) => {
      if (value === item) {
        setFieldsValue((prev) => ({
          ...prev,
          select: { ...prev.select, value },
        }))
      }
    })
  })
  const onCityChange = useCallback((value) => {
    setFieldsValue((prev) => ({
      ...prev,
      city: { ...prev.city, value },
    }))
  })

  return (
    <form
      className={cx('form', {
        [`${parentSelector}`]: parentSelector,
      })}
      noValidate
      onSubmit={onSubmit.bind(this, fieldsValue)}
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
          ariaLabel={fields.name.placeholder}
          parentSelector="form__input"
          autoComplete={fields.name.name}
        />

        <Select
          options={cities}
          name={fields.city.name}
          type={fields.city.type}
          onChange={onCityChange}
          value={fieldsValue.city.value}
          ariaLabel={fields.city.placeholder}
          parentSelector="form__input select-basic"
        />
      </div>
      <div className="form__field">
        <Input
          placeholder={fields.email.placeholder}
          value={fieldsValue.email.value}
          onChange={inputManipulate.bind(this, fields.email.name)}
          onBlur={inputManipulate.bind(this, fields.email.name)}
          onFocus={inputManipulate.bind(this, fields.email.name)}
          hasError={fieldsValue[fields.email.name].hasError}
          errorText={fieldsValue[fields.email.name].errorText}
          type={fields.email.type}
          name={fields.email.name}
          ariaLabel={fields.email.placeholder}
          parentSelector="form__input"
          autoComplete={fields.email.name}
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
          ariaLabel={fields.phone.placeholder}
          parentSelector="form__input"
          mask="+7 (999) 999-99-99"
          autoComplete={fields.phone.type}
        />
      </div>
      <div className="form__field">
        <Input
          placeholder={fields.id.placeholder}
          value={fieldsValue.id.value}
          onChange={inputManipulate.bind(this, fields.id.name)}
          onBlur={inputManipulate.bind(this, fields.id.name)}
          onFocus={inputManipulate.bind(this, fields.id.name)}
          hasError={fieldsValue[fields.id.name].hasError}
          errorText={fieldsValue[fields.id.name].errorText}
          type={fields.id.type}
          name={fields.id.name}
          ariaLabel={fields.id.placeholder}
          parentSelector="form__input form__input--full"
        />
      </div>
      <div className="form__field">
        <Input
          placeholder={fields.sum.placeholder}
          value={fieldsValue.sum.value}
          onChange={inputManipulateNumber.bind(this, fields.sum.name)}
          onBlur={inputManipulateNumber.bind(this, fields.sum.name)}
          onFocus={inputManipulateNumber.bind(this, fields.sum.name)}
          hasError={fieldsValue[fields.sum.name].hasError}
          errorText={fieldsValue[fields.sum.name].errorText}
          type={fields.sum.type}
          name={fields.sum.name}
          ariaLabel={fields.sum.placeholder}
          parentSelector="form__input input-money"
        />
        <Select
          options={fields.select.options}
          type={fields.select.type}
          name={fields.select.name}
          onChange={onPaymentChange}
          value={fieldsValue.select.value}
          ariaLabel={fields.select.name}
          parentSelector="form__input select-basic"
        />
        <p className="form__info">{fields.info}</p>
      </div>
      <div className="form__field">
        <Textarea
          placeholder={fields.message.placeholder}
          value={fieldsValue.message.value}
          onChange={inputManipulate.bind(this, fields.message.name)}
          type={fields.message.type}
          name={fields.message.name}
          ariaLabel={fields.message.placeholder}
          parentSelector="form__textarea"
        />
      </div>
      <div className="form__field form__field--bottom">
        <P content={confidentiality} withHTML parentSelector="form__link" />
        <CommonButton
          content="Оставить заявку"
          parentSelector="form__submit"
          type="submit"
        />
      </div>
    </form>
  )
}

export default PaymentForm
