import { useMutation } from '@apollo/client'
import cx from 'classnames'
import mock from 'config/static/header'
import {
  CommonButton,
  HeaderSwitcher,
  Input,
  P,
  PairButton,
  Select,
  Textarea,
  ToggleButton,
} from 'elements'
import CALLBACK_MUTATION from 'graphql/mutations/callback.graphql'
import QUESTION_MUTATION from 'graphql/mutations/question.graphql'
import { throttle, validate } from 'helpers'
import CallIcon from 'public/icons/call-icon.svg'
import MessageIcon from 'public/icons/message-icon.svg'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal, Portal } from 'components'
import { useModal } from 'helpers/useModal'
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
  day: {
    options: ['Сейчас', 'Сегодня', 'Завтра'],
    type: 'text',
    name: 'day',
  },
  time: {
    type: 'text',
    name: 'time',
    placeholder: 'Уточнить время',
  },
}

function HeaderForm(props) {
  const { parentSelector, content, setToast = () => {} } = props
  const {
    forms: { message, call, confidentiality },
  } = mock
  const isMobile = useSelector((state) => state.breakpoint.isMobile)
  let state = 'call'
  if (content) {
    state = 'message'
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
    day: {
      value: fields.day.options[0],
      hasError: false,
    },
    time: {
      value: '',
      hasError: false,
    },
  }

  const [currentState, setCurrentState] = useState(state)
  const [isExpand, setExpand] = useState(false)
  const [formFields, setFormFields] = useState(INITIAL_FIELD_VALUES)
  const { activeContact } = useSelector((state) => state)
  const [sendCallbackFormInit, { loading: loadingCallback }] = useMutation(
    CALLBACK_MUTATION
  )
  const sendCallbackForm = async (e) => {
    if (!loadingCallback) {
      return await sendCallbackFormInit(e)
    }
    return 'loading'
  }
  const [sendQuestionFormInit, { loading: loadingQuestion }] = useMutation(
    QUESTION_MUTATION
  )

  const sendQuestionForm = async (e) => {
    if (!loadingQuestion) {
      return await sendQuestionFormInit(e)
    }
    return 'loading'
  }
  const removeErrors = () => {
    const data = { ...formFields }
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key]
        element.hasError = false
      }
    }
    setFormFields(data)
  }
  useEffect(() => {
    removeErrors()
  }, [isExpand, currentState])

  useEffect(() => {
    document.addEventListener('click', onClickOutside.bind(this, isExpand))
    return () =>
      document.removeEventListener('click', onClickOutside.bind(this, isExpand))
  }, [isExpand])

  useEffect(() => {
    if (isExpand && !isMobile) {
      document.addEventListener('scroll', onScroll)
      return () => document.removeEventListener('scroll', onScroll)
    }
  }, [isExpand])

  const onScroll = useCallback(
    throttle(() => {
      setExpand(false)
    }, 500),
    []
  )

  const onClickOutside = useCallback(
    (status, e) => {
      try {
        if (!e.target.closest('.header-form') && status) {
          setExpand(false)
          if (!e.target.closest('.burger')) {
            document.body.style.overflow = ``
          }
        }
      } catch (e) {
        if (status) {
          setExpand(false)
          document.body.style.overflow = ``
        }
      }
    },
    [isMobile]
  )
  function inputManipulate(name, e) {
    const {
      type,
      target: { value },
    } = e
    switch (type) {
      case 'focus':
        if (formFields[name].hasError) {
          setFormFields((prev) => ({
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
              setFormFields((prev) => ({
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
        setFormFields((prev) => ({
          ...prev,
          [name]: { ...prev[name], value },
        }))
        break
      default:
        break
    }
  }
  const onDayChange = useCallback((value) => {
    fields.day.options.map((item) => {
      if (value === item) {
        setFormFields((prev) => ({
          ...prev,
          day: { ...prev.day, value },
        }))
      }
    })
  })
  const onToggle = useCallback((status, isMobile, e) => {
    e.preventDefault()
    setExpand(status)
    if (isMobile) {
      if (status) {
        document.body.style.overflow = `hidden`
      } else {
        document.body.style.overflow = ``
      }
    }
  }, [])
  const onSetCurrentState = useCallback((state) => {
    setCurrentState(state)
  }, [])
  const validateObject = useCallback((formFields) => {
    let errorCount = 0
    for (const field in formFields) {
      const { value } = formFields[field]
      const validateArr = fields[field] && fields[field].validate
      if (validateArr) {
        for (const validateField of validateArr) {
          const validateObj = validate[validateField](value)
          if (!validateObj.isValid) {
            setFormFields((prev) => ({
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
  const onSubmit = useCallback(async (formFields, formState, e) => {
    e.preventDefault()
    let errorCount = 0
    const submitData = { ...formFields }
    if (formState === 'call') {
      delete submitData.message
    }
    if (formState === 'message') {
      delete submitData.day
      delete submitData.time
    }
    errorCount = validateObject(submitData)
    try {
      if (errorCount === 0) {
        if (formState === 'call') {
          const data = await sendCallbackForm({
            variables: {
              name: formFields.name.value,
              phone: formFields.phone.value,
              when: `${formFields.day.value} ${formFields.time.value}`,
            },
          })
          if (data === 'loading') {
            return
          }
        }
        if (formState === 'message') {
          const data = await sendQuestionForm({
            variables: {
              name: formFields.name.value,
              phone: formFields.phone.value,
              message: formFields.message.value,
            },
          })
          if (data === 'loading') {
            return
          }
        }
        setToast({ text: 'Сообщение отправлено', show: true })
        closeModal()
        setFormFields(INITIAL_FIELD_VALUES)
      }
    } catch (error) {
      setToast({ text: 'Не удалось оправить, попробуйте позже', show: true })
    }
  }, [])

  const subTitle = useCallback((currentState) => {
    if (currentState === 'call') {
      return call.subTitle
    }
    if (currentState === 'message') {
      return message.subTitle
    }
  }, [])
  const caption = useCallback((currentState) => {
    if (currentState === 'call') {
      return call.caption
    }
    if (currentState === 'message') {
      return message.caption
    }
  }, [])
  const description = useCallback((currentState) => {
    if (currentState === 'call') {
      return call.description
    }
    if (currentState === 'message') {
      return message.description
    }
  }, [])
  const buttonText = useCallback((currentState) => {
    if (currentState === 'call') {
      return call.buttonText
    }
    if (currentState === 'message') {
      return message.buttonText
    }
  }, [])

  const { modalRef, toggleModal, closeModal, isModalOpen } = useModal()
  const phone = activeContact && activeContact.phone
  return (
    <div
      className={cx('header-form', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      {content ? (
        <PairButton content={content} onClick={toggleModal} />
      ) : (
        <ToggleButton
          content={phone}
          parentSelector="header-form__title"
          isActive={isExpand}
          onClick={toggleModal}
        />
      )}
      <Portal>
        <Modal
          className={isModalOpen ? 'modal-call modal--active' : 'modal-call'}
          onClose={closeModal}
          parentSelector="modal-form"
          ref={modalRef}
        >
          <form
            className="header-form header-form__body form"
            noValidate
            onSubmit={onSubmit.bind(this, formFields, currentState)}
          >
            <div
              className={cx('form__header', {
                'form__header--with-caption': caption(currentState).length > 0,
              })}
            >
              <HeaderSwitcher
                isActive={currentState === 'call'}
                onLeftClick={onSetCurrentState.bind(this, 'call')}
                onRightClick={onSetCurrentState.bind(this, 'message')}
                leftIcon={<CallIcon />}
                rightIcon={<MessageIcon />}
                parentSelector="form__switcher"
              />
              <div
                className="modal__close exit-btn exit-btn--active exit-btn--lg"
                onClick={closeModal}
              />
            </div>
            {currentState === 'call' && (
              <a href={`tel:${phone && phone.replace(/[\ \+\(\)\-]+/gi, '')}`}>
                <p className="h4 form__phone">{phone}</p>
              </a>
            )}
            {currentState === 'message' && (
              <p className="h4"> {message.title}</p>
            )}
            <P content={caption(currentState)} parentSelector="form__caption" />
            <p
              className={
                subTitle(currentState).length === 0
                  ? 'form__subtitle h4 form__subtitle--empty'
                  : 'form__subtitle h4'
              }
            >
              {subTitle(currentState)}
            </p>
            {currentState === 'call' && (
              <p className={cx('form__description')}>
                {description(currentState)}
              </p>
            )}
            <div className="form__field">
              <Input
                placeholder={fields.name.placeholder}
                value={formFields.name.value}
                onChange={inputManipulate.bind(this, fields.name.name)}
                onBlur={inputManipulate.bind(this, fields.name.name)}
                onFocus={inputManipulate.bind(this, fields.name.name)}
                hasError={formFields.name.hasError}
                errorText={formFields.name.errorText}
                type={fields.name.type}
                name={fields.name.name}
                parentSelector="form__input form__input--full"
                isSmall
                ariaLabel={fields.name.name}
              />
            </div>
            <div className="form__field">
              <Input
                placeholder={fields.phone.placeholder}
                value={formFields.phone.value}
                onChange={inputManipulate.bind(this, fields.phone.name)}
                onBlur={inputManipulate.bind(this, fields.phone.name)}
                onFocus={inputManipulate.bind(this, fields.phone.name)}
                hasError={formFields.phone.hasError}
                errorText={formFields.phone.errorText}
                type={fields.phone.type}
                name={fields.phone.name}
                parentSelector="form__input form__input--full"
                mask="+7 (999) 999-99-99"
                isSmall
                ariaLabel={fields.phone.name}
              />
            </div>
            <div
              className={cx('form__field', {
                'form__field--selector': currentState === 'call',
              })}
            >
              {currentState === 'message' && (
                <Textarea
                  placeholder={fields.message.placeholder}
                  value={formFields.message.value}
                  onChange={inputManipulate.bind(this, fields.message.name)}
                  onBlur={inputManipulate.bind(this, fields.message.name)}
                  onFocus={inputManipulate.bind(this, fields.message.name)}
                  hasError={formFields.message.hasError}
                  errorText={formFields.message.errorText}
                  name={fields.message.name}
                  parentSelector="form__textarea"
                  isSmall
                  ariaLabel={fields.message.name}
                />
              )}
              {currentState === 'call' && (
                <>
                  <p className={cx('form__call-caption')}>
                    {call.form_caption}
                  </p>

                  <Select
                    options={fields.day.options}
                    type={fields.day.type}
                    name={fields.day.name}
                    onChange={onDayChange}
                    value={formFields.day.value}
                    parentSelector="form__select"
                    ariaLabel={fields.day.name}
                  />
                  {formFields.day.value !== fields.day.options[0] && (
                    <Input
                      placeholder={fields.time.placeholder}
                      value={formFields.time.value}
                      onChange={inputManipulate.bind(this, fields.time.name)}
                      onBlur={inputManipulate.bind(this, fields.time.name)}
                      onFocus={inputManipulate.bind(this, fields.time.name)}
                      hasError={formFields.time.hasError}
                      errorText={formFields.time.errorText}
                      type={fields.time.type}
                      name={fields.time.name}
                      parentSelector="form__input form__input--sibling"
                      mask="99:99"
                      isSmall
                      isWhite
                      ariaLabel={fields.time.name}
                    />
                  )}
                </>
              )}
            </div>
            <CommonButton
              content={buttonText(currentState)}
              parentSelector={cx('form__submit', {
                'form__submit-message': currentState === 'message',
              })}
              isWide
              type="submit"
            />
            <P content={confidentiality} withHTML parentSelector="form__link" />
          </form>
        </Modal>
      </Portal>
    </div>
  )
}

export default memo(HeaderForm)
