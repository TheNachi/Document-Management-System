module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('roles', [
      {
        title: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'regular',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {
      returning: true
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('roles', { title: ['admin', 'regular'] });
  }
};