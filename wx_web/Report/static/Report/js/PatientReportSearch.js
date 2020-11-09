//var choosetime = '';
//var date = new Date();
//var year = date.getFullYear();
//var month = date.getMonth() + 1;
//if(month >= 1 && month <= 9) {
//	month = "0" + month;
//}
//choosetime = year + '-' + month;
//$('#datetime-picker').val(choosetime);
//$('.top').on('click', '#datetime-picker', function() {
//	var dtpicker = new mui.DtPicker({
//		type: "month", //设置日历初始视图模式 
//		beginDate: new Date(2000, 00), //设置开始日期 
//		endDate: new Date(2050, 11), //设置结束日期 
//		labels: ['年', '月'], //设置默认标签区域提示语 
//		value: choosetime
//	});
//	dtpicker.setSelectedValue("year+'-'+month");
//	dtpicker.show(function(e) {
//		console.log(e);
//		$("#datetime-picker").val(e.value);
//		dtpicker.dispose();
//		choosetime = e.text; //记录你选择的日期
//		console.log(choosetime);
//		dtpicker.null;
//	});
//});

$('#search').click(function() {
	SearchSampleInfo();
});

function SearchSampleInfo() {
	//参数获取及验证
	var hospitalCode = document.getElementById("hospital_code").value;
	var patientName = document.getElementById("patient_name").value;
//	var time = document.getElementById("datetime-picker").value;
	if(hospitalCode == null || hospitalCode == "") {
		$.toast("请填写医院条码", "forbidden");
		return false;
	}
	if(patientName == null || patientName == "") {
		$.toast("请填写患者姓名", "forbidden");
		return false;
	}
//	if(time == null)
//		time='';
	var time='';
	
	//get调用
	var getData = {
		action: "GetSampleInfoByName_Hospital",
		HospitalCode: hospitalCode,
		PatientName: patientName,
		Time: time
	};
	var succGetSampleInfoByName_Hospital = function(Data) {
		$('#sample_detail').html('没有数据');
		/*var data = Data[0];
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
		}*/
	}
	FnAjaxPatientReport("get", true, getData, succGetSampleInfoByName_Hospital);
}

$('#sample_detail').on('click', '.ReportTopType', function() {
	var id = $(this).attr('value');
	ShowReportPhoneAjax(id,'','','1');
});