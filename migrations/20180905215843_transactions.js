
exports.up = function(knex) {
  return knex.schema.createTable('transactions', function (table) {
    table.increments('id');
    table.uuid('uuid');
    table.string('description');
    table.jsonb('meta');
    table.datetime('date');
    table.text('keywords');
    table.float('amount');
    table.timestamp('imported').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('transactions');
};
