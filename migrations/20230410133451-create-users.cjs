'use strict';
/** @type {import('sequelize-cli').Migration} */
const sequelize = require('sequelize')
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: sequelize.UUID,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      is_premium: {
        type: Sequelize.BOOLEAN
      },
      profile_image: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};