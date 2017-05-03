module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('roles', [
      {
        id: 1,
        title: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: 'regular',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('roles', { title: ['admin', 'regular'] });
  }
};