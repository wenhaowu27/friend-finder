var express = require('express');
var path = require('path');
var friends = require('../data/friends')
var router = express.Router();


router.get('/api/friends',function(req, res){
  console.log(friends)
    res.json(friends);
});

router.post("/api/friends", function(req, res) {
  
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var user = req.body;
  var matchName;
  var matchImage;

   // parseInt for scores
   for(var i = 0; i < user.newScore.length; i++) {
    user.newScore[i] = parseInt(user.newScore[i]);
  }  
  // friends.push(user);

  // res.json();

  var bestFriendIndex = 0;
  var mminimumDiff = 20;

// in this for-loop, start off with a zero Diff and compare the user and the ith friend scores, one set at a time
//  whatever the Diff is, add to the total Diff
  for(var i = 0; i < friends.length; i++) {
    var totalDiff = 0;
    for(var j = 0; j < user.newScore.length; j++) {
      var Diff = Math.abs(user.newScore[j] - friends[i].scores[j]);
      // console.log("i= ",i," j= ",j," Diff =", Diff);
      totalDiff += Diff;      
    }

// if there is a new minimum, change the best friend index and set the new minimum for next iteration comparisons
    if(totalDiff < mminimumDiff) {
      bestFriendIndex = i;
      mminimumDiff = totalDiff;
      var matchName = friends[bestFriendIndex].name;
      var matchImage = friends[bestFriendIndex].photo;   
      console.log("matchName = ", friends[bestFriendIndex].name)
      friends.push(user);
      //  console.log("friends  ", friends);
      //  console.log("user  ", user);
      res.json(friends[bestFriendIndex]);
    }
    
  // send back to browser the best friend match
  // res.json(friends[bestFriendIndex]);
  }

  // after finding match, add user to friend array
  // friends.push(user);

});


module.exports=router;