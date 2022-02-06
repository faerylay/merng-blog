import { gql } from 'apollo-server-express'

export default gql`
  type Comment {
    id:ID!
    author:User
    text:String!
    createdAt:String!
  }
  extend type Query {
    comments:[Comment!]! @auth
  }

  extend type Mutation {
    createComment(postId:ID! text:String! ):Comment! @auth
    updateComment(postId:ID! commentId:ID! text:String! ):Comment! @auth
    deleteComment(postId:ID! commentId:ID!):Post! @auth
  }
`
