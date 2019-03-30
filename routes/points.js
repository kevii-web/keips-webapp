var express = require('express');
var router = express.Router();
var firebase = require("firebase");

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAU4AOtjKxRdcR1fqyussPz2-IRasOAuqQ",
  authDomain: "keips-95445.firebaseapp.com",
  databaseURL: "https://keips-95445.firebaseio.com",
  projectId: "keips-95445",
  storageBucket: "keips-95445.appspot.com",
  messagingSenderId: "599022333796"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

/* POST keips. */
router.post('/', function (req, res, next) {
  // Retrive info
  var magicNum = req.body.magicNet;
  var student = database.ref(magicNum);
  student.once('value').then(function (snapshot) {
    if (snapshot.exists()) {
      var stuObject = {
        name: snapshot.child("name").val(),
        ranking: snapshot.child("ranking").val(),
        osaPoints: 0,
        roomDrawPoints: 0,
        semester: snapshot.child("semester"),
        gender: snapshot.child("gender").val(),
        ccaList: snapshot.child("ccaList").val(),
        bonusCcaList: snapshot.child("bonusCcaList").val(),
      }
      console.log(stuObject);
      res.render('points', { title: 'Points', magicNum: magicNum, object: stuObject });
    } else {
      //req.flash('msg', 'Entered incorrectly!');
      res.redirect('/');
    }
  });  
});

module.exports = router;
