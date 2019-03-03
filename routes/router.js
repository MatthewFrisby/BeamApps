var express = require('express');
var router = express.Router();
var Admin = require('../models/Admin');
var LaserCutter = require('../models/Lasercutter');
var mongoose = require('mongoose');
var cors = require('cors');
var app = express();

var corsOptions = {
  credentials: true,
   origin: 'http://localhost:4200'
};

function loginRequired (req, res, next) {
  if (!req.session.adminId){
    var err = new Error('Not Authorized');
    err.status = 401;
    return res.status(err ? 401 : 200).send(err ? {status: err.status, data: ["false"]}: req.session);
   }

  else {next();}
}

router.get('/api/lasercutter/admin/auth', function(req, res, next){
  var auth = "false"
  var err = new Error('Not Authorized');
  if(req.session.adminId){
    err.status = 200;
    auth = "true";
  }else{
    err.status = 401;
    auth = "false";
  }

  return res.json({status: err.status, data: [auth]});

}),

//GET Lasercutter QUEUE Entries
router.get('/api/lasercutter/admin',  loginRequired, function(req, res, next) {
if(req.session){
  LaserCutter.find({waiting: false}, {
    name: 1,
    waiting: 1,
    on_cutter: 1,
    location: 1,
    create_date: 1,
    remove_date: 1,
    check_in_time: 1,
    start_cut_time: 1,
    finish_cut_time: 1,
    staff_checks_complete:1
  }, function(err, lasercutter) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.xls('data.xlsx', lasercutter);
    // res.json({
    //   status: "success",
    //   data: lasercutter
    // });
  }).lean().sort({
    location: -1,
    create_date: 1
  });
}else{
  var err = new Error('Not Authorized');
  err.status = 400;
  return next(err);
}
});





router.get('/api/lasercutter/:location', function(req, res, next) {

  LaserCutter.find({location: req.params.location, waiting: true }, {
    create_date: 1,
    on_cutter: 1,
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
    on_cutter: -1,
    create_date: 1
  });;

});



router.get('/api/lasercutter/admin/:location',  loginRequired, function(req, res, next) {

  if(req.session){


  LaserCutter.find({
    location: req.params.location, waiting: true
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
    on_cutter: -1,
    create_date: 1
  });
}else{
  var err = new Error('Not Authorized');
  err.status = 400;
  return next(err);
}



});




//POST TO LOGIN TO ADMIN CONSOLE
router.post('/api/lasercutter', cors(corsOptions), function(req, res, next) {
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
        return res.json({status: "success", data: admin._id});
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
router.get('/api/lasercutter/admin/logout',  loginRequired, function(req, res, next) {
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
router.post('/api/lasercutter/admin',  loginRequired, function(req, res, next) {
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
    router.delete('/api/lasercutter/admin/:_id', loginRequired, function(req, res, next) {

      LaserCutter.find({ _id: req.params._id}, function(error, lasercutter) {
          if (error) {
            return next(error);
          } else {

          var temp_id = req.params._id;

          //		var finish = Date.now;
          //	var start = lasercutter.create_date;
        let swap = new Data(lasercutter);
        swap.save();

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

    router.delete('/api/lasercutter/admin', loginRequired, function(req, res, next) {

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

    router.put('/api/lasercutter/admin/:_id',  loginRequired, function(req, res, next) {

      LaserCutter.findById(req.params._id)
        .exec(function(error, lasercutter) {
          if (error) {
            return next(error);
          } else {


            var temp_id = req.params._id;
            //		var finish = Date.now;
            //	var start = lasercutter.create_date;
            var _time = 0;
            if(lasercutter.on_cutter){
              _time = lasercutter.check_in_time;
            }else{
              _time = Date.now();
            }

            LaserCutter.findByIdAndUpdate(temp_id, {
              on_cutter: !lasercutter.on_cutter,
              start_cut_time: _time,
              timeLeft: req.body.timeLeft
            }, function(err, newbool) {
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




    router.get('/api/lasercutter/admin/check/:_id',  loginRequired, function(req, res, next) {

      LaserCutter.findById(req.params._id)
        .exec(function(error, lasercutter) {
          if (error) {
            return next(error);
          } else {


            var temp_id = req.params._id;
            //		var finish = Date.now;
            //	var start = lasercutter.create_date;


            LaserCutter.findByIdAndUpdate(temp_id, {
              checks_complete: true
            }, function(err, newbool) {
              if (err) {
                res.json({
                  message: 'Error!'
                });
              } else {
                res.json({
                  message: "User "+temp_id+" is ready to cut!"
                });
              }
            });
          }
        });
    });



    router.put('/api/lasercutter/admin/remove/:_id',  loginRequired, function(req, res, next) {

      LaserCutter.findById(req.params._id)
        .exec(function(error, lasercutter) {
          if (error) {
            return next(error);
          } else {


            var temp_id = req.params._id;
            //		var finish = Date.now;
            //	var start = lasercutter.create_date;

            LaserCutter.findByIdAndUpdate(temp_id, {
              finish_cut_time: Date.now(),
              waiting: false,
              on_cutter: false,
              remove_date: req.body.remove_date
            }, function(err, newbool) {
              if (err) {
                res.json({
                  message: 'Error!'
                });
              } else {
                res.json({
                  message: "User " + temp_id +" Removed!"
                });
              }
            });
          }
        });
    });



    module.exports = router;
