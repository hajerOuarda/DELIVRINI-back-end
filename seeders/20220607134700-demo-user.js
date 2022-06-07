'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const admin_role = await queryInterface.sequelize.query(
      `SELECT id from Role WHERE roleName='admin';`
    );

    const admin_role_id = admin_role[0];

    return await queryInterface.bulkInsert('User', [
      {
        name: 'admin',
        lastName: 'admin',
        password: '$2b$10$N89cXY0la9h5dDZxGgugJuegHPkyd/LaD54eUy9OJSUknyktC1pM6',
        email: 'admin1@exemple.com',
        phone: '908080',
        address: 'hkhuk',
        zipCode: '554',
        street: 'ertet',
        fk_role: admin_role_id[0].id
      },
      {
        name: 'admin',
        lastName: 'admin',
        password: '$2b$10$N89cXY0la9h5dDZxGgugJuegHPkyd/LaD54eUy9OJSUknyktC1pM6',
        email: 'admin2@exemple.com',
        phone: '908080',
        address: 'hkhuk',
        zipCode: '554',
        street: 'ertet',
        fk_role: admin_role_id[0].id
      }
      
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
  }
};
