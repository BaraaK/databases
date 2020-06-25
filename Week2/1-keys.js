const util = require('util');
const mysql = require('mysql');
const config = require('./config.js')


const dropTable =
`DROP TABLE IF EXISTS Authors;`
const dropAuthorsPapers =
`DROP TABLE IF EXISTS Authors_Papers;`
const creatTable =
`CREATE TABLE IF NOT EXISTS Authors (author_no INT PRIMARY KEY NOT NULL, author_name VARCHAR(20) , university VARCHAR(20), date_of_birth DATE, h_index INT, gender ENUM('male','female'));`
const alterTable = 
`ALTER TABLE Authors ADD Collaborator INT NOT NULL;`
const addForeignKey = 
`ALTER TABLE Authors ADD CONSTRAINT fk_author_no  FOREIGN KEY (Collaborator) REFERENCES Authors (author_no); `


async function seedDatabase() {
    
    const connection = mysql.createConnection(config);
    const execQuery = util.promisify(connection.query.bind(connection));
  
    try {
        await execQuery(dropAuthorsPapers);
        await execQuery(dropTable);  
        await execQuery(creatTable);
        await execQuery(alterTable);
        await execQuery(addForeignKey);
        connection.end();
    
    } 
    
    catch (err) {
      console.error(err.message);
      connection.end();
    }
  }
  
  seedDatabase();




