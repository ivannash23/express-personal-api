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

var new_athletes = [
{
_id: "58a114c0e4af0007a8404538",
__v: 0,
sport: "soccer, capoeira, basketball, jiu-jitsu",
isInOthersSports: true,
name: "Ivan M.",
isInATeam: false
},
{
_id: "58a116b6a7c48e07e8f2eae2",
name: "Anton P.",
isInOthersSports: false,
sport: "soccer",
__v: 0,
isInATeam: false
},
{
_id: "58a13cf0f10ba90bdea0ae1d",
name: "Brett M.",
sport: "soccer",
__v: 0,
isInATeam: false
},
{
_id: "58a13d98c7db610bf8e6d2ae",
name: "Chris P.",
sport: "Water Polo, baseball",
__v: 0,
isInATeam: false
},
{
_id: "58a13dcdc7db610bf8e6d2af",
name: "Christen W.",
sport: "Dodge Ball",
__v: 0,
isInATeam: false
},
{
_id: "58a13de4c7db610bf8e6d2b0",
name: "Kevin K.",
sport: "football",
__v: 0,
isInATeam: false
},
{
_id: "58a13e1fc7db610bf8e6d2b1",
name: "Kody L.",
sport: "soccer, baseball, basketball",
__v: 0,
isInATeam: false
},
{
_id: "58a13e39c7db610bf8e6d2b2",
name: "Logan M.",
sport: "Rock Climbing",
__v: 0,
isInATeam: false
},
{
_id: "58a13e96c7db610bf8e6d2b3",
name: "Michelle F.",
sport: "soccer, rock climbing, soccer",
__v: 0,
isInATeam: false
},
{
_id: "58a13f0cc7db610bf8e6d2b4",
name: "Nathan A.",
sport: "cheese rolling, zoorb",
__v: 0,
isInATeam: false
},
{
_id: "58a13f35c7db610bf8e6d2b5",
name: "Regelyn C.",
sport: "Taekwondo",
__v: 0,
isInATeam: false
},
{
_id: "58a13f4fc7db610bf8e6d2b6",
name: "Sherri A.",
sport: "Volleyball",
__v: 0,
isInATeam: false
},
{
_id: "58a13f67c7db610bf8e6d2b7",
name: "Thelma B.",
sport: "Kickball",
__v: 0,
isInATeam: false
},
{
_id: "58a13f7cc7db610bf8e6d2b8",
name: "Timothy S.",
sport: "baseball",
__v: 0,
isInATeam: false
},
{
_id: "58a13f92c7db610bf8e6d2b9",
name: "Weston D.",
sport: "soccer",
__v: 0,
isInATeam: false
},
{
_id: "58a13fb8c7db610bf8e6d2ba",
name: "Yan-Yin C.",
sport: "Kung-fu",
__v: 0,
isInATeam: false
},
{
_id: "58a13fe1c7db610bf8e6d2bb",
name: "Yvonne T.",
sport: "volleyball",
__v: 0,
isInATeam: false
},
{
_id: "58a1ec06bb12ed0eff9ca836",
name: "Joe Schmoe",
sport: "Badmitton",
__v: 0,
isInATeam: false
}
];

var new_teams = [
{
_id: "58a16336bb12ed0eff9ca835",
name: "WDI-35",
sport: "soccer",
color1: "Black",
color2: "White",
__v: 0,
athlete: [ ]
}
]

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
  res.sendFile('/views/index.html' , { root : __dirname});
});


/*
 * JSON API Endpoints
 */

/////////////////////////
/////Athlete Routes//////
/////////////////////////


app.get('/api/athletes', function(req, res){

  // get all the athletes
  db.Athlete.find({}, function(err, atletas){
      if (err) { return console.log("index error: " + err); }
      res.json(atletas);
    });
  
});

app.post('/api/athletes', function (req, res) {

  // create a new athlete
    var atleta = req.body;
    db.Athlete.create(atleta, function(err, newAtleta){
      if(err){ console.log(err);}
      res.json(newAtleta);
    });

});

app.get('/api/athletes/:id', function(req, res) {
  
  //find a athlete by Id
  var athleteId = req.params.id;
  db.Athlete.findOne({ _id: athleteId}, function(err, foundAtleta){
    if(err){ console.log(err);}
    res.json(foundAtleta);
  });

});

app.put('/api/athletes/:id', function(req,res){

  // update a athlete by it's id
  var updateAtleta = req.params.id;
  db.Athlete.findOne({_id: updateAtleta}, function(err, foundAtleta){
    foundAtleta.name = req.body.name;
    foundAtleta.isInOthersSports = req.body.isInOthersSports;
    foundAtleta.isInATeam = req.body.isInATeam;
    foundAtleta.sport = req.body.sport;

    foundAtleta.save(function(err, savedAtleta){
      res.json(savedAtleta)
    });
  
  });

});

app.delete('/api/athletes/:id', function (req, res) {

  // delete athletes by id
  var deleteAthletesId = req.params.id;
  db.Athlete.findOneAndRemove({_id: deleteAthletesId}, function(err, deletedAtleta){
    if(err){ console.log(err);}
      res.json(deletedAtleta);
  });

});

/////////////////////////
/////Teams Routes////////
/////////////////////////


app.get('/api/teams', function(req, res){

  // get all the teams
  db.Team.find({}, function(err, time){
      if (err) { return console.log("index error: " + err); }
      res.json(time);
    });

});

app.post('/api/teams', function (req, res) {

  // create a new team 
    var times = req.body;
    db.Team.create(times, function(err, newTime){
      if(err){ console.log(err);}
      res.json(newTime);
    });

});

app.get('/api/teams/:id', function(req, res) {
  
  //find a team by Id
  var teamId = req.params.id;
  db.Team.findOne({ _id: teamId}, function(err, foundTeam){
    if(err){ console.log(err);}
    res.json(foundTeam);
  });

});

app.put('/api/teams/:id', function(req,res){

  // update a athlete by it's id
  var updateTeam = req.params.id;
  db.Team.findOne({_id: updateTeam}, function(err, foundTeam){
    foundTeam.name = req.body.name;
    foundTeam.color1 = req.body.color1;
    foundTeam.color2 = req.body.color2;
    foundTeam.sport = req.body.sport;

    foundTeam.save(function(err, savedTeam){
      res.json(savedTeam)
    });

  });

});

app.delete('/api/teams/:id', function (req, res) {

  // delete teams by id
  var deleteTeamId = req.params.id;
  db.Team.findOneAndRemove({_id: deleteTeamId}, function(err, deleteTeam){
    if(err){ console.log(err);}
      res.json(deleteTeam);
  });

});



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
