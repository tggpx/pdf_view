$(function(){
	/*切换查询方式*/
	$('.queryTitle').on('click','li',function(){
	var i = $(this).index(); //当前索引值
	$(this).addClass('hign').siblings().removeClass('hign');
	   switch (i){
	   	case 0:
	   		$('#queryContent .byCode').addClass('show').siblings().removeClass('show');
		break;
	case 1:
		$('#queryContent .byDate').addClass('show').siblings('div').removeClass('show');
		break;
	case 2:
		$('#queryContent .byName').addClass('show').siblings('div').removeClass('show');
	   		break;
	   }
	});
})
