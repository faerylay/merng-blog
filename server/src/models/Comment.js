import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  text: String
  // likeComment: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Like'
  // }
  // replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "replies" }]
}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema)

export default Comment
