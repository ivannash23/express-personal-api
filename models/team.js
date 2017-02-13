var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
	name: String,
	athlete: [{
		type: Schema.Types.ObjectId,
		ref: 'Athlete'
	}],
	color1: String,
	color2: String,
	sport: String
});

var Team = mongoose.model('Team', TeamSchema);

module.exports = Team;