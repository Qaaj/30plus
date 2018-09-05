/**
 * Created by janjorissen on 05.09.18.
 */
const uuid = require('uuid/v3');
const moment = require('moment');

const nlp = (text) => {
  let tags = {};
  const has = (txt) => {
    return {
      add: (...rest) => {
        if (text.toUpperCase().indexOf(txt) !== -1) {
          rest.forEach(tag => {
            tags[tag] = true;
          })
        }
      }
    }
  }
  has('AMAZON').add('SHOPPING', 'ONLINE');
  has('BROOKS').add('SHOPPING');

  has('BAHN').add('TRANSPORT', 'TRAIN');
  has('LUFTHANSA').add('TRANSPORT', 'FLYING');
  has('EASYJET').add('TRANSPORT', 'FLYING');
  has('AIRLINES').add('TRANSPORT', 'FLYING');

  has('AIRBNB').add('LODGING');
  has('HOTEL').add('LODGING', 'EXPENSES');
  has('RHEINKRONE').add('LODGING');
  has('HOSTEL').add('LODGING');

  has('PLAYSTATION').add('GAMES', 'ONLINE', 'SHOPPING');
  has('STEAM').add('GAMES', 'ONLINE', 'SHOPPING');

  has('FINANZAMT').add('TAXES');
  has('COUNTDOKU').add('ACCOUNTING', 'EXPENSES');
  has('SPOTIFY').add('SPOTIFY', 'ONLINE');
  return tags;
}
const getTags = (item) => {
  let tags = nlp(item);
  return Object.keys(tags);
}

const cleanRaw = (raw) => new Promise((ok, nok) => {
  const items = raw.map(item => {
        const date = moment(item.data.tx_date, 'DD.MM.YYYY').toDate();
        const { description, amount } = item.data;
        const { uuid } = item;
        return {
          date,
          uuid,
          description,
          keywords: JSON.stringify(item),
          meta: {
            tags: getTags(JSON.stringify(item)),
          },
          amount: parseFloat(amount, 10),
        }
      }
  );
  ok(items);
});

const getData = (source) => (data) => {
  return ({
    source,
    data,
    uuid: uuid(data.description + data.amount + data.tx_date, uuid.DNS)
  })
};


module.exports = { cleanRaw, getData };