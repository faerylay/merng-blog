import { gql } from 'apollo-server-express'

export default gql`
  type Post {
    id:ID!
    author:User!
    title:String!
    description:String!
    likes:[Like]! 
    likeCount:Int!
    commentCount:Int!
    comments:[Comment!]!
    createdAt:String!
  }
  type Like {
    id:ID!
    username:String!
    createdAt:String!
  }
  extend type Query {
    post(postId:ID!):Post @auth
    posts:[Post!]! @auth
  }

  extend type Mutation {
    createPost(title:String! description:String!):Post! @auth
    updatePost(postId:ID! title:String! description:String!):Post! @auth
    deletePost(postId:ID!):String! @auth
    likePost(postId:ID!):Post! @auth
  }
`
