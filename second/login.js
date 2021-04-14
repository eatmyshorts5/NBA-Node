var userField;
var passField;
var button;
var errorField;
var globalJSON;

var rrl = 'http://localhost:3000/retrieve';

window.addEventListener('DOMContentLoaded', function(){
  userField = document.getElementById("loginbox");
  passField = document.getElementById("passbox");
  button = document.getElementById("logconfirm");
  errorField = document.getElementById("errormessagelog");

	var cookieval = getCookie("username");

	if(cookieval != "")
	{
    document.location.href = "second.html";
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
        setcookie();
      }
      else{
        errorField.style.display = "block";
        errorField.innerHTML = "Password is incorrect";
      }

    });
  });

}

function setcookie()
{
  $(document).ready(function(){
    $.get('http://127.0.0.1:3000/cookies', function(data, status){
        console.log(data);
        /*window.location.href = "second.html";*/
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
