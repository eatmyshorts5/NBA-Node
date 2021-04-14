var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var express = require("express");
var app = express();
var http = require("http");
var cors = require("cors");
var getJSON = require('get-json');
var cTable = require('console.table');
var cookieParser = require('cookie-parser');

var uri = "mongodb://461L_QRU:test1234@qru-shard-00-00-wlzab.mongodb.net:27017,qru-shard-00-01-wlzab.mongodb.net:27017,qru-shard-00-02-wlzab.mongodb.net:27017/test?ssl=true&replicaSet=QRU-shard-0&authSource=admin";

var person;
var theleague;
var playerinfo;


app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({
      extended: true
}));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://nba-viewer-56740.appspot.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/wines', function(req, res) {
    console.log("ohshit");
    res.send([{name:'wine1'}, {name:'wine2'}]);
});

app.get('/route50', function(req,res){
  MongoClient.connect(uri, function(err, db) {
    if(err) throw err;
    var dbo = db.db("QRU");
    var query = { };

    dbo.collection("sports").find(query).toArray(function(err, result) {
      if(err) throw err;
      console.log(result);
      res.send(result);
      db.close();
    });
  });
});

app.get('/cookies', function(req,res){
  //console.log(req.cookies);
  //res.cookies('username', 'test');
  res.send(req.cookies);

  //res.send(reg.cookies);
    //res.send(req.cookie.username);
});

app.get('/setuser', function(req, res){ 
  //res.clearCookie('username');
	//res.cookie("username", "testoftime"); 
 	res.header("Set-Cookie", "username=test"); 
	res.send('user data added to cookie'); 
}); 



app.post('/getname', function(req, res) {
  MongoClient.connect(uri, function(err, db) {
    if(err) throw err;
    var dbo = db.db("QRU");
    var query = req.body;
    console.log(query);
    dbo.collection("sports").find(query).toArray(function(err, result) {
      if(err) throw err;
      console.log(result);
      var nameString = result[0].firstName + " " + result[0].lastName;
      console.log(nameString);
      res.send(nameString);
      db.close();
    });
  });
});

app.post('/getuser', function(req, res) {
  MongoClient.connect(uri, function(err, db) {
    if(err) throw err;
    var dbo = db.db("QRU");
    var query = req.body;
    console.log(query);
    //var jsoned = JSON.parse(query);
    //console.log(jsoned);
    dbo.collection("sports").find(query).toArray(function(err, result) {
      if(err) throw err;
      var nameString = '{ "firstName":"' + result[0].firstName + '", "teamPref": ' + result[0].teamPref+ ' }';
      res.send(nameString);
      console.log(nameString);
      db.close();
    });
  });
});

app.post('/retrieve', function(req, res) {
  MongoClient.connect(uri, function(err, db) {
    if(err) throw err;
    var dbo = db.db("QRU");
    var query = req.body;
    console.log(query);
    dbo.collection("sports").find(query).toArray(function(err, result) {
      if(err) throw err;
      console.log(result);
      if(result.length == 0)
      {
        res.send('No match');
      }
      else 
      {
        res.send('Match');
      }
      db.close();
    });
  });
});

app.post('/team', function(req,res) {

  var farray = { };

  var holdJSON = req.body;

  console.log(holdJSON);

  console.log(holdJSON.teamcode);

  person = holdJSON.teamcode;

  getJSON('http://data.nba.net/10s/prod/v1/2018/teams/1610612742/roster.json', function(error, response){

    console.log(error);

    console.log(response.league.standard.players[0].personId);

  });

  getJSON('http://data.nba.net/10s/prod/v1/2018/players.json', function(error, response){

    console.log(error);

    theleague = response;

    farray['dem'] = [];
 
		var plength = theleague.league.standard.length;

		for(var i = 0; i < plength; i++)
    {
      if(person == theleague.league.standard[i].teamId)
      {
        var holdEle = { firstName: theleague.league.standard[i].firstName, 
          lastName: theleague.league.standard[i].lastName, 
          jerseyNum: theleague.league.standard[i].jersey,
          heightFeet: theleague.league.standard[i].heightFeet,
          heightInches: theleague.league.standard[i].heightInches
        };
        farray['dem'].push(holdEle);
      }
    }

    console.log(farray.dem[5]);    

    console.log(farray);

    res.json(farray);
  });

});

app.post('/register', function(req, res) {

    
  MongoClient.connect(uri, function(err, db) {
    if(err) throw err;
    var dbo = db.db("QRU");
    var inObject = req.body;
    console.log(inObject);

    dbo.collection("sports").insertOne(inObject, function(){
      if(err) throw err;
      console.log("1 document inserted");
      db.close();
    });
    res.send("1 document inserted");
  });


});

app.post('/insert', function(req, res) {
  MongoClient.connect(uri, function(err, db) {
    if(err) throw err;
    var dbo = db.db("QRU");
    var inObject = req.body;
    console.log(json_doc);
    var json_doc = JSON.parse(query);
    console.log(json_doc);

    dbo.collection("sports").insertOne(json_doc, function(){
      if(err) throw err;
      console.log("1 document inserted");
      db.close();
    });
    res.send("1 document inserted");
  });

});

/*Got from https://howchoo.com/g/mme4owq2m2j/how-to-manage-cookies-in-javascript*/
function getCookie(name) {
    var cookie, c;
    cookies = document.cookie.split(';');
    for (var i=0; i < cookies.length; i++) {
        c = cookies[i].split('=');
        if (c[0] == name) {
            return c[1];
        }
    }
    return "";
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
//app.listen(8080);
console.log("listening on 8080");

