var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var signSchema = new Schema({
	properties: {
		B: {type: String, required: true},
		ID: {type: Number, required: true},
		MUT: {type: String, required: true},
		T: {type: String, required: true}

	},
	geometry: { 
		coordinates: {type: [Number], index: '2dsphere'}
	}
});

var signs = mongoose.model("signs", signSchema);

module.exports = signs;