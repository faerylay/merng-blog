import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    validate: {
      validator: email => User.doesntExist({ email }),
      message: ({ value }) => `Email ${value} has already been taken`
    }
  },
  password: String
}, {
  timestamps: true
})

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})

userSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

userSchema.methods.matchesPassword = function (password) {
  return bcrypt.compare(password, this.password)
}
// user authen and authorization with jwt token
const User = mongoose.model('User', userSchema)

export default User
