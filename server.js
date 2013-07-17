#!/bin/env node

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , ejs = require('ejs')
  , mysql = require('mysql');

var app = express();

var port = process.env.OPENSHIFT_NODEJS_PORT ||  process.env.OPENSHIFT_INTERNAL_PORT || 8080;  
var ipaddr = process.env.OPENSHIFT_NODEJS_IP || process.env.OPENSHIFT_INTERNAL_IP;  

http.createServer(app).listen(port, ipaddr, function(){
  console.log('Express server listening on port ' + port);
});

// DB
var connection = mysql.createConnection({
  host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
  user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME,
  password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
  database : process.env.OPENSHIFT_GEAR_NAME
});

app.use(express.bodyParser());

app.get('/', function(req, res){
  connection.query('use ' + 'classicmodels');
  connection.query('SELECT customerNumber, contactFirstName, contactLastName FROM customers ORDER BY customerNumber', function(err, result, fields){
    var people = [];
    if (err) {
      throw err;
    } else {
       for (i=0; i<5; i++)
        {
            people[i] = result[i];
        }
      res.render('index.html', {people: people});
    }
  });
});

app.post('/', function (req, res) {
  connection.query('insert into customers (customerNumber, contactFirstName, contactLastName) values ("' + req.body.custNum + '", "' + req.body.firstName + '", "' + req.body.lastName + '")',
    function (err, results, fields) {
        if (err) throw err;
        else res.send('success');
    });
});
// /DB

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.set('views', __dirname + '/views');

app.get('/', routes.index);
app.get('/users', user.list);
