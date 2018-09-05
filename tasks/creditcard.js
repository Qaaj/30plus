/**
 * Created by janjorissen on 05.09.18.
 */

var csv = require('csv-parser');
var fs = require('fs');

var stream = csv({
  raw: false,     // do not decode to utf-8 strings
  separator: ';', // specify optional cell separator
  quote: '"',     // specify optional quote character
  escape: '"',    // specify optional escape character (defaults to quote value)
  newline: '\n',  // specify a newline character
  headers: [
    'tx_date',
    'debit_date',
    'description',
    'amount',
    'amount_currency',
    'conversion_rate',
    'debited'
  ]
})

module.exports = (url) => new Promise((ok, nok) => {
  let num = 0;
  let entries = [];
  fs.createReadStream(url)
      .pipe(stream)
      .on('data', function (data) {
        num++;
        if (num > 7) entries.push(data);
      })
      .on("end", () => ok(entries))
      .on("error", nok);
});
