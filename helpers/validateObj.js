const validateObj = {
  required: (value) => ({
    isValid: value.length > 0,
    errorText: 'Поле необходимо заполнить',
  }),
  phone: (value) => ({
    isValid: /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/gm.test(
      value
    ),
    errorText: 'Введите корректный номер телефона',
  }),
  email: (value) => ({
    isValid: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    ),
    errorText: 'Введите корректный email',
  }),
  number: (value) => ({
    isValid: /^(\s*|[1-9]\d*|[1-9]\d*?\.\d?\d?)$/.test(value),
  }),
}
export default validateObj
