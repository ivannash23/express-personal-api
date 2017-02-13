var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AthleteSchema = new Schema({
	name: String,
	isInATeam: {
		type: Boolean,
		default: false
	},
	sport: String
});

var Athlete = mongoose.model('Athlete', AthleteSchema);

module.exports = Athlete;