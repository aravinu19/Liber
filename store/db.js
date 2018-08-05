var admin = require("firebase-admin");
var express = require('express');
var fs = require('fs');

var serviceAccount = require("./dbdemo.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dbdemo-b1622.firebaseio.com"
});

var db = admin.firestore();
var tempData;
var sett = db.collection('test').doc('temp');

var dbstore = function(app) {

  app.post("/push", (req, res) => {
    var data = req.body.data;

    sett.set({
      dump: data
    });

    console.log("data is " + data);

    res.status(200).send({status: 'OK'});

  });

  app.post("/get", (req, res) => {
    db.collection('test').doc('temp').get().then((snapshot) => {
        tempData = snapshot.data();
        console.log("Data is : " + snapshot.data().dump);
    });

    res.status(200).send({data:tempData.dump, status: 'Dont Know'});

  });

  app.all("", (req, res) => {
    res.redirect("/liber/index.html")
  })

}

module.exports = dbstore;
