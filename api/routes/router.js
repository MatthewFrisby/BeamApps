var express = require('express');
var router = express.Router();
var Admin = require('../models/Admin');
var LaserCutter = require('../models/Lasercutter');
var cors = require('cors');
var app = express();

var corsOptions = {
  credentials: true,
  origin: 'http://localhost:4200'
};

//GET Lasercutter QUEUE Entries
router.get('/lasercutter', function(req, res, next) {
  LaserCutter.find({}, {
    create_date: 1,
    in_queue: 1,
    location: 1
  }, function(err, lasercutter) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      data: lasercutter
    });
  }).sort({
    in_queue: -1,
    create_date: 1
  });
});


router.get('/lasercutter/:location', function(req, res, next) {

  LaserCutter.find({
    location: req.params.location
  }, {
    create_date: 1,
    in_queue: 1,
    location: 1,
    timeLeft: 1
  }, function(err, lasercutter) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      data: lasercutter
    });
  }).sort({
    in_queue: -1,
    create_date: 1
  });;

});


router.get('/lasercutter/admin/:location', function(req, res, next) {


  LaserCutter.find({
    location: req.params.location
  }, function(err, lasercutter) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      data: lasercutter
    });
  }).sort({
    in_queue: -1,
    create_date: 1
  });




});

//POST TO LOGIN TO ADMIN CONSOLE
router.post('/lasercutter', cors(corsOptions), function(req, res, next) {
  // confirm that user typed same password twice

  if (
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var adminData = {
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    Admin.create(adminData, function(error, admin) {
      if (error) {
        return next(error);
      } else {
        req.session.adminId = admin._id;
        return res.redirect('');
      }
    });

  } else if (req.body.logusername && req.body.logpassword) {
    Admin.authenticate(req.body.logusername, req.body.logpassword, function(error, admin) {
      if (error || !admin) {
        var err = new Error('Wrong username or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.adminId = admin._id;
        return res.status(err ? 500 : 200).send(err ? err : req.session);
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})



// GET for logout logout
router.get('/lasercutter/admin/logout', cors(corsOptions), function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.status(err ? 500 : 200).send(err ? err : req.session.adminId);
      }
    });
  }
});

//POST NEW LASERCUTTER USER IN QUEUE
router.post('/lasercutter/admin', function(req, res, next) {
  var lasercutter = new LaserCutter();
  if (req.body.location == "murray") {
    lasercutter.location = "Murray";
  } else if (req.body.location == "hanes") {
    lasercutter.location = "Hanes";
  } else {
    lasercutter.location = req.body.location ? req.body.location : lasercutter.location;
  }
  lasercutter.name = req.body.name;

  // save the contact and check for errors
  lasercutter.save(function(err) {
    if (err) {
      res.json(err);
    } else {
      res.json({
        message: 'New user added to queue',
        data: lasercutter
      });
    }
  });

});

//DELETE USER FROM QUEUE
router.delete('/lasercutter/admin/:_id', function(req, res, next) {

  LaserCutter.findById(req.params._id)
    .exec(function(error, lasercutter) {
      if (error) {
        return next(error);
      } else {


        var temp_id = req.params._id;
        //		var finish = Date.now;
        //	var start = lasercutter.create_date;

        LaserCutter.findByIdAndDelete(temp_id, function(err) {
          if (err) {
            res.json({
              message: 'Error!'
            });
          } else {
            res.json({
              message: "User " + req.params._id + " removed from queue!"
            });
          }
        });
      }
    });
});

router.delete('/lasercutter/admin', cors(corsOptions), function(req, res, next) {

  LaserCutter.remove(function(err) {
    if (err) {
      res.json({
        message: 'Error!'
      });
    } else {
      res.json({
        message: "All users removed from queue!"
      });
    }

  });
});

router.put('/lasercutter/admin/:_id', function(req, res, next) {

  LaserCutter.findById(req.params._id)
    .exec(function(error, lasercutter) {
      if (error) {
        return next(error);
      } else {


        var temp_id = req.params._id;
        //		var finish = Date.now;
        //	var start = lasercutter.create_date;

        LaserCutter.findByIdAndUpdate(temp_id, {in_queue: !lasercutter.in_queue, timeLeft: req.body.timeLeft}, function(err, newbool) {
          if (err) {
            res.json({
              message: 'Error!'
            });
          } else {
            res.json({
              message: "Time left: " + req.body.timeLeft
            });
          }
        });
      }
    });
});





module.exports = router;
