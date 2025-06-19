import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    _id : ID!
    name: String!
    email: String!
    picture : String!
    verified : String!
    createdAt : String!
    updatedAt : String!

  }
  type PaginatedUsers {
    data: [User!]!
    total: Int!
    page: Int!
    pages: Int!
  }
  type Query {
    profile: User

    users(
    page: Int
    limit: Int
    search: String
    searchFields: [String]
    role: String
    sortBy: String
    sortOrder: Int
  ): PaginatedUsers!
  }
`;

export default typeDefs;
