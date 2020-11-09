function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}
	
$("#startDate").calendar();
$("#endDate").calendar();
$("#startDate").val(getNowFormatDate());
$("#endDate").val(getNowFormatDate());
	
$('#search').click(function() {
	var startDate = document.getElementById("startDate").value;
	var endDate = document.getElementById("endDate").value;
	if(startDate == null||startDate =='') {
		$.toast("请选择查询开始时间", "forbidden");
		return false;
	}
	if(endDate == null||endDate =='') {
		$.toast("请选择查询结束时间", "forbidden");
		return false;
	}
	if(startDate > endDate) {
		$.toast("选择的开始时间不能晚于结束时间", "forbidden");
		return false;
	}

	if(localStorage.getItem("hospitalcode")) {
		var getData = {
			action: "GetSampleInfoByHospital",
			BeginDate: startDate,
			EndDate: endDate,
			PatientName: "",
			HospitalCode: localStorage.getItem("hospitalcode")
		};
		var succGetSampleInfoByHospital = function(Data) { //返回格式参照data.json
			var data = Data[0];
			if(data.Success) {
				if(data.Value.SampleInfo.length <= 0) {
					$('#result').html('没有数据');
				} else {
					var html = '';
					for(var i = 0; i < data.Value.SampleInfo.length; i++) {
						html += '<dl class="list_dl weui-cells weui-cells_checkbox"><dt class="list_dt"><label class="weui-cell weui-check__label"><div class="weui-cell__hd"> <input value="' + data.Value.SampleInfo[i].ID + '" type="checkbox" class="weui-check" name="checkbox1"><i class="weui-icon-checked"></i></div><div class="weui-cell__bd weui-flex"><p class="weui-flex__item">' + data.Value.SampleInfo[i].Barcode + '</p><p class="weui-flex__item">' + data.Value.SampleInfo[i].PatientName + '</p></div> </label> <i class="list_dt_icon">详情</i></dt><dd class="list_dd"><div class="introduce">' + data.Value.SampleInfo[i].ApplyItemNames + '</div></dd></dl>';
					}
					$('#result').html(html);
				}
			} else {
				$.toast(data.Msg, "forbidden");
			}
		};
		FnAjaxHospitalReport("get", true, getData, succGetSampleInfoByHospital);
	} else {
		$.toast("没有登录，即将跳转到登录页", "forbidden");
		setTimeout(function() {
			location.href = "login.html";
		}, 500);
	}
});

$("#lookReport").click(function() {
	var checkboxs = $('[type="checkbox"]:checked');
	var id = '';
	for(var i = 0; i < checkboxs.length; i++) {
		id = id + checkboxs[i].value.trim() + ',';
	}
	ShowReportPDFAjax(id, '', '', '1');
});

/**
 * 展开折叠
 * **/
$("#result").on("click", '.list_dt_icon', function() {
	$('.list_dd').stop();
	if($(this).parent().attr("id") == "open") {
		$(this).parent().removeAttr("id").siblings("dd").slideUp(100);
	} else {
		$(this).parent().attr("id", "open").next().slideDown(100).siblings("dd").slideUp(100);
	}
});

$.expr[":"].Contains = function(a, i, m) {
	return(a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};

$("#searchList").keyup(function() {
	var filter = $(this).val();
	if(filter) {
		$matches = $("dl").find("label:Contains(" + filter + ")").parent().parent();
		$("dl", $("#result")).not($matches).slideUp(10);
		$matches.slideDown(10);
	} else {
		$("#result").find("dl").slideDown(10);
	}
});