module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define('roles', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: {
          args: ['^[a-z]+$', 'i'],
          msg: 'roles can only contain letters'
        },
        notEmpty: {
          msg: 'title field cannot be empty'
        }
      }
    }
  }, {
    classMethods: {
      associate(models) {
        roles.hasMany(models.users, {
          foreignKey: 'roleId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return roles;
};
