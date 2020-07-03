const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dbName = 'world';
const url = "mongodb://baraa:admin2admin@cluster0-shard-00-00.mxcsa.mongodb.net:27017,cluster0-shard-00-01.mxcsa.mongodb.net:27017,cluster0-shard-00-02.mxcsa.mongodb.net:27017/baraa?ssl=true&replicaSet=atlas-h9320j-shard-0&authSource=admin&retryWrites=true&w=majority";

MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const colCity = client.db(dbName).collection('city');
    colCity.insertOne({"name":"Latakia", "countryCode":"SYR","district": "Latakia","population":123456}, function(err, result) { 
    assert.equal(null, err);
    console.log("inserted")
    client.close();
    });
});