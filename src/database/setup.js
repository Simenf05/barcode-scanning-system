const fs = require('fs');

const data = fs.readFileSync("data.csv", {encoding: 'utf-8'});
console.log(data)
const lines = data.split('\r\n').slice(0, -1);

const names = [...lines[0].split(',')]

db = db.getSiblingDB('admin');
db.auth(process.env.MONGO_INITDB_ROOT_USERNAME, process.env.MONGO_INITDB_ROOT_PASSWORD);
db = db.getSiblingDB('barcode-scanning');
db.createCollection('items');
db.createCollection('events');

lines.slice(1).forEach(line => {
    let doc = {lentOut: false};

    line.split(',').forEach((val, i) => {
        doc = Object.assign(doc, {[names[i]]: val});
    });

    /* this needs to be changed to use insertMany */

    db.items.insertOne(doc);
});