var fname;
var lname;
var username;
var password;
var teampref;
var submitBut;
var errorText;
var regJSON;
var result;
var checkUN;

var Url = 'http://localhost:3000/register';

window.addEventListener('DOMContentLoaded', function(){
  fname = document.getElementById('fnametext');
  lname = document.getElementById('lnametext');
  username = document.getElementById('emailtext');
  password = document.getElementById('pwordtext');
  teampref = document.getElementById('teamselect');
  submitBut = document.getElementById('regconfirm');
  errorText = document.getElementById('errormessage');

  submitBut.addEventListener('click', beginRegProccess, false);
}, false);


function processReg()
{
  console.log("Sending stuff");
  var regString = '{"firstName": "' + fname.value
    + '", "lastName": "' + lname.value
    + '", "userName": "' + username.value
    + '", "password": "' + password.value
    + '", "teamPref": "' + teampref.value
    + '" }';
  console.log(regString);
  regJSON = JSON.parse(regString);
  console.log(regJSON);

  $(document).ready(function(){
    $.post(Url, regJSON, function(data, status){
      var retJSON = data;
      console.log(data);
    });
  });

  window.location.href = "login.html";
}


function checkError(UNflag)
{
  console.log(fnametext.value);
  console.log(teampref.value);

  if(fname.value.length == 0)
  {
    errorText.style.display = "block";
    errorText.innerHTML = "Please provide first name";
    console.log("get fucked bitch");
  }
  else if(lname.value.length == 0)
  {
    errorText.style.display = "block";
    errorText.innerHTML = "Please provide last name";
  }
  else if(username.value.length == 0)
  {
    errorText.style.display = "block";
    errorText.innerHTML = "Please provide username";
  }
  else if(password.value.length == 0)
  {
    errorText.style.display = "block";
    errorText.innerHTML = "Please provide password";
  }
  else if(teampref.value.length == 0)
  {
    errorText.style.display = "block";
    errorText.innerHTML = "Please choose a prefered team";
  }  
  else if(UNflag == 0){
    errorText.style.display = "block";
    errorText.innerHTML = "Username already taken";
  }
  else
  { 
    errorText.style.display = "none";
    processReg();   
  }
}

function beginRegProccess()
{
  var reqName = username.value;
  var rrl = 'http://localhost:3000/retrieve';
  var unQuery = '{ "userName": "' + reqName + '" }';
  console.log(unQuery);
  var query = JSON.parse(unQuery);
  $(document).ready(function(){
    $.post(rrl, query, function(data, status){
      var checkUserN = data;
      if(checkUserN == 'Match'){
        checkError(0);
      }
      else{
        checkError(1);
      }

    });
  });
}
