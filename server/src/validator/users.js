import Joi from 'joi'

const email = Joi.string()
  .email()
  .min(8)
  .max(254)
  .trim()
  .lowercase()
  .required()
  .label('Email')

const name = Joi.string()
  .min(5)
  .max(100)
  .trim()
  .required()
  .label('Name')
// .regex(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d).*$/)
const password = Joi.string()
  .min(8)
  .max(100)
  .message(
    'must have at least one lowercase letter, one uppercase letter, and one digit.'
  )
  .required()
  .label('Password')

const confirmPassword = Joi.string()
  .min(8)
  .max(100)
  .message('Must match password')
  .required()
  .label('Password Confirm').valid(Joi.ref('password'))

export const signUp = Joi.object().keys({
  name,
  email,
  password,
  confirmPassword
})

export const signIn = Joi.object().keys({
  email,
  password
})
