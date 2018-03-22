$(document).ready(function(){	
	console.log("check");
  	checklogin(); //验证用户密码的有效

});
function checklogin(){
	var sessionId=getCookie("sessionId");
	console.log(sessionId);
	if (sessionId == null)
		window.location.href="login.html"; 
};
function logout(){
	delCookie("sessionId");
};
