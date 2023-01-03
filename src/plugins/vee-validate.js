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
  message: 'El campo {_field_} es requerido',
})

extend('email', {
  ...email,
  message: 'El Email no es válido',
})

extend('numeric', {
  ...numeric,
  message: 'El campo {_field_} solo puede contener carateres numéricos',
})

extend('confirmed', {
  params: ['target'],
  ...confirmed,
  message: 'El campo {target} de confirmación no coincide',
})

extend('max_value', {
  params: ['max'],
  // eslint-disable-next-line camelcase
  ...max_value,
  message: 'El campo {_field_} debe ser {max} o menos',
})

extend('min_value', {
  params: ['min'],
  // eslint-disable-next-line camelcase
  ...min_value,
  message: 'El campo {_field_} debe ser {min} o más',
})

extend('validDate', {
  validate(value) {
    return dateValidate(value, '/')
  },
  message: 'En el campo {_field_}, la fecha no es válida',
})

extend('validPhone', {
  validate(value) {
    if (!value) return true
    const number = Number(value.split('-').filter(x => x).join(''))

    return (Number.isInteger(number) && String(number)?.length === 10) || 'El campo {_field_} debe tener 10 dígitos'
  },
})

extend('min_date', {
  params: ['min'],
  validate(value, { min }) {
    if (!min || !dateValidate(min, '-')) return true

    return moment(value, dateFormat).valueOf() >= moment(min).valueOf() || `La fecha {_field_} debe ser ${moment(min).format(dateFormat)} o más`
  },
})

extend('max_date', {
  params: ['max'],
  validate(value, { max }) {
    if (!max || !dateValidate(max, '-')) return true

    return moment(value, dateFormat).valueOf() <= moment(max).valueOf() || `La fecha {_field_} debe ser ${moment(max).format(dateFormat)} o menos`
  },
})

extend('minimumAge', {
  params: ['param'],
  validate(value, { param }) {
    return ((moment().diff(moment(value, dateFormat), 'years')) >= Number(param))
  },
  message: 'La edad mínima debe ser {param} o más',
})

extend('passwordLength', {
  params: ['param'],
  validate(value, { param }) {
    const length = Number(param)
    if (!Number.isInteger(length)) return false

    return String(value).length >= length
  },
  message: 'El campo {_field_} debe tener al menos {param} caracteres de longitud',
})

extend('uniqueUserEmail', {
  async validate(value) {
    if (!value) return true

    return axios.get(`/api/search_user?email=${value}`)
      .then(() => false)
      .catch(() => true)
  },
  message: 'El valor de {_field_} ya existe',
})

extend('digits', {
  params: ['length'],
  ...digits,
  message: 'El campo {_field_} debe ser numérico y contener exactamente {length} dígitos',
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
