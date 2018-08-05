var express = require('express');
var bodyparser = require('body-parser');
var firestore = require('./store/db.js');

var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use("/liber", express.static('pages'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

firestore(app);

var beastEngine = app.listen(8080, () => {
  console.log("Beast Engine is up and running on ", beastEngine.address().port);
});
