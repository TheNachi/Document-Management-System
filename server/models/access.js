module.exports = (sequelize, DataTypes) => {
  const access = sequelize.define('access', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate(models) {
        // // associations can be defined here
        access.hasMany(models.documents, {
          foreignKey: 'accessId',
          onDelete: 'CASCADE'
        });
      }
    },
    freezeTableName: true,
  });
  return access;
};
