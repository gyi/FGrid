function fileInfoCollect(){
	
	var jspFile = $('#jspFile').val();
	var proFile = jspFile.split('WebRoot');
	if(proFile!=null){
		proFile = proFile[0];
	}
	var jspPosition = $('#jspPosition').val();
	
	$.ajax({
		type:"post",
		url:"jGrid.do?method=fileInfoCollect",
		data:{jspFile:jspFile,proFile:proFile,jspPosition:jspPosition}, 
		dataType:"json",
		success:function(data){
			if(data.success == "ok"){
				//alert('ok');
				window.open("jGrid.do?method=doGenertorPage");
			}
		}
	});
	
}