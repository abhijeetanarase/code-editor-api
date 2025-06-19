import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Example {
    input: String!
    output: String!
    explanation: String
  }

  type TestCase {
    input: String!
    output: String!
    isHidden: Boolean
  }

  type Problem {
    id: ID!
    title: String!
    description: String!
    difficulty: String!
    tags: [String!]!
    constraints: [String!]!
    starterCode: String!
    solutionCode: String
    examples: [Example!]!
    testCases: [TestCase!]!
    createdAt: String!
    updatedAt: String!
  }

  input ExampleInput {
    input: String!
    output: String!
    explanation: String
  }

  input TestCaseInput {
    input: String!
    output: String!
    isHidden: Boolean
  }

  input CreateProblemInput {
    title: String!
    description: String!
    difficulty: String!
    tags: [String!]!
    constraints: [String!]!
    starterCode: String!
    solutionCode: String
    examples: [ExampleInput!]!
    testCases: [TestCaseInput!]!
  }



  type Mutation {
    createProblem(input: CreateProblemInput!): Problem!
  }
`;

export default typeDefs;
