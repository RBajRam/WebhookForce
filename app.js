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
            console.log(res.records);  
            var records= res.records;   
        
            //TODO Pasar los registros por payload.
            response.send({
            speech: 'Records Found',
            displayText: 'Records Found',
            data:{ records: records},
            source: 'WebhookForce'
        });
        });
    });
});

app.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});

