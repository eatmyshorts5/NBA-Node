var userField;
var passField;
var button;
var errorField;
var globalJSON;

var rrl = 'https://nbanode.appspot.com/retrieve';

window.addEventListener('DOMContentLoaded', function(){
  userField = document.getElementById("loginbox");
  passField = document.getElementById("passbox");
  button = document.getElementById("logconfirm");
  errorField = document.getElementById("errormessagelog");

	var cookCheck = getCookie("username");

  if(cookCheck != "")
  {
    window.location.href = "second.html";
  }

  button.addEventListener('click', submit, false);
}, false);


function submit() 
{
  var firstQuery = '{ "userName": "' + userField.value + '" }';
  var query = JSON.parse(firstQuery);

  $(document).ready(function(){
    $.post(rrl, query, function(data, status){
      var checkUserN = data;
      if(checkUserN == 'Match'){
        passCheck();
      }
      else{
        errorField.style.display = "block";
        errorField.innerHTML = "Username does not exist";
      }

    });
  });

}

function submitCookie() {
  document.cookie;
  document.cookie = "username=" + userField.value + ";";

  var expiretime = new Date();
  expiretime.setTime(expiretime.getTime() + 1800 * 1000);
  document.cookie = "expires=" + expiretime.toUTCString() + ";";
  window.location.href = "second.html";
}

function passCheck() 
{
  var secondQuery = '{ "userName": "' + userField.value 
    + '", "password": "' + passField.value
    + '" }';
  var query = JSON.parse(secondQuery);

  $(document).ready(function(){
    $.post(rrl, query, function(data, status){
      var checkUserN = data;
      if(checkUserN == 'Match'){
	      submitCookie();
      }
      else{
        errorField.style.display = "block";
        errorField.innerHTML = "Password is incorrect";
      }

    });
  });

}


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
