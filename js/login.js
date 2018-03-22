$(function(){
	
    $("#submitButton").click(function (){
		console.log("登录");
		login();
	});
	
	function login() {
    	if(loginForm.name.value==""||loginForm.password.value=="")
    	{
    	  sweetAlert("提示","输入不能为空！","warning");
    	  return;
    	}
    	var name=loginForm.name.value;
    	var pwd = hex_sha1(loginForm.password.value);
    	console.log(pwd);
    	var u="http://192.168.1.168:8080/loginSubmit?name="
    	+name+"&password="+pwd;
        $.ajax({
            type: "POST",//方法类型
            url: u,//url
            timeout : 1000, 
           // data: JSON.stringify({"user_name":name,"user_phone":tel,"user_password":pwd}),                                      
//          contentType: "application/x-www-form-urlencoded",
            async: false,
            xhrFields:{
        	withCredential:true
        	},
            success: function (data) {
//          	var result = eval( '(' + data + ')' );       
                console.log(data);//打印服务端返回的数据(调试用)
                if (data.code== 200) {
                 	swal({ 
	                 	title: "登录成功！", 
	                 	type: "success",
	                 	text: "正在进入主页。", 
	                 	timer: 1000, 
	                 	confirmButtonColor: "#FFFFFF",                
                	});                     
					SetCookie("sessionId",data["sessionId"]);
					console.log(getCookie("sessionId"));
                 	setTimeout('window.location.href="index.html";',2000);  
                 	//保存登录信息
                 	
                // window.location.href='index.html';                       
                }else
                  	sweetAlert("提示",data.message,"warning");
            },
      		error : function() {
                sweetAlert("提示","用户名或密码错误！","warning");
            }
        });
    
    }
});
