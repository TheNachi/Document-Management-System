module.exports = (sequelize, DataTypes) => {
  const ExpiredToken = sequelize.define('ExpiredToken', {
    token: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      }
    }
  });
  return ExpiredToken;
};
