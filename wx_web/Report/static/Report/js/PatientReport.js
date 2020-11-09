SearchSampleInfo();

function SearchSampleInfo() {
	//参数获取及验证
	if(localStorage.getItem("hospitalcode")&&localStorage.getItem("patientName")){
		var hospitalCode = localStorage.getItem("hospitalcode");
		var patientName = localStorage.getItem("patientName");
		var time = '';
		
		//get调用
		var getData = {
			action: "GetSampleInfoByName_Hospital",
			HospitalCode: hospitalCode,
			PatientName: patientName,
			Time: time
		};
		var succGetSampleInfoByName_Hospital = function(Data) {
			var data = Data[0];
			if(data.Success) {
				if(data.Value.SampleInfo.length <= 0) {
					$('#sample_detail').html('没有数据');
					//					$('#patient_info').html('');
				} else {
					//					$('#patient_info').html(_PatientName+','+data.Value.SampleInfo[0].Barcode);
					var html = '';
					for(var i = 0; i < data.Value.SampleInfo.length; i++) {
						if(data.Value.SampleInfo[i].HavePDF > 0) {
							html += '<ul><li>病人条码：' + data.Value.SampleInfo[i].Barcode + '</li><li>病人姓名：' + data.Value.SampleInfo[i].PatientName + '</li><li>病人性别：' + data.Value.SampleInfo[i].SexName + '</li><li>医院：' + data.Value.SampleInfo[i].HospitalName + '</li><li>病人类别：' + data.Value.SampleInfo[i].PatientTypeName + '</li><li>登记时间：' + data.Value.SampleInfo[i].SampleReceiveDate + '</li><li>登记人：' + data.Value.SampleInfo[i].Creator + '</li><li>项目：[(' + data.Value.SampleInfo[i].ApplyItemNames + ')]</li><li>';
							if(data.Value.SampleInfo[i].Center > 0) {
								html += '<a href="#" class="ReportTopType" value="' + data.Value.SampleInfo[i].Center + '">中心抬头报告</a>&nbsp;&nbsp;';
							}
							if(data.Value.SampleInfo[i].Custom > 0) {
								html += '<a href="#" class="ReportTopType" value="' + data.Value.SampleInfo[i].Custom + '">客户抬头报告</a>&nbsp;&nbsp;';
							}
							if(data.Value.SampleInfo[i].CustomCenter > 0) {
								html += '<a href="#" class="ReportTopType" value="' + data.Value.SampleInfo[i].CustomCenter + '">中心客户抬头报告</a>&nbsp;&nbsp;';
							}
							if(data.Value.SampleInfo[i].Def > 0) {
								html += '<a href="#" class="ReportTopType" value="' + data.Value.SampleInfo[i].Def + '">查看报告单</a>&nbsp;&nbsp;';
							}
							html += '</li></ul>';
						} else {
							html += '<ul><li>病人条码：' + data.Value.SampleInfo[i].Barcode + '</li><li>病人姓名：' + data.Value.SampleInfo[i].PatientName + '</li><li>病人性别：' + data.Value.SampleInfo[i].SexName + '</li><li>医院：' + data.Value.SampleInfo[i].HospitalName + '</li><li>病人类别：' + data.Value.SampleInfo[i].PatientTypeName + '</li><li>登记时间：' + data.Value.SampleInfo[i].SampleReceiveDate + '</li><li>登记人：' + data.Value.SampleInfo[i].Creator + '</li><li>项目：[(' + data.Value.SampleInfo[i].ApplyItemNames + ')]</li><li>报告未生成</li></ul>';
						}
					}
					$('#sample_detail').html(html);
				}
			} else {
				$.toast(data.Msg, "forbidden");
			}
		}
		FnAjaxPatientReport('get', true, getData, succGetSampleInfoByName_Hospital);
	}else{
		$.toast("没有登录，即将跳转到登录页", "forbidden");
		var loginType=GetQueryString('loginType');
		if(loginType=='barcode'){
			setTimeout(function() {
				location.href = "barcodeQuery.html";
			}, 500);
		}
		else{
			setTimeout(function() {
				location.href = "nameQuery.html";
			}, 500);
		}
	}
}

$('#sample_detail').on('click', '.ReportTopType', function() {
	var id = $(this).attr('value');
	ShowReportPhoneAjax(id,'','','1');
});