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

var fullname;

var teams = ["1610612742", "1610612745", "1610612738", "1610612751"];
var colors = ["(0,83,188)", "(196,206,211)", "(0,122,51)", "(0,0,0)"];
var logos = ["mavs.png", "rockets.png", "celtics.png", "nets.png"];
    
function operationGRAB() { 
  teamtemp = '{"teamcode" :' + team.value + '}';
  teamcode = JSON.parse(teamtemp);

  index = teams.indexOf(team.value);
  colorcode = colors[index];
  body.style.backgroundColor = "rgb" + colorcode;
  logo.src = "logos/" + logos[index];
  logo.style.visibility = "visible";

  console.log("Was submitted");
  const Url = 'http://localhost:3000/team';
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

window.addEventListener('DOMContentLoaded', function(){
  body = document.getElementById("theoneandonly");
  thename = document.getElementById("da_name");
  team = document.getElementById("sel_team");
  subButton = document.getElementById("sub_Button");
  sub_Form = document.getElementById("daForm");
  errorLine = document.getElementById("error_Line");
  logo = document.getElementById("teamimg");
  console.log(team.value);

/*  cookieval = getCookie("username");

  if(cookieval == "")
  {
    window.location.href = "login.html";
  }
*/


  $(document).ready(function(){
    $.get('http://127.0.0.1:3000/cookies', function(data, status){
      console.log(JSON.stringify(data));
    });
  }); 

  subButton.addEventListener('click', operationGRAB, false);

  
}, false);

function drawUser()
{
  var rrl
  var preQuery = '{ "userName: "' + cookieval + '" }';
  var query = JSON.parse(preQuery);
  $(document).ready(function(){
    $.post(rrl, query, function(data, status){
      var checkUserN = data;
  

    });
  });   


}

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
