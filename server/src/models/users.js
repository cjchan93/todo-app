module.exports = (sequelize, type) => {
  const users = sequelize.define(
    "users",
    {
      id: {
        type: type.UUID,
        primaryKey: true,
        defaultValue: type.UUIDV4,
        allowNull: false,
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
