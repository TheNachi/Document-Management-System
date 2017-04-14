module.exports = (sequelize, DataTypes) => {
  const access = sequelize.define('access', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        access.hasMany(models.Document, {
          foreignKey: 'accessId'
        });
      }
    },
    freezeTableName: true,
  });
  return access;
};
