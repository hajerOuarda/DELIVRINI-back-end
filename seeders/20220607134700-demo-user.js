'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const admin_role = await queryInterface.sequelize.query(
      `SELECT id from Role WHERE roleName='admin';`
    );
    const chef_role = await queryInterface.sequelize.query(
      `SELECT id from Role WHERE roleName='chef';`
    );

    const admin_role_id = admin_role[0];
    const chef_role_id = chef_role[0];

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
      },
      {
        name: 'MamaChemiChef',
        lastName: 'MamaChemiChef',
        password: '$2b$10$ieUTLhUSbUc3nei2ZU7RDOStn6KNz504bFIqMPcksEfe/V64gBkz2',
        email: 'MamaChemiChef@exemple.com',
        phone: '908080',
        address: 'R6',
        zipCode: '43',
        street: 'ertet',
        fk_role: chef_role_id[0].id,
        fk_restaurant: "MamaChemi"
      },
      {
        name: 'MixMaxChef',
        lastName: 'MamaChemiMixMaxChef',
        password: '$2b$10$vvyiN3nNpVs28R3043uiC.ROOpovM3.whTTz/yS7/itsQEyw26xmi',
        email: 'MixMaxChef@exemple.com',
        phone: '321312',
        address: 'R4',
        zipCode: '500',
        street: 'ertet',
        fk_role: chef_role_id[0].id,
        fk_restaurant: "MixMax"
      }

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
  }
};
