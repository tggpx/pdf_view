$(function() {
	FastClick.attach(document.body);
	
	var code = '';
	var barCode = '';
	var sMobile = '';
	
	//点击发送验证码
	$("#sendValCode").click(function() {
		barCode = $("#barcode").val();
		if(barCode == null || barCode == '') {
			$("#barcode").val("");
			$("#barcode").focus();
			$.toast("请输入条码号", "forbidden");
			return false;
		}
		sMobile = $("#phone").val();
		if(sMobile == null || sMobile == '' || !(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(sMobile))) {
			$("#phone").val("");
			$("#phone").focus();
			$.toast("请输入正确的手机号", "forbidden");
			return false;
		}
		/*测试重新发送按钮是否乱了样式*/
//		$(this).html('重新发送(60)s');
		code='';
		for(var i = 0; i < 4; i++) {
			var a = parseInt(Math.random() * 10) + "";
			code += a;
		}
		var sendMessageSuccess=function(Data){
			if(Data[0].Success) {
				$.toast(Data[0].Msg);
				$("#verification").removeAttr("readonly");
				var dao = 60;
				var timer = setInterval(function() {
					$("#sendValCode").attr("disabled", "disabled");
					$("#sendValCode").css("width", "110px");
					$("#sendValCode").html("重新发送(" + dao + ")s");
					dao--;
					if(dao == 0) {
						clearInterval(timer);
						$("#sendValCode").removeAttr("disabled");
						$("#sendValCode").css("width", "85px");
						$("#sendValCode").html("发送验证码");
					}
				}, 1000);
			}else {
				$.toast(Data[0].Msg, "forbidden");
			}
		}
		SendMessageAli(sMobile,code,sendMessageSuccess);
	});

	$("#query").click(function(e) {
		if (e && e.preventDefault){
			e.preventDefault();
		}else{
			window.event.returnValue = false; //兼容IE
		}
		if(barCode == null || barCode == '') {
			$.toast("请先获取验证码", "forbidden");
			return;
		}
		if(sMobile == null || sMobile == '' || !(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(sMobile))) {
			$.toast("请先获取验证码", "forbidden");
			return;
		}
		
		if(code != "" && $("#verification").val() == code) {
			var data = {
				action: "GetPatientInfoLoginByBarcodePhone",
				Barcode: barCode,
				Phone: sMobile
			};
			var succLogin = function(Data) {
				var data=Data[0];
				if(data.Success) {
					$.toast(data.Msg);
					setTimeout(function() {
						localStorage.setItem("hospitalcode",barCode);
						localStorage.setItem('userName',barCode);
						localStorage.setItem('patientName',data.Value.PatientInfoLoginTable[0].PatientName);
						location.href = "PatientReport.html?loginType=barcode";
					},500);
				}else {
					$.toast(data.Msg, "forbidden");
				}
			};
			
			FnAjaxLogin('get',true,data,succLogin);
		}else {
			$("#verification").val("");
			$("#verification").focus();
			$.toast("验证码不正确！", "forbidden");
		}
	});

//	$('body').on("focus", ".weui-input", function() {
//		$('.login_logo').height('150px');
//	});
//	$('body').on("blur", ".weui-input", function() {
//		$('.login_logo').height('200px');
//	});
	$('body').height($('body')[0].clientHeight);
});