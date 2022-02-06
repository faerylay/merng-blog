import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils'
import { defaultFieldResolver } from 'graphql'
import { ensureSignedIn, ensureSignedOut } from '../auth'

export const authDirective = (schema, directiveName) => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directive = getDirective(schema, fieldConfig, directiveName)
      if (directive) {
        const { resolve = defaultFieldResolver } = fieldConfig
        fieldConfig.resolve = async function (source, args, context, info) {
          const result = await resolve(source, args, context, info)
          ensureSignedIn(context.req)
          return result
        }
        return fieldConfig
      }
    }
  })
}

export const guestDirective = (schema, directiveName) => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directive = getDirective(schema, fieldConfig, directiveName)
      if (directive) {
        const { resolve = defaultFieldResolver } = fieldConfig
        fieldConfig.resolve = async function (source, args, context, info) {
          const result = await resolve(source, args, context, info)
          ensureSignedOut(context.req)
          return result
        }
        return fieldConfig
      }
    }
  })
}

export const upperDirective = (schema, directiveName) => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directive = getDirective(schema, fieldConfig, directiveName)
      if (directive) {
        const { resolve = defaultFieldResolver } = fieldConfig
        fieldConfig.resolve = async function (source, args, context, info) {
          const result = await resolve(source, args, context, info)
          console.log(result)
          if (typeof result === 'string') {
            return result.toUpperCase()
          }
        }
        return fieldConfig
      }
    }
  })
}
