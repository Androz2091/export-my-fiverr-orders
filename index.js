const data = require('./data.json');
const dateLibrary = require('date-and-time');
const fs = require('fs');

// code below is to generate the data string to put in the data.json file

/*
let data = [];
for (let [idx, item] of document.querySelectorAll('.tbl-row').entries()) {
    if (idx === 0) continue;
    const gigRawName = item.children[2].querySelector('.gig-name');
    if (!gigRawName) continue;
    const buyerName = item.children[1].children[0].children[1].textContent;
    const gig = gigRawName.textContent;
    const deliveredAt = item.children[5].textContent;
    const total = item.children[6].textContent;
    data.push({ buyerName, gig, deliveredAt, total });
}
console.log(JSON.stringify(data));
*/

console.log(`${data.length} orders found`);

let finalCSV = 'Date|Buyer|Libellé commande|Prix total\n';

data.forEach((data) => {
    if (data.deliveredAt === 'Delivered At') return; // order headers
    if (!data.deliveredAt) return; // probably a tip or a command details
    if (!data.deliveredAt.includes(',')) data.deliveredAt += `, ${new Date().getFullYear()}`;
    const date = dateLibrary.parse(data.deliveredAt, 'MMM DD, YYYY');
    let amount = data.total.slice(1);
    if (amount.includes(',')) amount = amount.replace(',', '');
    amount = parseFloat(amount);
    finalCSV += `${dateLibrary.format(date, 'YYYY-MM-DD')}|${data.buyerName}|${data.gig}|${amount.toLocaleString('fr-FR')}\n`;
});

fs.writeFileSync('./data.csv', finalCSV);
