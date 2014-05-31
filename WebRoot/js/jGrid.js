var addDisplay = false;
var modifyDisplay = false;

var setOperation = function(){
	var operation=new Array( new Array('增加','删除','修改'), new Array('add','del','modify'));
	
	var obj = document.getElementById("operationTable");
	if(obj!=null){
		
		obj.innerHTML='';
	
		str='';
		str+='<table><tr>'
		for (var i=0 ; i<operation[0].length ;i++)
		{
		
			str+='<td class="ttd" >'+
				'<input type="checkbox" id="'+i+'_checkboxOp" name="'+i+'_checkboxOp"  onclick="onSelectedOp(this)"/>'+
				'</td>'+
				'<td class="ttd" >'+operation[0][i]+'</td>'+
				'<td class="ttd" >'+
				'<input type="text" id="validation_checkboxOp_'+operation[1][i]+'" name="validation_checkboxOp_'+operation[1][i]+'" value="off" style="display:none"/>'+
				'<input type="text" id="Op_'+i+'" name="Op_'+i+'" value="'+operation[1][i]+'" style="display:none"/>'+
				'<input type="text" id="Op_Comment_'+i+'" name="Op_Comment_'+i+'" value="'+operation[0][i]+'" style="display:none"/>'+
				'</td>';
				
			//document.getElementById("ajaxTable").innerHTML+='<tr><td>11111</td></tr>';
		}
		str+='</tr></table>';
	
		document.getElementById("operationTable").innerHTML=str;
	}
}();

function chooseTable(){

	var tableList = $("#tableList").find("option:selected").val();
	var ajaxTable = $('#columnTable'); 
	var objectName = $('#objectName'); 
	var objectComment = $('#objectComment'); 
	
	$.ajax({
		type:"post",
		url:"jGrid.do?method=updateColumn",
		data:{tableList:tableList}, 
		dataType:"json",
		success:function(data){
		if(data.success == "ok"){	
       		var  Column=data.ColumnList;
       		var obj = document.getElementById("columnTable");
       		obj.innerHTML='';
			var str='<table id="columnTable" border=1 cellspacing=1 cellpadding=1>';
			str += '<tr>'+
					'<td class="ttd">查看</td>'+
					'<td class="ttd">增加</td>'+
					'<td class="ttd">修改</td>'+
					'<td class="ttd">数据库中的名字</td>'+
					'<td class="ttd">网页中的名字</td>'+
					'<td class="ttd">字段类型</td>'+
					'<td class="ttd" style="display:none">是否为查询条件</td>'+
					'</tr>'
			for (var i=0 ; i<Column.length ;i++)
			{
				// 
				str+='<tr height="24" style="line-height: 24px;">'+
		   		'<td class="ttd" style="display:none">'+
		   		'<input type="text" id="validation_choose_'+i+'" name="validation_choose_'+i+'" value="off"/>'+
		   		'</td>'+
		   		'<td class="ttd" style="display:none">'+
		   		'<input type="text" id="validation_add_'+i+'" name="validation_add_'+i+'" value="off"/>'+
		   		'</td>'+
		   		'<td class="ttd" style="display:none">'+
		   		'<input type="text" id="validation_modify_'+i+'" name="validation_modify_'+i+'" value="off"/>'+
		   		'</td>'+
		   		'<td class="ttd" style="display:none">'+
		   		'<input type="text" id="validation_check_'+i+'" name="validation_check_'+i+'" value="off"/>'+
		   		'</td>'+
		   		'<td class="ttd">'+
				'<input type="checkbox" id="'+i+'" name="'+i+'" onclick="onSelectedChoose(this)"/>'+
				'</td>'+
				'<td class="ttd">'+
				'<div class="add" style="display:none">'+
				'<input type="checkbox" id="add_'+i+'" name="add_'+i+'" onclick="onSelectedAdd(this)" />'+
				'</div>'+
				'</td>'+
				'<td class="ttd">'+
				'<div class="modify" style="display:none">'+
				'<input type="checkbox" id="modify_'+i+'" name="modify_'+i+'" onclick="onSelectedModify(this)" />'+
				'</div>'+
				'</td>'+
				'<td class="ttd">'+
		   		'<input type="text" id="databaseColumn_'+i+'" name="databaseColumn_'+i+'" value="'+Column[i].columnNameList+'" readOnly=true/>'+
		   		'</td>'+
				'<td class="ttd">'+
				'<input type="text" id="webColumn_'+i+'" name="webColumn_'+i+'" value="'+Column[i].columnNameList+'" readOnly=true/>'+
				'</td>'+
				'<td class="ttd">'+
				'<input type="text" id="columnType_'+i+'" name="columnType_'+i+'" value="'+Column[i].columnTypeList+'" readOnly=true/>'+
				'</td>'+
				'<td class="ttd" style="display:none">'+
				'<input type="checkbox" id="check_'+i+'" name="check_'+i+'" onclick="onSelectedCheck(this)" style="display:none;"/>'+
				'</td>'+
				'</tr>';

				//document.getElementById("ajaxTable").innerHTML+='<tr><td>11111</td></tr>';
			}
			str+='</table>'
			document.getElementById("columnTable").innerHTML=str;
			document.getElementById("objectName").value=tableList;
			document.getElementById("objectComment").value=tableList;
			document.getElementById("tableName").value=tableList;
			
			
		}
		}
	});
	
	//alert('hi');
	
}

