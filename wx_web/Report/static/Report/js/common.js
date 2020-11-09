//调用登陆服务
function FnAjaxLogin(type,async,data,successFun){
	var url="../Ashx/LoginHandler.ashx";
	FnAjax(type,async,data,successFun,url);
}

//调用医院报告单业务
function FnAjaxHospitalReport(type,async,data,successFun){
	var url="../Ashx/HospitalReport.ashx";
	FnAjax(type,async,data,successFun,url);
}

//调用个人报告单业务
function FnAjaxPatientReport(type,async,data,successFun){
	var url='ajax';
	FnAjax(type,async,data,successFun,url);
}

//阿里短信发送
function SendMessageAli(PhoneNumbers,TemplateParam,successFun){
	var url='../Ashx/PhoneMessageHandler.ashx?action=SendMessageAli';
	TemplateParam='{"code":"' + TemplateParam + '"}';
	var data={
		"PhoneNumbers": PhoneNumbers,
		"TemplateParam": TemplateParam
	};
	FnAjax('get',false,data,successFun,url);
}

//查看报告单
function ShowReport(data){
	var url='../Ashx/ReportResource.ashx';
	$.ajax({
		type:'post',
		url:url,
		data:data,
		dataType:"json",
		success:function(Data)
		{
			if(Data.Success){
				setTimeout(function() {
					location.href = '../'+Data.Value;
				}, 500);
			}
			else{
				$.toast(Data.Msg, "forbidden");
			}
		},
		error:function(xhr, type, errorThrown) {
			if(type == 'timeout') {
				$.toast("请求超时：请检查网络", "text");
			} else {
				$.toast('请求失败：' + type + '\n err:' + errorThrown, "text");
			}
			$.toast("请求["+url+"]失败", "text");
		}
	});
}

//手机查看报告单
function ShowReportPhoneAjax(id,reportTopType,rptBusinessType,tag){
	var data={
		action: "ShowReportPrintPhone",
		ID: id,
		ReportTopType: reportTopType,
		RptBusinessType: rptBusinessType,
		Tag: tag,
		UserName: localStorage.getItem("userName")
	};
	ShowReport(data);
}

//查看PDF报告单
function ShowReportPDFAjax(id,reportTopType,rptBusinessType,tag){
	var data={
		action: "ShowReportPrint",
		IDs: id,
		ReportTopTypes: reportTopType,
		RptBusinessTypes: rptBusinessType,
		Tag: tag,
		UserName: localStorage.getItem("userName")
	};
	ShowReport(data);
}

//公用ajax方法
function FnAjax(type,async,data,successFun,url){
	$.ajax({
		type:type,
		async:async,
		url:url,
		data:data,
		dataType:"json",
		jsonpCallback:"cb",/*设置一个回调函数，名字随便取，和下面的函数里的名字相同就行*/
		success:successFun,
		error:function(xhr, type, errorThrown) {
			if(type == 'timeout') {
				$.toast("请求超时：请检查网络", "text");
			} else {
				$.toast('请求失败：' + type + '\n err:' + errorThrown, "text");
			}
			$.toast("请求["+url+"]失败", "text");
		}
	});
}

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) {
		return decodeURI(r[2]);
	}
	return null;
}