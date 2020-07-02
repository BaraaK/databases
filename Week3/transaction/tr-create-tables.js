const mysql = require('mysql');
const config = require('./config.js')

const connection = mysql.createConnection(config);

const creat_account = `CREATE TABLE IF NOT EXISTS account (account_number INT NOT NULL PRIMARY KEY , balance FLOAT(25,2) DEFAULT 0);`
const creat_account_change = `CREATE TABLE IF NOT EXISTS account_changes (change_number INT NOT NULL PRIMARY KEY , 
                                account_number INT NOT NULL , amount FLOAT(6,2) NOT NULL , change_date DATETIME , remark varchar(25),
                                FOREIGN KEY (account_number) REFERENCES account(account_number));`
                                // P.S : the transfer amount limit varies depending on the bank

connection.query(creat_account, error => {
        if (error) {
        throw error;
        }
    });
connection.query(creat_account_change, error => {
    if (error) {
    throw error;
    }
});

    connection.end()