function onSelectedChoose(obj){
	if(obj.checked){
		var objid = obj.id;
		//objid='validation_check_'+objid;
		document.getElementById('validation_choose_'+objid).value="on";
		
		document.getElementById('databaseColumn_'+objid).readOnly=false;
		document.getElementById('webColumn_'+objid).readOnly=false;
		document.getElementById('columnType_'+objid).readOnly=false;
		
		document.getElementById('check_'+objid).style.display='block';
		//document.getElementById('add_'+objid).style.display='block';
		//document.getElementById('modify_'+objid).style.display='block';

		//$("#databaseColumn_"+objid).readOnly=false;
		//$("#databaseColumn_"+objid).bind("focus","");
	}
	else{
		var objid = obj.id;
		//objid='validation_'+objid;
		document.getElementById('validation_choose_'+objid).value="off";
		
		document.getElementById('databaseColumn_'+objid).readOnly=true;
		document.getElementById('webColumn_'+objid).readOnly=true;
		document.getElementById('columnType_'+objid).readOnly=true;
		document.getElementById('check_'+objid).style.display='none';
		//document.getElementById('add_'+objid).style.display='none';
		//document.getElementById('modify_'+objid).style.display='none';
		//$("#databaseColumn_"+objid).readOnly=true;
	}
}

function onSelectedPojo(obj){
	if(obj.checked){
		document.getElementById('validation_pojo').value="on";
		
	}
	else{
		document.getElementById('validation_pojo').value="off";
	}
}

function onSelectedCheck(obj){
	if(obj.checked){
		var objid = obj.id;
		objid='validation_'+objid;
		document.getElementById(objid).value="on";
		
	}
	else{
		var objid = obj.id;
		objid='validation_'+objid;
		document.getElementById(objid).value="off";
	}
}

function onSelectedAdd(obj){
	if(obj.checked){
		var objid = obj.id;
		objid='validation_'+objid;
		document.getElementById(objid).value="on";
		document.getElementById('add').style.display='block';
	}
	else{
		var objid = obj.id;
		objid='validation_'+objid;
		document.getElementById(objid).value="off";
		document.getElementById('add').style.display='none';
	}
}

function onSelectedModify(obj){
	if(obj.checked){
		var objid = obj.id;
		objid='validation_'+objid;
		document.getElementById(objid).value="on";
		document.getElementById('modify').style.display='block';
	}
	else{
		var objid = obj.id;
		objid='validation_'+objid;
		document.getElementById(objid).value="off";
		document.getElementById('modify').style.display='none';
	}
}

function onSelectedOp(obj){
	if(obj.checked){
		var objid = obj.id;
		objid=objid.split('_')[0];
		var Op =document.getElementById("Op_"+objid).value; 
		if(Op=='add'){
			var addoff=document.getElementsByClassName("add");
			for(var i=0; i<addoff.length; i++){
				addoff[i].style.display='block';
			}
			addDisplay=true;
		}
		if(Op=='modify'){
			var modifyoff=document.getElementsByClassName("modify");
			for(var i=0; i<modifyoff.length; i++){
				modifyoff[i].style.display='block';
			}
			modifyDisplay=true;
		}
		objv='validation_checkboxOp_'+Op;
		document.getElementById(objv).value="on";
		//var Op =document.getElementById("Op_"+objid).value; 
		//document.getElementById('check_'+objid).style.display='block';
	}
	else{
		var objid = obj.id;
		objid=objid.split('_')[0];
		var Op =document.getElementById("Op_"+objid).value; 
		if(Op=='add'){
			var addoff=document.getElementsByClassName("add");
			for(var i=0; i<addoff.length; i++){
				addoff[i].style.display='none';
			}
			addDisplay=false;
		}
		if(Op=='modify'){
			var modifyoff=document.getElementsByClassName("modify");
			for(var i=0; i<modifyoff.length; i++){
				modifyoff[i].style.display='none';
			}
			modifyDisplay=false;
		}
		objv='validation_checkboxOp_'+Op;
		document.getElementById(objv).value="on";
	}
}

function jGridInfoCollect(){
	//var columnTable = document.getElementById("columnTable");
	//window.open("jGrid.do?method=jGridInfoCollect","_self");
	
	$.ajax({
		type:"post",
		url:"jGrid.do?method=jGridInfoCollect",
		//data:{columnTable:columnTable}, 
		dataType:"json",
		success:function(data){
			if(data.success == "ok"){
				//alert('ok');
				window.navigate("jGrid.do?method=showFilePage");
			}
		}
	});
	
}

function jGridInfofile(){
	var actionUrl = "jGrid.do?method=jGridInfoCollect";
	var form = $('#form').serialize();
	alert(form);
	actionUrl += "&" + form;
	$.ajax({
		type:"post",
		url:actionUrl,
		//data:{columnTable:columnTable}, 
		dataType:"json",
		success:function(data){
			if(data.success == "ok"){
				//alert('ok');
				window.open("jGrid.do?method=showFilePage");
				//window.navigate("jGrid.do?method=doGenertorPage");
			}
		}
	});
	
}

function fileInfoCollect(){
	//var columnTable = document.getElementById("columnTable");
	/*
	var jsFile = $('#jsFile');
	var actionFile = $('#actionFile');
	var boFile = $('#boFile');
	*/
	window.open("jGrid.do?method=fileInfoCollect","_self");
	/*
	$.ajax({
		type:"post",
		url:"jGrid.do?method=fileInfoCollect",
		//data:{columnTable:columnTable}, 
		dataType:"json",
		success:function(data){
			if(data.success == "ok"){
				//alert('ok');
				window.navigate("jGrid.do?method=showBasePage");
			}
		}
	});*/
	
}