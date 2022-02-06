import { gql } from 'apollo-server-express'

export default gql`
  input RegisterInput {
    name: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  type User{
    id:ID!
    name:String!
    email:String!
    createdAt:String!
  }
  extend type Query{
    me:User @auth
    user(id:ID!):User @auth
    users:[User!]!  @auth
  }
  extend type Mutation{
    signUp(registerInput:RegisterInput):User!  @guest
    signIn(email:String!,password:String!):User! @guest
    signOut:Boolean 
  }
`
