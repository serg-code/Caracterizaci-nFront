import Vue from 'vue'
import moment from 'moment'
import axios from 'axios'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
import {
  required,
  email,
  // eslint-disable-next-line camelcase
  max_value,
  // eslint-disable-next-line camelcase
  min_value,
  confirmed,
  digits,
  numeric,
} from 'vee-validate/dist/rules'

const dateFormat = 'DD/MM/YYYY'

const dateValidate = (value, operator) => {
  if (!value) return true
  const values = value.split(operator)
  const [day, month, year] = operator === '/' ? [values[0], values[1], values[2]] : [values[2], values[1], values[0]]
  const newValue = [Number.isInteger(Number(day)) && day, Number.isInteger(Number(month)) && month, Number.isInteger(Number(year)) && year].filter(x => x).join('/')

  return !!(newValue && (newValue.length === 10) && moment(newValue, dateFormat).isValid())
}

extend('required', {
  ...required,
  message: 'The field {_field_} is required',
})

extend('email', {
  ...email,
  message: 'The email is not valid',
})

extend('numeric', {
  ...numeric,
  message: 'The field {_field_} may only contain numeric characters',
})

extend('confirmed', {
  params: ['target'],
  ...confirmed,
  message: 'The {target} confirmation does not match',
})

extend('max_value', {
  params: ['max'],
  // eslint-disable-next-line camelcase
  ...max_value,
  message: 'The {_field_} field must be {max} or less',
})

extend('min_value', {
  params: ['min'],
  // eslint-disable-next-line camelcase
  ...min_value,
  message: 'The {_field_} field must be {min} or more',
})

extend('validDate', {
  validate(value) {
    return dateValidate(value, '/')
  },
  message: 'The {_field_} field is not valid',
})

extend('validPhone', {
  validate(value) {
    if (!value) return true
    const number = Number(value.split('-').filter(x => x).join(''))

    return (Number.isInteger(number) && String(number)?.length === 10) || 'The {_field_} field must be 10 digits'
  },
})

extend('min_date', {
  params: ['min'],
  validate(value, { min }) {
    if (!min || !dateValidate(min, '-')) return true

    return moment(value, dateFormat).valueOf() >= moment(min).valueOf() || `The {_field_} field must be ${moment(min).format(dateFormat)} or more`
  },
})

extend('max_date', {
  params: ['max'],
  validate(value, { max }) {
    if (!max || !dateValidate(max, '-')) return true

    return moment(value, dateFormat).valueOf() <= moment(max).valueOf() || `The {_field_} field must be ${moment(max).format(dateFormat)} or less`
  },
})

extend('minimumAge', {
  params: ['param'],
  validate(value, { param }) {
    return ((moment().diff(moment(value, dateFormat), 'years')) >= Number(param))
  },
  message: 'You must be at least {param} years old to order tests on this website',
})

extend('passwordLength', {
  params: ['param'],
  validate(value, { param }) {
    const length = Number(param)
    if (!Number.isInteger(length)) return false

    return String(value).length >= length
  },
  message: 'The {_field_} field must be at least {param} characters in length',
})

extend('uniqueUserEmail', {
  async validate(value) {
    if (!value) return true

    return axios.get(`/api/search_user?email=${value}`)
      .then(() => false)
      .catch(() => true)
  },
  message: 'The {_field_} field already exists',
})

extend('digits', {
  params: ['length'],
  ...digits,
  message: 'The {_field_} field must be numeric and contains exactly {length} digits',
})

extend('maxlength', {
  params: ['length'],
  validate(value, { length }) {
    return String(value).length <= length
  },
  message: 'El campo {_field_} debe tener como maximo {length} caracteres',
})

Vue.use({
  install(vc) {
    vc.component('ValidationProvider', ValidationProvider)
    vc.component('ValidationObserver', ValidationObserver)
  },
})
