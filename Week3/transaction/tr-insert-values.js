const mysql = require('mysql');
const config = require('./config.js')
const fs = require('fs');
const util = require('util');

const connection = mysql.createConnection(config);

async function seedDatabase() {
    const readFile = util.promisify(fs.readFile);
    const execQuery = util.promisify(connection.query.bind(connection));
  
    try {
        // INSERT into account table
        const accountData = await readFile(__dirname + '/account.json', 'utf8');
        const accounts = JSON.parse(accountData);

        const accountPromises = accounts.map(account => execQuery('INSERT INTO account SET ?', account));
        await Promise.all(accountPromises);
        
        // INSERT into account_changes table
        const accountChangesData = await readFile(__dirname + '/account_changes.json', 'utf8');
        const account_changes = JSON.parse(accountChangesData);

        const accountChangesPromises = account_changes.map(account_change => execQuery('INSERT INTO account_changes SET ?', account_change));
        await Promise.all(accountChangesPromises);


        connection.end();

    } catch (err) 
        {
        console.error(err.message);
        connection.end();
        }
  }
  
  seedDatabase();