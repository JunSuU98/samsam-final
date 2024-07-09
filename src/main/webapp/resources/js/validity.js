$(function(){
	$("#sign_up_form").submit(function(){
		if($("#id_check").val() == 0){
			alert("아이디 중복을 확인하세요.");
			return false;
		}	
		
	});
});