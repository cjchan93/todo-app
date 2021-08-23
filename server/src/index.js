const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const models = require("./models");

//APOLLO Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//APOLLO Server synced with Database
models.sequelize.sync().then(() => {
    server.listen().then(() => {
      console.log(`
        Server is running!
        Listening on port 4000!
      `);
    });
})