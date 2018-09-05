
exports.up = function(knex) {
  return knex.schema.createTable('transactions_raw', function (table) {
    table.increments('id');
    table.uuid('uuid');
    table.string('source');
    table.jsonb('data');
    table.timestamps();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('transactions_raw');
};
