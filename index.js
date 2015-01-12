var express = require('express'),
  dotenv = require('dotenv'),
  app = express(),
  server = require('http').createServer(app);

dotenv.load();

// serve up files from the client folder
app.use(express.static(__dirname + '/client'));

// set up server on port defined in .env
server = server.listen(process.env.PORT, function(){
  console.log('node server listening at ' + process.env.PORT);

});