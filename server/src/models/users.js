module.exports = (sequelize, type) => {
  const users = sequelize.define(
    "users",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      email: {
        type: type.STRING,
        allowNull: false,
      }
    },
    {
      underscored: true,
      timestamps: false,
    }
  );

  users.associate = (models) => {
    users.hasMany(models.notes);
  };

  return users;
};
