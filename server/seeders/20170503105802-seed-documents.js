const faker = require('faker');

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Documents', [
      {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'private',
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'private',
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'public',
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'role',
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'private',
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'public',
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'role',
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'private',
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'private',
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'public',
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'private',
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'role',
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {
      returning: true
    });
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Documents', {
      id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    });
  }
};
