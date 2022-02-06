import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { User } from '../models'
import { signUp, signIn, objectIds } from '../validator'
import * as Auth from '../auth'

const resolvers = {
  Query: {
    me: async (root, args, { req }, info) => {
      return await User.findById(req.session.userId)
    },
    users: async (root, args, context, info) => {
      return await User.find({})
    },
    user: async (root, { id }, context, info) => {
      await objectIds.validateAsync(id)
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID`)
      }
      return User.findById(id)
    }
  },
  Mutation: {
    signUp: async (root,
      { registerInput: { name, email, password, confirmPassword } }
      , { req }, info) => {
      const { userId } = req.session
      if (userId) return await User.findById(userId)
      await signUp.validateAsync({ name, email, password, confirmPassword }, { abortEarly: false })

      const user = await User.create({ name, email, password })
      req.session.userId = user.id
      return user
    },
    signIn: async (root, args, { req }, info) => {
      const { userId } = req.session
      if (userId) return await User.findById(userId)

      await signIn.validateAsync(args, { abortEarly: false })

      const user = await Auth.attemptSignIn(args.email, args.password)
      req.session.userId = user.id
      return user
    },
    signOut: (root, args, { req, res }, info) => {
      Auth.signOut(req, res)
    }
  }
}

export default resolvers
