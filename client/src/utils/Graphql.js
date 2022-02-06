import { gql } from '@apollo/client'

export const LOG_IN = gql`
mutation signIn($email: String!, $password: String!) {
  signIn(email: $email, password: $password) {
    id
  }
}
`

export const REGISTER = gql`
mutation SignUp($registerInput: RegisterInput) {
signUp(registerInput: $registerInput) {
  id
  name
  email
  createdAt
}
}
`;


export const ME = gql`
  query Me {
    me {
      id
      name
      email
      createdAt
    }
  }
`


export const FETCH_POSTS_QUERY = gql`
query Posts {
  posts {
    id
    author {
      id
      name
    }
    title
    description
    likes {
      username
      createdAt
    }
    comments {
      id
      author {
        name
      }
      text
    }
    createdAt
    likeCount
    commentCount
  }
}
`