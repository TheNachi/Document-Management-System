const faker = require('faker');

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('documents', [
      {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        accessId: 1,
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        accessId: 1,
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        accessId: 2,
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        accessId: 1,
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        accessId: 2,
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        accessId: 3,
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        accessId: 1,
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        accessId: 2,
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        accessId: 1,
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        accessId: 3,
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        accessId: 1,
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        accessId: 3,
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {
      returning: true
    });
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('documents', {
      id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    });
  }
};
