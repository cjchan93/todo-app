const models = require("./models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
  Query: {
    getNotes: async () => {
      return (getNotes = await models.notes.findAll());
    },

    getUsers: async () => {
      return (getUsers = await models.users.findAll());
    },

    getNote: async (_, { toDo }) => {
      return models.notes.findAll({
        where: { todo: { [Op.like]: `%${toDo}%` } },
      });
    },

    getUser: async (_, { eMail }) => {
      return models.users.findAll({
        where: { email: { [Op.like]: `%${eMail}%` } },
      });
    },
  },

  Mutation: {
    userLogin: async (_, { eMail }) => {
      await models.users.findOrCreate({ where: { email: eMail } });
      return await models.users.findOne({ where: { email: eMail } });
    },

    createNote: async (_, { todo }) => {
      const newNote = { todo };
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
      await models.notes.update({ status: newStatus }, { where: { id: iD } });
      return models.notes.findOne({ where: { id: iD } });
    },

    updateNotes: async (_, { iD, toDo }) => {
      await models.notes.update({ todo: toDo }, { where: { id: iD } });
      return models.notes.findOne({ where: { id: iD } });
    },
  },
};
