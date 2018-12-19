
$(document).ready(function(){
	if($(".organ_list ul li").length==0){
		$(".list_none").show();
	}
	else{
		$(".organ_list ul").show();
		$(".list_none").hide();
	}
})
