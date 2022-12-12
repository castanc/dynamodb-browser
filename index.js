AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:32f6d6ad-3da6-4d98-83ad-5d30789ed990',
});


function getItem() {
    let DynamoDB = new AWS.DynamoDB.DocumentClient();
    let expirationDays = 30;
    let dt = new Date();
    var expirationDate = new Date();


    var params = {
        TableName: "KG-USERS",
        Key: {
            "APP_USER_ID": "LOCAL-USER-3",
        },
        ConditionExpression: "attribute_exists(APP_USER_ID)"
    };


    DynamoDB.get(params, function (err, data) {
        if (err) {
            console.log("ERROR EXECUTING")
            console.log(err);
            alert("error executing");
            //return throw err;
        }

        //this is put
        console.log("SUCCESS");
        console.log(data);
        alert(JSON.stringify(data));
    });
}

function setItem()
{
    let o = {};
    o.Name = "Cesar";
    o.LName = "Castano";
    o.Created = new Date();
    o.Apps = "SW";
    o.Type = "F";
    o.Id = 1;
    o.Val = 4.99
    o.Lang = "en";
    o.Region = "us";

    let json = JSON.stringify(o);

    var params = {
        TableName: 'KG-USERS',
        Item: {
            "APP_USER_ID": "castanc@gmail.com",
          'DATA' : {S: json}
        }
      };

      //var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
      var docClient = new AWS.DynamoDB.DocumentClient();
      
      docClient.put(params, function(err, data) {
        if (err) {
          console.log("Error", err);
          alert("error", err.message);
        } else {
          console.log("Success", data);
          alert("success",data);
        }
      });
}

function setItemPromise()
{
    const dynamodbParams = {
        TableName: 'KG-USERS',
        Item: {
            "APP_USER_ID": "ccastanouy@gmail.com",
          'DATA' : {S: "SW|20221202141600|F|0.00||||"}
        },
      };

      var docClient = new AWS.DynamoDB.DocumentClient();

      docClient.put(dynamodbParams).promise()
      .then(data => {
        console.log('saved: ', dynamodbParams);
        alert("success 2");
      })
      .catch(err => {
        console.error(err);
        alert("error 2");
      });  
}

//getItem();
//setItem();
setItemPromise();