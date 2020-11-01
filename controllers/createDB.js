var AWS = require("aws-sdk");
var table = "Users";
const username = 'oza.dishank@gmail.com'

AWS.config.update({
  region: "us-east-1",
  //endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: table,
    Item:{
        "username": username,
        "password": "1234"
    }
};

var query = {
    TableName : table,
    Key:{
        "username" : username
    }
}


docClient.get(query,function(err, data) {
    if (JSON.stringify(data) == '{}') {
        docClient.put(params, function(err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Added item:");
            }
        });
        
    } else {
        console.log(data)
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
});