"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Role", [
      {
        roleName: "admin",
      },
      {
        roleName: "client",
      },
      {
        roleName: "chef",
      },
      {
        roleName: "deliveryMan",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
