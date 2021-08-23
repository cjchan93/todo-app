module.exports = (sequelize, type) => {
 const notes = sequelize.define(
    'notes',
    {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            defaultValue: type.id,
            allowNull: false,
            autoIncrement: true
        },
        todo: {
            type: type.STRING,
            allowNull: false
        },
        status: {
            type: type.BOOLEAN
        }
    },
    {
        underscored: true,
        timestamps: false
    }
);
    return notes;   
}
