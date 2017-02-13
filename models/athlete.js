var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AthleteSchema = new Schema({
	name: String,
	isInOthersSports: Boolean,
	isInATeam: Boolean,
	// sport: {
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'Sport'
	// }
});

var Athlete = mongoose.model('Athlete', AthleteSchema);

module.exports = Athlete;