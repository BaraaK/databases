
const util = require('util');
const mysql = require('mysql');
const config = require('./config.js')
const fs = require('fs');


const dropResearchPapers = 
`DROP TABLE IF EXISTS Research_Papers;`

const createResearchPapers =
`CREATE TABLE IF NOT EXISTS Research_Papers (paper_id INT PRIMARY KEY NOT NULL, paper_title VARCHAR(20), conference VARCHAR(20), publish_date DATE);`

const dropAuthorsPapers =
`DROP TABLE IF EXISTS Authors_Papers;`

const createRelationTable = 
`CREATE TABLE IF NOT EXISTS Authors_Papers (author_id INT NOT NULL , paper_id INT NOT NULL);`

const addForeignKeyAuthors = 
`ALTER TABLE Authors_Papers ADD CONSTRAINT fk_author_id  FOREIGN KEY (author_id) REFERENCES Authors (author_no); `

const addForeignKeyPapers = 
`ALTER TABLE Authors_Papers ADD CONSTRAINT fk_paper_id  FOREIGN KEY (paper_id) REFERENCES Research_Papers (paper_id); `

async function seedDatabase() {
    
    const connection = mysql.createConnection(config);
    const execQuery = util.promisify(connection.query.bind(connection));
    const readFile = util.promisify(fs.readFile);

  
    try {
        await execQuery(dropAuthorsPapers);
        await execQuery(dropResearchPapers);  
        await execQuery(createResearchPapers);
        await execQuery(createRelationTable);
        await execQuery(addForeignKeyAuthors);
        await execQuery(addForeignKeyPapers);

        const authorsData = await readFile(__dirname + '/authors.json', 'utf8');
        const authors = JSON.parse(authorsData);
        
        const authorsPromises = authors.map(author => execQuery('INSERT INTO Authors SET ?', author));
        await Promise.all(authorsPromises);

        const papersData = await readFile(__dirname + '/researchPapers.json', 'utf8');
        const researchPapers = JSON.parse(papersData);
    
        const papersPromises = researchPapers.map(researchPaper => execQuery('INSERT INTO Research_Papers SET ?', researchPaper));
        await Promise.all(papersPromises);

        const authorsPapersData = await readFile(__dirname + '/Authors_Papers.json', 'utf8');
        const authorsPapers = JSON.parse(authorsPapersData);
    
        const authorsPapersPromises = authorsPapers.map(authorsPaper => execQuery('INSERT INTO Authors_Papers SET ?', authorsPaper));
        await Promise.all(authorsPapersPromises);


        connection.end();
    
    } 
    
    catch (err) {
      console.error(err.message);
      connection.end();
    }
  }
  
  seedDatabase();