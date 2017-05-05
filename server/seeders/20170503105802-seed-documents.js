const faker = require('faker');

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Documents', [
      {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'private',
        OwnerId: 1,
        RoleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'private',
        OwnerId: 1,
        RoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'public',
        OwnerId: 2,
        RoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'role',
        OwnerId: 1,
        RoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'private',
        OwnerId: 1,
        RoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'public',
        OwnerId: 2,
        RoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'role',
        OwnerId: 1,
        RoleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'private',
        OwnerId: 2,
        RoleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'private',
        OwnerId: 1,
        RoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'public',
        OwnerId: 1,
        RoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'private',
        OwnerId: 1,
        RoleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'role',
        OwnerId: 1,
        RoleId: 2,
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
