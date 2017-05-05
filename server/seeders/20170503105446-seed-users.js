const faker = require('faker');
const bcrypt = require('bcrypt');

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync('12345muna', bcrypt.genSaltSync(8)),
        RoleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync('1234muna', bcrypt.genSaltSync(8)),
        RoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {
      returning: true
    });
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Users', {
      id: [1, 2]
    });
  }
};
