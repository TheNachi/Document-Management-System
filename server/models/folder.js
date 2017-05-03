export default (sequelize, DataTypes) => {
  const Folders = sequelize.define('folders', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'This folder is already exists'
      }
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate(models) {
        // Folders.hasMany(models.document, { foreignKey: 'folderId' });
        Folders.belongsTo(models.users, {
          foreignKey: 'ownerId',
          onDelete: 'CASCADE'
        });
        // associations can be defined here
      }
    }
  });
  return Folders;
};
