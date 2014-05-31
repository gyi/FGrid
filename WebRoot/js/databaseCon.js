function getConnection(mode){
	var dbType = $("#dbType").find("option:selected").val();
	var dbIp = $('#dbIp').val(); 
	var dbPort = $('#dbPort').val(); 
	var dbInstance = $('#dbInstance').val(); 
	var userName = $('#userName').val(); 
	var password = $('#password').val(); 
	
	$.ajax({
		type:"post",
		url:"dbcon.do?method=getConnection",
		data:{dbType:dbType,dbIp:dbIp,dbPort:dbPort,dbInstance:dbInstance,userName:userName,password:password}, 
		dataType:"json",
		success:function(data){
			if(data.success == "ok"){
				if(mode=="test"){
					alert('连接成功');
				}
				else{
					window.open("dbcon.do?method=showGridPage");
				}
			}
			else{
				alert('连接失败');
			}
		}
	});
}