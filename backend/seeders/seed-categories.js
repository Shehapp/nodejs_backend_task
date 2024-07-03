'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    var categories = [];
    for (let i = 1; i <= 50; i++) {
      categories.push({
        name: `Category ${i}`,
        description: `Description for category ${i}`,
        created_at: new Date(),
        updated_at: new Date()
      });
    }

    await queryInterface.bulkInsert('Categories', categories, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }

};
