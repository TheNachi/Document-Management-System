module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    access: {
      defaultValue: 'public',
      type: DataTypes.STRING,
      validate: {
        isIn: [['private', 'public', 'role']]
      }
    },
    ownerId: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate(models) {
        Document.belongsTo(models.User, {
          as: 'owner',
          onDelete: 'CASCADE',
          foreignKey: 'ownerId'
        });
      }
    }
  });
  return Document;
};
