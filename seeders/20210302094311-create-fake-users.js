"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "John Doe",
          email: "w@w.pl",
          role: "user",
          uuid: "cc13e626-d0b8-4e6e-8221-d231f008dca5",
          createdAt: "2020-11-01T16:30:07.592Z",
          updatedAt: "2020-11-01T16:30:07.592Z",
        },
        {
          name: "Jane Doe",
          email: "a@a.pl",
          role: "user",
          uuid: "cc15e626-d0b8-4e6e-8221-d231f008dca5",

          createdAt: "2020-11-01T16:30:07.592Z",
          updatedAt: "2020-11-01T16:30:07.592Z",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  },
};
