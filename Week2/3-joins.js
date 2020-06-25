const mysql = require('mysql');
const config = require('./config.js')

const connection = mysql.createConnection(config);

//prints names of all Authors and their corresponding Collaborators.
connection.query(
    `SELECT A.author_name AS Author,C.author_name AS collaborator from authors AS A
    INNER JOIN authors AS C
    ON C.author_no = A.Collaborator;`, error => {
        if (error) {
        throw error;
        }
    });

//prints all columns of Authors and their pubished paper_title.
// If there is an author without any Research_Papers, print the information of that Author too

connection.query(
    `SELECT A.* , RP.paper_title from authors AS A
    LEFT JOIN Authors_Papers AS AP ON A.author_no = AP.author_id
    LEFT JOIN Research_Papers AS RP ON AP.paper_id = RP.paper_id;`
    , error => {
        if (error) {
        throw error;
        }
    });

    connection.end()