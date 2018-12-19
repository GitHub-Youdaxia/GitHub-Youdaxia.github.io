/*拒绝审批--begin*/
function refuse_open(){
	$("#dialog_judge .dialog_s span").html("确认拒绝审批?")
	$("#dialog_judge").css("display","block");
	$(".dialog_bg").css("display","block");	
	$("#dialog_judge .dialog_btn").html("<input type='button' class='btn_c' onclick='refuse_ok()' value='确认' /><input type='button' class='btn_r' onclick='judge_close()' value='取消' />")
}
function refuse_ok(){		
	$(".over_ch:checked").parent().parent().find(".yes_icon").removeClass("yes_icon_active");	
	$(".over_ch:checked").parent().parent().find(".no_icon").addClass("no_icon_active");	
	judge_close();
}
function judge_close(){
	$("#dialog_judge").css("display","none");
	$(".dialog_bg").css("display","none");
	return false;
}
/*拒绝审批--end*/

/*通过审批--begin*/
function adopt_open(){
	$("#dialog_judge .dialog_s span").html("确认通过审批?")
	$("#dialog_judge .dialog_btn").html("<input type='button' class='btn_c' onclick='adopt_ok()' value='确认' /><input type='button' class='btn_r' onclick='judge_close()' value='取消' />")
	$("#dialog_judge").css("display","block");
	$(".dialog_bg").css("display","block");	
}
function adopt_ok(){	
	$(".over_ch:checked").parent().parent().find(".no_icon").removeClass("no_icon_active");	
	$(".over_ch:checked").parent().parent().find(".yes_icon").addClass("yes_icon_active");		
	judge_close();
}
/*通过审批--end*/