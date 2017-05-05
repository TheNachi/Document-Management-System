module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate(models) {
        Role.hasMany(models.User, { foreignKey: 'RoleId' });
        Role.hasMany(models.Document, { foreignKey: 'RoleId' });
      }
    }
  });
  return Role;
};
