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
    OwnerId: DataTypes.INTEGER,
    RoleId: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate(models) {
        Document.belongsTo(models.User, {
          as: 'Owner',
          onDelete: 'CASCADE',
          foreignKey: 'OwnerId'
        });
        Document.belongsTo(models.Role, {
          onDelete: 'CASCADE',
          foreignKey: 'RoleId'
        });
      }
    }
  });
  return Document;
};
