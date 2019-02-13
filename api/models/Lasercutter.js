
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
    in_queue:{
      type: Boolean,
      default: false
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    timeLeft: {
      type: String,
      default: ''
    }
});

var LaserCutter = mongoose.model('LaserCutter', LaserCutterSchema);
module.exports = LaserCutter;
