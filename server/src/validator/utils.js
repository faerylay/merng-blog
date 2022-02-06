import Joi from 'joi'

export const objectIds = Joi.object().keys({
  id: Joi.object().label('Object ID')
})
