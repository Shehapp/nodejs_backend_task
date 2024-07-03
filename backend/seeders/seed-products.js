'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    var products = [];
    for (let i = 1; i <= 100; i++) {
      products.push({
        name: `Product ${i}`,
        description: `Description for product ${i}`,
        price: 9.99 * i,
        stock: 100 + i,
        category_id: Math.floor(Math.random() * 50) + 1,
        created_at: new Date(),
        updated_at: new Date()
      });
    }

    await queryInterface.bulkInsert('Products', products, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
