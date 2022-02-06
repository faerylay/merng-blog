export const {
  APP_PORT = 3000,
  NODE_ENV = 'development',
  SESS_NAME = 'sid',
  SESS_SECRET = 'ssh!secret',
  SESS_LIFETIME = 1000 * 60 * 60 * 2,
  REDIS_HOST = 'localhost',
  REDIS_PORT = 6379,
  REDIS_PASSWORD = 'secret'
} = process.env
export const IN_PROD = NODE_ENV === 'production'

export const SESS_OPTIONS = {
  name: SESS_NAME,
  secret: SESS_SECRET,
  resave: false,
  // rolling: true,
  saveUninitialized: false,
  cookie: {
    maxAge: +SESS_LIFETIME,
    sameSite: false,
    secure: false,
    httpOnly: IN_PROD
  }
}
// sameSite: 'none',
// secure: true,
export const REDIS_OPTIONS = {
  host: REDIS_HOST,
  port: +REDIS_PORT,
  password: REDIS_PASSWORD
  // TODO: retry_strategy
}

// export const APOLLO_KEY = 'service:My-Graph-7an7pj:OaXGBAbQtFZ7ArVmekGGTQ'
// export const APOLLO_GRAPH_REF = 'My-Graph-7an7pj@current'
// APOLLO_SCHEMA_REPORTING = true
