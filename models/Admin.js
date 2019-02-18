var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs');

var AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  }
});

//authenticate input against database
AdminSchema.statics.authenticate = function (username, password, callback) {
  Admin.findOne({ username: username })
    .exec(function (err, admin) {
      if (err) {
        return callback(err)
      } else if (!admin) {
        var err = new Error('Admin not found.');
        err.status = 401;
        return callback(err);
      }
      bcryptjs.compare(password, admin.password, function (err, result) {
        if (result === true) {
          return callback(null, admin);
        } else {
          return callback();
        }
      })
    });
}

//hashing a password before saving it to the database
AdminSchema.pre('save', function (next) {
  var admin = this;
  bcryptjs.hash(admin.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    admin.password = hash;
    next();
  })
});

AdminSchema.pre('findOneAndUpdate', function (next) {
  var admin = this;
  bcryptjs.hash(admin.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    admin.password = hash;
    next();
  })
});



var Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
