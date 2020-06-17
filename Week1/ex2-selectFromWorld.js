var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'world'
});

connection.connect();

var useDatabaseWorld = "use world;"
var selectQuery1 = `SELECT name FROM country WHERE Population > 8000000;`
var selectQuery2 = `SELECT name FROM country WHERE name LIKE "%land%";` 
var selectQuery3 = `SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000;`
var selectQuery4 = `SELECT name FROM country WHERE continent LIKE "Europe"; `
var selectQuery5 = `SELECT * FROM country ORDER BY surfaceArea DESC;`
var selectQuery6 = `SELECT name FROM city WHERE countryCode LIKE "NLD";` 
var selectQuery7 = `SELECT population FROM city WHERE name LIKE "Rotterdam";`
var selectQuery8 = `SELECT name FROM country ORDER BY surfaceArea DESC LIMIT 10;` 
var selectQuery9 = `SELECT name FROM city ORDER BY population DESC LIMIT 10;`
var selectQuery10 = `SELECT SUM(population) FROM country;`


connection.query(useDatabaseWorld, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("database world is used");
});

function executeQuery(query){
    connection.query(query, function (error, results, fields) {
        if (error) {
            throw error;
        }
        var element =[]
        results.forEach(object => {
            for (const key in object) {
                if (object.hasOwnProperty(key)) {
                    element.push(object[key]);   
                }
            }
        });
        console.log(element);
    });
}
executeQuery(selectQuery1)
executeQuery(selectQuery2)
executeQuery(selectQuery3)
executeQuery(selectQuery4)
executeQuery(selectQuery5)
executeQuery(selectQuery6)
executeQuery(selectQuery7)
executeQuery(selectQuery8)
executeQuery(selectQuery9)
executeQuery(selectQuery10)
connection.end();
