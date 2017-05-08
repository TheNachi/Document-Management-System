const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    roleId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate(models) {
        User.belongsTo(models.Role, {
          onDelete: 'CASCADE',
          foreignKey: 'roleId'
        });

        User.hasMany(models.Document, { foreignKey: 'ownerId' });
      }
    },
    instanceMethods: {
        /**
         * Compares plain text password against hashed password
         * @method
         * @param {String} password
         * @returns {Boolean} Validity of passowrd
         */
      verifyPassword(password) {
        return bcrypt.compareSync(password, this.password);
      }
    },
    hooks: {
      beforeCreate: (user) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
      },
      beforeUpdate: (user) => {
        if (user.password) {
          user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        }
      },
    }
  });
  return User;
};
