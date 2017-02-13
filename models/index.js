var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api");

module.exports.Athlete = require('./athlete.js');
module.exports.Sport = require('./sport.js');
module.exports.Team = require('./team.js');