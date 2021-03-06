var thename;
var team;
var subButton;
var sub_Form;
var errorLine;
var buttonFlag;
var teamcode;
var teamtemp;
var result;
var index;
var colorcode;
var body;
var logo;
var cookieval;
var table;
var box;
var flag = false;
var selError;
var regSelect;
var inputs;
var userfName;
var logOut;

var fullname;

var teams = ["1610612742", "1610612745", "1610612738", "1610612751", 
"1610612743", "1610612737", "1610612766", "1610612741", "1610612739", 
"1610612765", "1610612744", "1610612754", "1610612746", "1610612747",
"1610612763", "1610612748", "1610612749", "1610612750", "1610612740",
"1610612752", "1610612760", "1610612753", "1610612755", "1610612756",
"1610612757", "1610612758", "1610612759", "1610612761", "1610612762",
"1610612764"];
var colors = ["(0,83,188)", "(196,206,211)", "(0,122,51)", "(0,0,0)", 
"(13,34,64)", "(255,255,255)", "(29,17,96)", "(206,17,65)", "(134,0,56)", 
"(200,16,46)", "(253,185,39)", "(0,45,98)", "(190,192,194)", "(253,185,39)",
"(93,118,169)", "(152,0,46)", "(0,71,27)", "(12,35,64)", "(225,58,62)",
"(245,132,38)", "(253,187,48)", "(0,125,197)", "(237,23,76)", "(229,95,32)",
"(224,58,62)", "(6,25,34)", "(196,206,211)", "(180,151,90)", "(255,255,255)",
"(0,43,92)"];
var logos = ["mavs.png", "rockets.png", "celtics.png", "nets.png", 
"nuggets.png", "hawks.png", "hornets.png", "bulls.png", "cavaliers.png", 
"pistons.png", "warriors.png", "pacers.png", "clippers.png", "lakers.png",
"grizzlies.png", "heat.png", "bucks.png", "timberwolves.png", "pelicans.png",
"knicks.png", "thunder.png", "magic.png", "sixers.png", "suns.png",
"blazers.png", "kings.png", "spurs.png", "raptors.png", "jazz.png", 
"wizards.png"];

function drawstyle()
{
  teamtemp = '{"teamcode" :' + team.value + '}';
  teamcode = JSON.parse(teamtemp);
  index = teams.indexOf(team.value);
  colorcode = colors[index];
  body.style.backgroundColor = "rgb" + colorcode;
  logo.src = "images/" + logos[index]; 
}

function drawteam()
{
  drawstyle();
  console.log("Was submitted");
  const Url = 'https://nbanode.appspot.com/team';
  $(document).ready(function(){
    $.post(Url, teamcode, function(data, status){
      console.log("in post");
      console.log(teamcode);
      var myJson = data;
      result = JSON.stringify(myJson);
      console.log(result);
      var deTable = document.createElement('tbody');
      for(var i = 0; i < myJson.dem.length; i++)
      {
        row = document.createElement('tr');
        /*row.classList.add("dabody");*/
        cell1 = document.createElement('td');
        cell2 = document.createElement('td');
        cell3 = document.createElement('td');
        cell4 = document.createElement('td');
        t1node = document.createTextNode(myJson.dem[i].jerseyNum);
        t2node = document.createTextNode(myJson.dem[i].firstName);
        t3node = document.createTextNode(myJson.dem[i].lastName);
        t4node = document.createTextNode(
            myJson.dem[i].heightFeet + '\'' 
            + myJson.dem[i].heightInches + '"');
        cell1.appendChild(t1node);
        cell2.appendChild(t2node);
        cell3.appendChild(t3node);
        cell4.appendChild(t4node);
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        deTable.appendChild(row);
      }
      var daTable = document.getElementsByTagName('tbody').item(1);
      daTable.parentNode.replaceChild(deTable, daTable);
    });
  });

}

function operationGRAB() { 
  if(flag == false)
  {
    if(regSelect.value.length == 0)
    {
      selError.style.display = "block"; 
    }
    else
    {
      inputs.style.height = "200%";
      selError.style.display = "none";
      table.style.display = "block";
      logo.style.visibility = "visible";
      box.style.display = "none";
      flag = true;
      drawteam();
    }
  }
  else
  {
    drawteam();
  }
}

function logOutProc()
{
  clearCookies();
  window.location.href = "second.html";
}

function goToLogin()
{
  window.location.href = "login.html";

}

window.addEventListener('DOMContentLoaded', function(){
  body = document.getElementById("theoneandonly");
  thename = document.getElementById("da_name");
  team = document.getElementById("sel_team");
  subButton = document.getElementById("sub_Button");
  sub_Form = document.getElementById("daForm");
  errorLine = document.getElementById("error_Line");
  logo = document.getElementById("teamimg");
  table = document.getElementById("teamtable");
  box = document.getElementById("displaybox");
  selError = document.getElementById("selError");
  regSelect = document.getElementById("sel_team");
  inputs = document.getElementById("inputs");
  userText = document.getElementById("daText");
  logOut = document.getElementById("logOut");
  console.log(team.value);

  if(getCookie("username") != "")
  {
    var query = '{ "userName":"' + getCookie("username") + '" }';
    var jsoned = JSON.parse(query);
    logOut.innerHTML = "Log out";
    $(document).ready(function(){
      $.post("https://nbanode.appspot.com/getuser", jsoned, function(data, status){
        console.log(data);
        var Stuff = JSON.parse(data);
        console.log(Stuff.firstName);
        userText.innerHTML = "Welcome " + Stuff.firstName;
        regSelect.value = Stuff.teamPref.toString();
        operationGRAB();
      });
    });
    logOut.addEventListener('click', logOutProc, false);
  }
  else
  {
    logOut.addEventListener('click', goToLogin, false);
  }

  subButton.addEventListener('click', operationGRAB, false);

  
}, false);


/*Taken from https://www.w3schools.com/js/js_cookies.asp*/
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/*Taken from https://stackoverflow.com/questions/26349052/why-would-setting-document-cookie-not-work-in-chrome*/
function clearCookies(){
    var cookies = document.cookie.split(';');
    for(i in cookies){
        var vals = cookies[i].split('=');
        var name = vals.shift(0, 1).trim();
        document.cookie = name+'=';
    }
}
