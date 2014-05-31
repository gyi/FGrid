/******************************************************************
 * ${objectComment} manage
 *
 * @author ${author}
 * @version ${version}
 *
 * history:
 *
 */

var grid = null;

/*****************************************************************
 * select operate
 */
var onQuery = function (){
	var obj = new Object();
	
	<#list columnCheck as columnCheck>
	obj.${columnCheck.databaseColumn} = $D('${columnCheck.databaseColumn}').value;
	</#list>
	
	grid.baseParams=obj;
	grid.load();
}


<#if onModifyClickExist == "true">
/*****************************************************************
 * 修改事件
 */
var onModifyClick=function(index){
	var id;
	if(typeof index!='undefined'){
		id=grid.getDataList[index].${columnKey.databaseColumn};
	}else{
		id=grid.getSelectRow().${columnKey.databaseColumn};
	}
	Util.openModalDialog("${objectName}.do?method=showModifyView&${columnKey.databaseColumn}="+id,800,480,window);
	grid.reload();

};
</#if>

<#-- 判断 -->
<#if onDelectClickExist == "true">
/*****************************************************************
 * 删除事件
 */
var onDeleteClick=function(index){
	if(!grid.getSelectRow()){
		MsgTell.mAlert("未选中记录");
		return;
	}
	
	var id;
	if(typeof index!='undefined'){
		id=grid.getDataList[index].${columnKey.databaseColumn};
	}else{
		id=grid.getSelectRow().${columnKey.databaseColumn};
	}
	if(!MsgTell.mConfirm('【是否删除该${objectComment}】')){
		return;
	}
	var options = {data:"${columnKey.databaseColumn}="+id,
		onSuccess:function(result){
		grid.load();
	}};
	AjaxTell.ajaxRequest("${objectName}.do?method=doDel",options);
};
</#if>

<#-- 判断 -->
<#if onAddClickExist == "true">
/*****************************************************************
 * 添加事件
 */
var onAddClick=function(index){
	Util.openModalDialog("${objectName}.do?method=showAddView",800,480,window);
	grid.load();
};
</#if>

<#-- 判断 -->
<#if operateOnClickExist == "true">
<#-- 循环判断是否有其他操作 -->
<#list operateOnClick as operateOnClick>
/*****************************************************************
 * ${operateOnClick.operateName}事件
 */
 var ${operateOnClick.operateName}=function(index){
	<#-- 在此添加你的代码： -->
};
</#list>
</#if>

/*****************************************************************
 * set operator
 */
var checkRight = function(index,value,obj){
	var str = '';
	
	<#if onModifyClickExist == "true">
	str += '<img src="images/update_yes.gif" title="modify"  onclick="onModifyClick('+index+')">&nbsp;&nbsp;';
	</#if>
	
	<#if onDelectClickExist == "true">
	str += '<img src="images/delete_yes.gif" title="delect"  onclick="onDeleteClick('+index+')">';
	</#if>
	
	<#if operateOnClickExist == "true">
	<#list columnchoosemap as columnchoosemap>
	str += '<img src="images/update_yes.gif" title="${operateName}"  onclick="${operateOnclick}('+index+')">&nbsp;&nbsp;';
	</#list>
	</#if>
	
	return str;
}

/*****************************************************************
 * initialise list info
 */
var initPage = function(){
	
	var obj = {
		url:'${objectName}.do?method=getPageList',
		ajaxTableId:'ajaxTable',
		grid:'grid',
		toolbar:true,
		drag:false,
		columnModel:[{header:"operator",				mapping:"${columnKey.databaseColumn}",	    		type:"int", 			width:'50px',		renderer:checkRight }
					<#list column as column>
					,{header:"${column.webColumn}",		mapping:"${column.databaseColumn}",		type:'string',		width:'40px'}
					</#list>
			        ]
		};
	grid = new Grid(obj);
	onQuery();
	//load enter event
	Util.formStepEnter('form',{submit:onQuery});
}();