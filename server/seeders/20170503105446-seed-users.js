const faker = require('faker');
const bcrypt = require('bcrypt');

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('users', [
      {
        id: 1,
        username: faker.internet.userName(),
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync('12345muna', bcrypt.genSaltSync(8)),
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 2,
        username: faker.internet.userName(),
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync('1234muna', bcrypt.genSaltSync(8)),
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('users', {
      id: [1, 2]
    });
  }
};
