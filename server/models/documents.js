module.exports = (sequelize, DataType) => {
  const documents = sequelize.define('documents', {
    title: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    content: {
      type: DataType.TEXT,
      allowNull: false
    },
    accessId: {
      type: DataType.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    ownerId: {
      type: DataType.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        documents.belongsTo(models.users, {
          foreignKey: 'ownerId',
          onDelete: 'CASCADE'
        });
        documents.belongsTo(models.access, {
          foreignKey: 'accessId'
        });
      }
    }
  });
  return documents;
};
