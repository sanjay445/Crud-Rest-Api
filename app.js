/* cmd : nodemon run start
   JSON.stringify() convert a JavaScript object into a text/string and send JSON data to the server. 
   JSON.parse() convert the text/string data to a JavaScript object when we receive the data in our browser.  
   Body-parser is the Node. js body parsing middleware. It is responsible for parsing the incoming request bodies in a middleware before you handle it.*/

const express = require("express");
const bodyParser = require("body-parser");// milddleware
var fs = require("fs");
const app = express(); // To start the express

app.use(bodyParser.urlencoded({			
  extended:true
}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/addUser",function(req,res){
  var username = req.body.username;
  var dob = req.body.dob;
  var profession = req.body.profession;
  var obj = {};
  var key = req.body.userid;
  var newuser = {
    "name" : username,
    "dob" : dob,
    "profession" : profession
  }
  obj[key] = newuser;

  fs.readFile("users.json","utf8",function(err,data){
    data = JSON.parse(data); // converts string to js object when we receive the data in our browser.
    data[key] = obj[key];
    console.log(data);
    var updateuser = JSON.stringify(data); // converts js object to string and send JSON data to the server.
    fs.writeFile("users.json",updateuser,function(err)
    {
      res.end( JSON.stringify(data));
    });
  });
});

app.post("/particularUser",function(req,res){
	var key = req.body.urid;
  fs.readFile("users.json","utf8",function(err,data){
    var users = JSON.parse(data);
    var user = users[key];
    console.log(user);
    res.end(JSON.stringify(user));
  });
});

app.post("/deleteUser",function(req,res){
	var key = req.body.uid;
  fs.readFile("users.json","utf8",function(err,data){
    data = JSON.parse(data); // converts string to js object when we receive the data in our browser.
    delete data[key];
    console.log(data);
    var updateuser = JSON.stringify(data); // converts js object to string and send JSON data to the server.
    fs.writeFile("users.json",updateuser,function(err)
    {
      res.end(JSON.stringify(data)); 
    });
  });
});

app.get('/showAll',function(req,res){
  fs.readFile("users.json","utf8",function(err,data){
    console.log(data);
    res.end(data);
  });
});

app.listen(3000,function(){
  console.log("server is running on port 3000");
});
