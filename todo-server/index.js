const { GraphQLServer } = require('graphql-yoga');
const todos = require('./todo')

const typeDefs = `
    type Todo {
        id: ID!
        title: String!
        done: Boolean!
    } 

    type Query {
        allTodos: [Todo!]!
    }

    type Mutation {
        createTodo(title: String!, done: Boolean!): Todo!
        updateTodo(id: ID!, done: Boolean!): Todo!
        deleteTodo(id: ID!): Todo!
    }
`;

const resolvers = {
    Query: {
        allTodos: () => todos,
    },

    Mutation: {
        createTodo: (_, { title, done }) => {
            const todo = {
                id: todos.length +1,
                title,
                done
            };
            todos.push(todo)
            return todo;
        },

        updateTodo: (_, { id, done }) => {
            const todo = todos.find(todo => todo.id == id);
            todo.done = done;
            return todo;
        },

        deleteTodo: (_, { id }) => {
            const todoIndex = todos.findIndex(todo => todo.id == id);
            const todo = todos[todoIndex];
            todos.splice(todoIndex, 1);
            return todo;
        }
    }
};

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => console.log('Server is running on localhost:4000'));
