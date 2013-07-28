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

// FOR LOCAL DEVELOPMENT, CHANGE THE ABOVE TO:
// var connection = mysql.createConnection({
//   socketPath  : '/Applications/MAMP/tmp/mysql/mysql.sock', //<-- Make sure you have MAMP installed.
//   user     : 'YOUR MYSQL USERNAME',
//   password : 'YOUR MYSQL PASSWORD'
// });

app.use(express.bodyParser());

app.get('/', function(req, res){

  /* Setup a client to automatically replace itself if it is disconnected.
  @param {Connection} connection
  A MySQL connection instance. */
  function replaceConnectionOnDisconnect(connection) {
    console.log("replaceConnectionOnDisconnect");
    connection.on("error", function (err) {
      if (!err.fatal) {
        return;
      }
   
      if (err.code !== "PROTOCOL_CONNECTION_LOST") {
        throw err;
      }
   
      /* connection.config is actually a ConnectionConfig instance, not the original
      configuration. For most situations this is fine, but if you are doing 
      something more advanced with your connection configuration, then 
      you should check carefully as to whether this is actually going to do
      what you think it should do. */
      connection = mysql.createConnection(connection.config);
      replaceconnectionOnDisconnect(connection);
      connection.connect(function (error) {
        if (error) {
          /* Well, we tried. The database has probably fallen over.
          That's fairly fatal for most applications, so we might as
          call it a day and go home. */
          process.exit(1);
        }
      });
    });
  }
 
  // And run this on every connection as soon as it is created.
  // replaceConnectionOnDisconnect(connection);

  connection.query('use ' + 'seon');
  connection.query('SELECT number, firstName, lastName FROM surfers ORDER BY number', function(err, result, fields){
    replaceConnectionOnDisconnect(connection);
    var surfers = [];
    if (err) {
      throw err;
    } else {
       for (i=0; i<result.length; i++)
        {
            surfers[i] = result[i];
        }
      res.render('index.html', {surfers: surfers});
    }
  });
});

app.post('/', function (req, res) {
  connection.query('insert into surfers (number, firstName, lastName) values ("' + req.body.num + '", "' + req.body.firstName + '", "' + req.body.lastName + '")',
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
