// require express and other modules
var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  app = express();

// parse incoming urlencoded form data
// and populate the req.body object
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api/sports', function(req, res) {
  
  //get all the sports
  db.Sport.find({}, function(err, esportes){ // BUG .find is not a function BUG
      if (err) { return console.log("index error: " + err); }
      res.json(esportes);
    });

});

app.get('/api/athletes', function(req, res){

  // get all the teams
  db.Team.find({}, function(err, time){
      if (err) { return console.log("index error: " + err); }
      res.json(time);
    });
  
});

app.get('/api/teams', function(req, res){

  // get all the athletes
  db.Athlete.find({}, function(err, atletas){
      if (err) { return console.log("index error: " + err); }
      res.json(atletas);
    });

});



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
