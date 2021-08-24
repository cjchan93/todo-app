module.exports = (sequelize, type) => {
 const notes = sequelize.define(
    'notes',
    {
        id: {
            type: type.UUID,
            primaryKey: true,
            defaultValue: type.UUIDV4,
            allowNull: false,
        },
        todo: {
            type: type.STRING,
            allowNull: false
        },
        status: {
            type: type.BOOLEAN,
            allowNull: false
        }
    },
    {
        underscored: true,
        timestamps: false
    }
);
    return notes;   
}
