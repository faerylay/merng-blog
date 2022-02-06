import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  description: String,
  comments: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  likes: [
    {
      username: String,
      createdAt: String
    }
  ]
  // tags: String,
  // image: String

}, { timestamps: true })
// const deepPopulate = require('mongoose-deep-populate')(mongoose)
// postSchema.plugin(deepPopulate)

const Post = mongoose.model('Post', postSchema)
export default Post
