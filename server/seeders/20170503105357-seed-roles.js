module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [
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
    return queryInterface.bulkDelete('Roles', { title: ['admin', 'regular'] });
  }
};