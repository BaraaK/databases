const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dbName = 'world';
const url = "mongodb://baraa:admin2admin@cluster0-shard-00-00.mxcsa.mongodb.net:27017,cluster0-shard-00-01.mxcsa.mongodb.net:27017,cluster0-shard-00-02.mxcsa.mongodb.net:27017/baraa?ssl=true&replicaSet=atlas-h9320j-shard-0&authSource=admin&retryWrites=true&w=majority";

// MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
//     assert.equal(null, err);
//     console.log("Connected successfully to server");

//     const colCity = client.db(dbName).collection('city');
//     colCity.find({name : "Latakia"}  , function(err, result) { 
//     assert.equal(null, err);
//     console.log(result)
//     colCity.find({countryCode : "SYR"}).toArray(function(err, docs) {
//         console.log(JSON.stringify(docs)); 
//     });
//     client.close();
// })
// });

async function findTowQueries() {
    const client = await MongoClient.connect(url,{useUnifiedTopology: true}, async(err,client) => {
        
        if(!client) return
        try {
            const colCity = client.db(dbName).collection('city');
            var firstRes = await colCity.find({"name" : "Latakia"})
            console.log(firstRes)
            var secondRes = await colCity.find({"countryCode" : "SYR"});
            console.log(secondRes)
            client.close()
        }
        catch(err) {
            console.log(err)
            client.close()
        }
    })


}
findTowQueries();