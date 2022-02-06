import { UserInputError, AuthenticationError } from 'apollo-server-express'
import { Comment, Post } from '../models'
import { validateObjectId } from '../validator'

const resolvers = {
  Query: {
    comments: async (parent, args, context, info) => {
      return await Comment.find({}).populate('author')
    }
  },
  Mutation: {
    createComment: async (parent, { postId, text }, { req }, info) => {
      const { userId } = req.session
      validateObjectId(postId)
      const post = await Post.findById(postId)
      if (post) {
        let comment = await Comment.create({ author: userId, text })
        comment = await comment.populate('author')
        await Post.findByIdAndUpdate(
          { _id: postId },
          { $push: { comments: comment._id } },
          { new: true }
        )
        return comment
      } else {
        throw new UserInputError('Post Not Found')
      }
    },
    updateComment: async (parent, { postId, commentId, text }, { req }, info) => {
      const { userId } = req.session
      validateObjectId(postId, commentId)
      const post = await Post.findById(postId).populate('author').populate({ path: 'comments', populate: { path: 'author' } })
      if (post) {
        const comment = post.comments.map(cmt => cmt)
        const cmtId = comment.find(a => a._id.toString() === commentId)
        if (comment && cmtId) {
          if (cmtId.author._id.toString() === userId) {
            let updateComment = await Comment.findByIdAndUpdate(cmtId, { text }, { new: true })
            updateComment = await updateComment.populate('author')
            return updateComment
          } else {
            throw new AuthenticationError('Action Not Allowed')
          }
        } else {
          throw new UserInputError('Comment Not Found')
        }
      } else {
        throw new UserInputError('Post Not Found')
      }
    },
    deleteComment: async (parent, { postId, commentId }, { req }, info) => {
      const { userId } = req.session
      validateObjectId(postId, commentId)
      const post = await Post.findById(postId).populate('author').populate({ path: 'comments', populate: { path: 'author' } })
      if (post) {
        const comment = post.comments.map(cmt => cmt)
        const cmtId = comment.find(a => a._id.toString() === commentId)
        if (comment && cmtId && cmtId.author._id.toString() === userId) {
          await Comment.deleteOne(cmtId)
          return post
        } else {
          throw new AuthenticationError('Action Not Allowed')
        }
      } else {
        throw new UserInputError('Post Not Found')
      }
    }
  }
}

export default resolvers
