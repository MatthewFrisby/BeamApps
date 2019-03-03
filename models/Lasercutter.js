
var mongoose = require('mongoose');
// Setup schema
var LaserCutterSchema = new mongoose.Schema({

  name: {
      type: String,
      required: true
  },
    location: {
        type: String,
        required: true
    },
      on_cutter:{
      type: Boolean,
      default: false
    },
    waiting:{
      type: Boolean,
      default: true
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    check_in_time:{
      type: Number,
      default: Date.now()
    },
    start_cut_time:{
      type: Number,
      default: Date.now()
    },
    finish_cut_time:{
      type: Number,
      default: Date.now()
    },
    timeLeft: {
      type: String,
      default: ''
    },
    remove_date: {
      type: Date,
      default: Date.now
    },
    checks_complete:{
      type: Boolean,
      default: false
    }
});

var LaserCutter = mongoose.model('LaserCutter', LaserCutterSchema);
module.exports = LaserCutter;
