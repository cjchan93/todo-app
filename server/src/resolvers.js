const models = require("./models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const todos = require("./");
module.exports = {
  Query: {
    getNotes: async () => {
      const getNotes = await models.notes.findAll();
      return getNotes;
    },

    getUsers: async () => {
      const getUsers = await models.users.findAll();
      return getUsers;
    },

    getNote: async (_, { todo }) => {
      const getNote = await models.notes.findOne({ where: { todo: { [Op.like]: `%${todo}%` } } });
      return getNote;
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

    deleteNote: async (_, { iD }) => {
      const deleteNote = await models.notes.findOne({ where: { id: iD } });
      await models.notes.destroy({
        where: { id: iD },
      });
      return deleteNote;
    },

    updateStatus: async (_, { iD, newStatus }) => {
      const updateStatus = await models.notes.update(
        { status: { newStatus } },
        { where: { id: iD } }
      );
      return updateStatus;
    }
  },
};