const { gql } = require('apollo-server');

const typeDefs = gql`

type Query{
   allNotes: [Note]!
   allUsers: [User]!
   oneNote(todo: String): Note!
}

type User{
    id: Int!
    email: String!
}

type Note{
    id: Int!
    todo: String!
    status: Boolean!
}

type Mutation{
    userLogin(email: String!): User,
    createNote(todo: String): Note!,
    deleteNote(id: Int!): Note!,
    updateNote(id: Int!, status:Boolean!): Note!
}
`;

module.exports = typeDefs;