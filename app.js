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
    conn.login('r.bajo.ramos@accenture.com','testing1234', function(err, res) {
        if (err) { return console.error(err); }
        conn.query('SELECT Id, Name FROM Account', function(err, res) {
          if (err) { return console.error(err); }
          console.log(res);
        });
    });
});

