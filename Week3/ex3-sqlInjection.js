const mysql = require('mysql');

const conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword',
    database : 'world',
    multipleStatements: true
  });



function getPopulation(Country, name, code, cb) {
    // assuming that connection to the database is established and stored as conn
    conn.query(
      `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
      function(err, result) {
        if (err) cb(err);
        if (result.length == 0) cb(new Error("Not found"));
        cb(null, result[0].name);
      }
    );
  }
 
  conn.end()

// 1*Example of a value that can be passed as name and code that would take advantage of SQL-injection 

// SELECT * FROM country where name = ""  OR 1 = 1;  -- " and code = '';


// 2* Rewrite the function so that it is no longer vulnerable to SQL injection
function getPopulation(Country, name, code, cb) {
    // assuming that connection to the database is established and stored as conn
    conn.query(
      `SELECT Population FROM `+ mysql.escape(Country) +` WHERE Name = `+ mysql.escape(name) ` and code =` + mysql.escape(code),
      function(err, result) {
        if (err) cb(err);
        if (result.length == 0) cb(new Error("Not found"));
        cb(null, result[0].name);
      }
    );
  }