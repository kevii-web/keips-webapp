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
        osaPoints: snapshot.child("osaPointsCount").val(),
        roomDrawPoints: snapshot.child("roomDrawPoints").val(),
        gender: snapshot.child("gender").val(),
        ccaList: snapshot.child("ccaList").val(),
        bonusCcaList: snapshot.child("bonusCcaList").val(),
      }
      const semester = snapshot.child("semester").val();
      if (semester == 1) {
        stuObject.semesterCount = 2;
      } else if (semester == 2) {
        stuObject.semesterCount = 2;
      }
      
      const contrastingCCA = snapshot.child("haveContrasting").val();
      contrastingCCA ? stuObject.haveContrasting = "Yes" :
            stuObject.haveContrasting = "No";

      console.log(stuObject);
      res.render('points', { title: 'Points', magicNum: magicNum, object: stuObject });
    } else {
      //req.flash('msg', 'Entered incorrectly!');
      res.redirect('/');
    }
  });  
});

module.exports = router;
