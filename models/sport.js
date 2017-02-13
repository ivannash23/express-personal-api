var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SportSchema = new Schema({
	name: String,
	athletes: {
		type: Schema.Types.ObjectId,
		ref: 'Athlete'
	}
});

var Sport = mongoose.model('Sport', SportSchema);

module.exports = Sport;