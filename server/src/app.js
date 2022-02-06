import { ApolloServer } from 'apollo-server-express'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import express from 'express'
import session from 'express-session'
import connectRedis from 'connect-redis'
import Redis from 'ioredis'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import { auth, guest, upper } from './directives'
import { SESS_OPTIONS, IN_PROD, REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from './config'

const createApp = async () => {
  try {
    const app = express()

    const RedisStore = connectRedis(session)
    const store = new RedisStore({
      client: new Redis({
        host: REDIS_HOST,
        port: REDIS_PORT,
        pass: REDIS_PASSWORD
      })
    })
    app.disable('x-powered-by')
    app.use(session({ store, ...SESS_OPTIONS }))
    app.set('trust proxy', process.env.NODE_ENV !== 'production')

    let schema = makeExecutableSchema({
      typeDefs,
      resolvers
    })
    schema = auth(schema, 'auth')
    schema = guest(schema, 'guest')
    schema = upper(schema, 'upper')

    const server = new ApolloServer({
      schema,
      cors: false,
      plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
      ],
      introspection: !IN_PROD,
      playground: IN_PROD ? false : { settings: { 'request.credentials': 'include' } },
      context: ({ req, res }) => ({ req, res })
    })

    await server.start()

    server.applyMiddleware({ app, path: '/graphql', cors: { origin: ['https://studio.apollographql.com', 'http://localhost:4000', 'http://localhost:3000'], credentials: true } })
    app.listen({ port: process.env.PORT },
      () => console.log(`http://localhost:${process.env.PORT}${server.graphqlPath}`)
    )
  } catch (error) {
    console.log(error)
  }
}
export default createApp
