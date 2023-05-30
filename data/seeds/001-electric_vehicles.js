/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  return knex('electric_vehicles')
    .truncate()
    .then(function () {
      return knex('electric_vehicles').insert([
        { vehicles_name: 'Tesla Model 3' },
        { vehicles_name: 'BMW iX' },
        { vehicles_name: 'Ford Mustang Mach-E' },
        { vehicles_name: 'Hyundai Ioniq 5' },
        { vehicles_name: 'Kia EV6' },
        { vehicles_name: 'Lucid Air' },
      ]);
    });
};
