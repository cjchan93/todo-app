const { gql } = require('apollo-server');

const typeDefs = gql`

type Query{
   getNotes: [Note]!
   getUsers: [User]!
   getNote(todo: String): Note!
}

type User{
    id: ID!
    email: String!
}

type Note{
    id: ID!
    todo: String!
    status: Boolean!
}

type Mutation{
    userLogin(email: String!): User,
    createNote(todo: String): Note!,
    deleteNote(iD: ID!): Note!,
    updateStatus(iD: ID!, newStatus:Boolean!): Note!
}
`;

module.exports = typeDefs;