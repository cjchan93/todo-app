const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    getNotes: [Note]!
    getUsers: [User]!
    getNote(todo: String): Note!
    getUser(email: String): User!
  }

  type User {
    id: ID!
    email: String!
  }

  type Note {
    id: ID!
    todo: String!
    status: Boolean!
  }

  input NoteInput {
    todo: String!
  }

  type Mutation {
    userLogin(eMail: String!): User
    createNote(todo: String): Note!
    deleteNote(iD: ID!): Note!
    updateStatus(iD: ID!, newStatus: Boolean!): Note!
    updateNotes(iD: ID!, noteInput: NoteInput!): Note
  }
`;

module.exports = typeDefs;
