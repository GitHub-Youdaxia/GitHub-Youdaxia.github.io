
function reject(){
	$("#dialog_no").css("display","block");
	$(".dialog_bg").css("display","block");
}
function cancel_btn(){
	$("#dialog_no").css("display","none");
	$(".dialog_bg").css("display","none");
}
function submit_btn(){
	cancel_btn();
}

function adopt(){
	$("#dialog_yes").css("display","block");
	$(".dialog_bg").css("display","block");
}
function adopt_close(){
	$("#dialog_yes").css("display","none");
	$(".dialog_bg").css("display","none");
}


function judge_open(){
	adopt_close();
	$("#dialog_judge").css("display","block");
	$(".dialog_bg").css("display","block");
}
function judge_close(){
	$("#dialog_judge").css("display","none");
	$(".dialog_bg").css("display","none");
}
