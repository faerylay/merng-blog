import { AuthenticationError } from 'apollo-server-express'
import { User } from './models'
import { SESS_NAME, SESS_LIFETIME } from './config'

export const attemptSignIn = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user || !(await user.matchesPassword(password))) {
    throw new AuthenticationError(
      'Incorrect email or password. Please try again.'
    )
  }
  return user
}
const signedIn = req => req.session && req.session.userId

export const ensureSignedIn = (req) => {
  if (!signedIn(req)) {
    throw new AuthenticationError('You must be signed in.')
  }
}

// guest
export const ensureSignedOut = (req) => {
  const date = new Date(new Date().setTime(new Date().getTime() + (SESS_LIFETIME))).getSeconds()
  const expire = req.session.cookie._expires.getSeconds()
  if (expire !== date) {
    if (signedIn(req)) {
      throw new AuthenticationError('You are already signed in.')
    }
  }
}

export const signOut = (req, res) => new Promise((resolve, reject) => {
  res.clearCookie(SESS_NAME)
  req.session.destroy(err => {
    if (err) reject(err)
    // res.clearCookie(SESS_NAME)
    resolve(true)
  })

  // try {
  //   req.session = null
  //   res.clearCookie(SESS_NAME)
  //   resolve(true)
  // } catch (error) {
  //   reject(error)
  // }
})
