const util = require('util');
const mysql = require('mysql');
const config = require('./config.js')


const connection = mysql.createConnection(config);

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  connection.connect();

  try {
    await execQuery("START TRANSACTION");

    await execQuery('UPDATE account SET balance = balance - 1000 WHERE account_number = 423859741;');
    await execQuery('UPDATE account SET balance = balance + 1000 WHERE account_number = 328945625;');
    await execQuery('INSERT INTO account_changes VALUES (13522,423859741,1000,"2020-05-02 12:05:45","sent successfully");');
    await execQuery('INSERT INTO account_changes VALUES (16589,328945625,1000,"2020-05-02 12:05:45","received successfully");');

    await execQuery("COMMIT");
  } catch (error) {
    console.error(error);
    await execQuery("ROLLBACK");
    connection.end();
  }

  connection.end();
}

seedDatabase();
