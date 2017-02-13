var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AthleteSchema = new Schema({
	name: String,
	isInOthersSports: Boolean, // not sure if i need this
	isInATeam: Boolean,
	sport: String
});

var Athlete = mongoose.model('Athlete', AthleteSchema);

module.exports = Athlete;