var cc = require('./tasks/creditcard.js');
var ing = require('./tasks/ing.js');
var sk = require('./tasks/sk.js');

var uuid = require('uuid/v3');
var knex = require('knex')(require('./knexfile.js'));

jake.addListener('complete', function () {
  process.exit();
});

desc('Import Credit Card Data.');
task('cc', { async: true }, async () => {
  console.log('Running CC import.')
  const entries = await cc('data/_2018-CC.csv');
  const sql = entries.map(data => {
    return ({
      source: 'CC',
      data,
      uuid: uuid(data.description, uuid.DNS)
    })
  });
  await knex('transactions_raw').insert(sql);
});


desc('Import ING Credit Card Data.');
task('ing', async () => {
  console.log('Running ING import.')
  const entries = await ing('data/_2018-ING.csv');
  const sql = entries.map(data => {
    return ({
      source: 'ING',
      data,
      uuid: uuid(data.description, uuid.DNS)
    })
  });
  await knex('transactions_raw').insert(sql);
});

desc('Import Sparkasse Data.');
task('sk', async () => {
  console.log('Running Sparkasse import.')
  const entries = await sk('data/_2018-SK.csv');
  const sql = entries.map(data => {
    return ({
      source: 'SK',
      data,
      uuid: uuid(data.description, uuid.DNS)
    })
  });
  await knex('transactions_raw').insert(sql);
});

desc('Import All Data.');
task('all', ['cc','sk','ing']);