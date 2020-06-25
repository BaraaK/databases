const mysql = require('mysql');
const config = require('./config.js')

const connection = mysql.createConnection(config);

//All research papers and the number of authors that wrote that paper
connection.query(
    `SELECT RP.paper_id , COUNT(author_no) AS "number of authors"  FROM research_papers AS RP
    INNER JOIN authors_papers AS AP 
    ON RP.paper_id = AP.paper_id
    INNER JOIN authors AS A
    ON AP.author_id = A.author_no
    GROUP BY RP.paper_id
    ORDER BY RP.paper_id;`, error => {
        if (error) {
        throw error;
        }
    })

//Sum of the research papers published by all female authors.
connection.query(
    `SELECT COUNT(DISTINCT (RP.paper_id)) AS "Sum of the research papers published by all female authors"
     FROM research_papers AS RP
    INNER JOIN authors_papers AS AP
    ON RP.paper_id = AP.paper_id
    INNER JOIN authors AS A
    ON AP.author_id = A.author_no
    WHERE A.gender = "female";`, error => {
        if (error) {
        throw error;
        }
    })

//Average of the h-index of all authors per university.
connection.query(
    `SELECT university , AVG(h_index) AS "average of h_inex" FROM authors 
    GROUP BY university;`, error => {
        if (error) {
        throw error;
        }
    })


//Sum of the research papers of the authors per university.
connection.query(
    `SELECT A.university, COUNT(RP.paper_id) AS "count of papers" FROM research_papers AS RP
    INNER JOIN authors_papers AS AP
    ON RP.paper_id = AP.paper_id
    INNER JOIN authors AS A
    ON AP.author_id = A.author_no
    GROUP BY A.university ;`, error => {
        if (error) {
        throw error;
        }
    })

//Minimum and maximum of the h-index of all authors per university.
connection.query(
    `SELECT university , MIN(h_index) AS "MIN of h_inex" ,MAX(h_index) AS "MAX of h_inex"  FROM authors 
    GROUP BY university;`, error => {
        if (error) {
        throw error;
        }
    })
connection.end()