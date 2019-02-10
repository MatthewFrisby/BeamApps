
var mongoose = require('mongoose');
// Setup schema
var LaserCutterSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

var LaserCutter = mongoose.model('LaserCutter', LaserCutterSchema);
module.exports = LaserCutter;
