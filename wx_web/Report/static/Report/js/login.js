$(function() {
	FastClick.attach(document.body);
});
//登陆事件
$("#conf").click(function() {
	var username = document.getElementById('username');
	var pwd = document.getElementById('password');
	//ajax
	var data = {
		action: "GetHospitalInfoLogin",
		HospitalCode: username.value,
		PassWord: pwd.value
	};
	var succLogin = function(Data) {
		var data=Data[0];
		if(data.Success) {
			$.toast(data.Msg);
			setTimeout(function() {
				localStorage.setItem("hospitalcode", username.value);
				localStorage.setItem('userName',username.value);
				location.href = "query.html";
			},500);
		}else {
			$.toast(data.Msg, "forbidden");
		}
	};
	
	FnAjaxLogin("get",true,data,succLogin);
});

$('body').on("focus", ".weui-input", function() {
	$('.login_logo').height('120px');
});

$('body').on("blur", ".weui-input", function() {
	$('.login_logo').height('200px');
});