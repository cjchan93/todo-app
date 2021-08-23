const models = require("./models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const todos = require("./");
module.exports = {
  Query: {
    allNotes: async () => {
      const allNotes = await models.notes.findAll();
      return allNotes;
    },

    allUsers: async () => {
      const allUsers = await models.users.findAll();
      return allUsers;
    },

    oneNote: async (_, { todo }) => {
      const oneNote = await models.notes.findOne({ where: { todo: { [Op.like]: `%${todo}%` } } });
      return oneNote;
    }
  },

  Mutation: {
    userLogin: async (_, { email }) => {
      const user = await models.users.findOrCreate({ where: { email: email } });
      return user;
    },

    createNote: async (_, { todo }) => {
      const newNote = {todo};
      newNote.status = false; //Updated over here to make sure status is false when note is created.
      return await models.notes.create(newNote);
    },

    deleteNote: async (_, { id }) => {
      const tobeDeleted = await models.notes.findOne({ where: { id: id } });
      await models.notes.destroy({
        where: { id: id },
      });
      return tobeDeleted;
    },

    updateNote: async (_, { id, status }) => {
      const updatedNotes = await models.notes.update(
        { status: status },
        { where: { id: id } }
      );
      return updatedNotes;
    },
  },
};

//test