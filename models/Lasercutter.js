
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
    live:{
      type: Boolean,
      default: true
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    timeLeft: {
      type: String,
      default: ''
    },
    remove_date: {
      type: Date,
      default: Date.now
    }
});

var LaserCutter = mongoose.model('LaserCutter', LaserCutterSchema);
module.exports = LaserCutter;
