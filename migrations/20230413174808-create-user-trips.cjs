'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_trips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        foreignKey: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      trip_name: {
        type: Sequelize.STRING
      },
      image_url: {
        type: Sequelize.STRING
      },
      attractions: {
        type: Sequelize.JSON
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User_Trips');
  }
};