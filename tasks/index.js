/**
 * Created by janjorissen on 05.09.18.
 */

const csv = require('csv-parser');
const fs = require('fs');

const cc = (url) => new Promise((ok, nok) => {
  let num = 0;
  let entries = [];
  fs.createReadStream(url)
      .pipe(csv({
        separator: ';', // specify optional cell separator
        headers: [
          'tx_date',
          'debit_date',
          'description',
          'amount',
          'amount_currency',
          'conversion_rate',
          'debited'
        ]
      }))
      .on('data', function (data) {
        num++;
        if (num > 7) entries.push(data);
      })
      .on("end", () => ok(entries))
      .on("error", nok);
});

// Buchung;Valuta;Auftraggeber/Empfänger;Buchungstext;Verwendungszweck;Saldo;Währung;Betrag;Währung

const ing = (url) => new Promise((ok, nok) => {
  let num = 0;
  let entries = [];
  fs.createReadStream(url)
      .pipe(csv({
        separator: ';', // specify optional cell separator
        headers: [
          'tx_date',
          'debit_date',
          'debitor',
          'type',
          'description',
          'saldo',
          'saldo_currency',
          'amount',
          'amount_currency',
        ]
      }))
      .on('data', function (data) {
        num++;
        if (num > 13) entries.push(data);
      })
      .on("end", () => ok(entries))
      .on("error", nok);
});

// "Auftragskonto";"Buchungstag";"Valutadatum";"Buchungstext";"Verwendungszweck";"Beguenstigter/Zahlungspflichtiger";"Kontonummer";"BLZ";"Betrag";"Waehrung";"Info"

const sk = (url) => new Promise((ok, nok) => {
  let num = 0;
  let entries = [];
  fs.createReadStream(url)
      .pipe(csv({
        separator: ';', // specify optional cell separator
        headers: [
          'konto',
          'tx_date',
          'debit_date',
          'type',
          'description',
          'debitor',
          'debitor_iban',
          'debitor_bic',
          'amount',
          'amount_currency',
          'test',
        ]
      }))
      .on('data', function (data) {
        num++;
        if (num > 1) entries.push(data);
      })
      .on("end", () => ok(entries))
      .on("error", nok);
});

module.exports = { cc, ing, sk };