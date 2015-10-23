var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* Delete User By ID. */
router.get('/deleteUser/:userid', function(req, res) {
	var userId = req.params.userid;
   	var db = req.db;
    var collection = db.get('usercollection');

    collection.remove({_id: userId}, function(err, removed){
    	if (err) {
            res.send("There was a problem quering the information from the database.");
        } else {
        	res.send("Ok");
        }
    });
});

/* GET User By ID. */
router.get('/getUserById/:userid', function(req, res) {
	var userId = req.params.userid;
   	var db = req.db;
    var collection = db.get('usercollection');

    collection.findOne({_id: userId}, function(err, doc){
        if (err) {
            res.send("There was a problem quering the information from the database.");
        } else {
            res.send(doc);
        }
    });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {

   	var db = req.db;

    var collection = db.get('usercollection');
    collection.find({ $query: {}, $orderby: { createDate : -1 } }, function(err, docs){
        if (err) {
            res.send("There was a problem quering the information from the database.");
        } else {
            res.send(docs);
        }
    });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {
    var db = req.db;
    var newUser = {
    	firstName  : req.body.firstname,
    	lastName   : req.body.lastname,
    	userEmail  : req.body.useremail,
    	userAge    : req.body.userage,
    	mobile     : req.body.mobile,
    	birthDate  : req.body.birthdate,
    	createDate : req.body.createdate
    }
    var collection = db.get('usercollection');

    collection.insert(newUser, function (err, doc) {
        if (err) {
            res.send("There was a problem adding the user to the database.");
        }
        else {
            res.send("ok");
        }
    });
});

/* Update a User Service */
router.post('/updateuser/:userid', function(req, res) {

	var userId = req.params.userid;

    var db = req.db;
    var newUser = {
    	firstName : req.body.firstname,
    	lastName  : req.body.lastname,
    	userEmail : req.body.useremail,
    	userAge   : req.body.userage,
    	mobile    : req.body.mobile,
    	birthDate : req.body.birthdate
    }
    var collection = db.get('usercollection');

    collection.update({_id: userId }, newUser, function (err, doc) {
        if (err) {
            res.send("There was a problem adding the user to the database.");
        }
        else {
           res.send("ok");
        }
    });
});

module.exports = router;
