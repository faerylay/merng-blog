import { AuthenticationError, UserInputError } from 'apollo-server-express'
import { Post, User } from '../models'
import { postValidate, validateObjectId } from '../validator'

const resolvers = {
  Query: {
    posts: async (parent, args, context, info) => {
      const post = await Post.find({}).populate('author').populate({ path: 'comments', populate: { path: 'author' } })
      if (!post) throw new Error(`${post} is something wrong`)
      return post
    },
    post: async (parent, { postId }, context, info) => {
      validateObjectId(postId)
      const post = await Post.findById(postId).populate('author').populate({ path: 'comments', populate: { path: 'author' } })
      if (!post) throw new Error(`${post} is something wrong`)
      return post
    }
  },
  Mutation: {
    createPost: async (parent, args, { req }, info) => {
      const { userId } = req.session
      const { title, description } = args
      await postValidate.validateAsync({ title, description }, { abortEarly: false })
      let post = await Post.create({ author: userId, title, description })
      post = await post.populate('author')
      if (post) {
        return post
      } else {
        throw new Error(`${post} is something wrong`)
      }
    },
    updatePost: async (parent, args, { req }, info) => {
      const { userId } = req.session
      const { postId, title, description } = args
      validateObjectId(postId)
      await postValidate.validateAsync({ title, description }, { abortEarly: false })

      const findPost = await Post.findById(postId).populate('author')
      const matched = findPost.title === title && findPost.description === description

      if (findPost && !matched) {
        if (findPost.author.id === userId) {
          let post = await Post.findByIdAndUpdate(postId, {
            title,
            description
          }, { new: true })
          post = await post.populate('author')
          if (post) {
            return post
          } else {
            throw new UserInputError('something wrong')
          }
        } else {
          throw new UserInputError('something wrong par kwar')
        }
      } else {
        throw new UserInputError(`${findPost}  with the given ID not found`)
      }
    },
    deletePost: async (parent, { postId }, { req }, info) => {
      // if was delete a post should remove all comment to belong to post
      const { userId } = req.session
      validateObjectId(postId)
      try {
        const post = await Post.findById(postId).populate('author')
        if (post && post.author._id.toString() === userId) {
          await Post.deleteOne(post)
          return 'Post deleted successfully'
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } catch (error) {
        throw new Error(error, 'error with post ID')
      }
    },
    likePost: async (parent, { postId }, { req }, info) => {
      const { userId } = req.session
      const user = await User.findById(userId)
      validateObjectId(postId)
      const post = await Post.findById(postId).populate('author').populate({ path: 'comments', populate: { path: 'author' } })
      if (post) {
        if (post.likes.find(like => like.username === user.name)) {
          post.likes = post.likes.filter(like => like.username !== user.name)
        } else {
          post.likes.push({
            username: user.name,
            createdAt: new Date().toISOString()
          })
        }
        await post.save()
        return post
      } else {
        throw new UserInputError('Post not found')
      }
    }
  },
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length
  }
}

export default resolvers
