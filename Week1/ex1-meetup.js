var mysql      = require('mysql');
var fs = require('fs');
var file = __dirname + '/data.json';
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : '',
});

var dropDatabaseMeetup = `DROP DATABASE IF EXISTS meetup ;`
var createDatabase = " CREATE DATABASE meetup;"
var useDatabase = "USE meetup;"
var createTableInvitee = ` CREATE TABLE Invitee (invitee_no INT AUTO_INCREMENT NOT NULL PRIMARY KEY  ,  invitee_name VARCHAR(255)  ,  invited_by VARCHAR(255));`
var createTableRoom = ` CREATE TABLE Room (room_no INT AUTO_INCREMENT NOT NULL PRIMARY KEY  ,  room_name VARCHAR(255)  ,  floor_number INT);`
var createTableMeeting = `CREATE TABLE Meeting (meeting_no INT AUTO_INCREMENT NOT NULL PRIMARY KEY  ,  meeting_title VARCHAR(255)  ,  starting_time TIME  ,  ending_time TIME  ,  room_no INT );`
var numQueries = 0

// execute a query
function execute(query , cb = null) 
{
    numQueries += 1
    connection.query(query, function (error, results, fields) {
        if (error) {
            throw (error);
        }
        console.log(` The query : "${query}" executed successfully...`)
        numQueries -= 1
        if(cb != null)
            cb()
    })

}

// insert data into tables
function insertIntoTable (tableName,values) {
    var insert = `INSERT INTO ${tableName} VALUES`
    for( let row=0 ; row < values.length ; row++) {
        var listOFValue = []
        for( let col=0 ; col<values[row].length ; col++) {
            if(typeof(values[row][col]) != "number" ) 
                values[row][col] = `'${values[row][col]}'`;
            listOFValue.push(values[row][col])
  
        }
        listOFValue.join(',')
        if(row!=0)
            insert+=','
        insert += ` (${listOFValue.toString()})`
    }
    insert+=';'
    execute(insert,() => {
        if (numQueries==0) connection.end() // close connection when only all queries are executed
    })
}

// execute multiple queries to create database and use it and create tables
function multiCreate(queries,cb)
{
    for (const query of queries) {
        execute(query)
    }

}

connection.connect()

multiCreate([dropDatabaseMeetup,createDatabase,useDatabase,createTableInvitee,createTableRoom,createTableMeeting])

// get data from json file, since the request is local we use fs, in case it is http request we should use another interfaces (node-fetch, http)
fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
        console.log('Error: ' + err);
        return;
    }
    
    let json  = JSON.parse(data);
    for (const key in json) {
        if (json.hasOwnProperty(key)) {
            const element = json[key];
            insertIntoTable(key,element)
        }
    }
});







