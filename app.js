const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const jsforce = require('jsforce');

const app = express();
const conn = new jsforce.Connection();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send('Welcome to WebhookForce');
});

app.post('/',function(req, response){
    var query= req.body.result.fulfillment.speech;
    conn.login('r.bajo.ramos@accenture.com','testing1234x7Xg4QsQXWGEfCsC02UeUCSbJ', function(err, res) {
        if (err) { return console.error(err); }
        conn.query(query, function(err, res) {
            if (err) { return console.error(err); }           
            var allRecords= res.records;   
            //console.log(allRecords);     
        var a= response.send({
            speech: 'Records Found',
            displayText: 'Records Found',
            payload: {records: allRecords},
            source: 'WebhookForce'
        });
        console.log(a);
        });
    });
});

app.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});

