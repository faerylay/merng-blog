import mongoose from 'mongoose'
import Joi from 'joi'

const title = Joi.string()
  .min(5)
  .max(50)
  .required()
  .label('title')

const description = Joi.string()
  .min(5)
  .required()
  .label('description')

export const postValidate = Joi.object().keys({
  title,
  description
})

export const validateObjectId = (postId, commentId) => {
  if (!mongoose.Types.ObjectId.isValid(postId || commentId)) {
    throw new Error(`${postId || commentId} is not a valid user ID`)
  }
}
