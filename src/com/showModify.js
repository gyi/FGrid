/******************************************************************
 * ${objectComment}修改
 *
 * @author ${author}
 * @version ${version}
 *
 *
 * history:
 *
 */

/*****************************************************************
 * 保存按钮事件
 */
function onSaveClick(){
	if(!_Validate.validate(false)){
		return;
	}	
	
	AjaxTell.ajaxRequest('form',{
		//data:obj,
		onSuccess:function(json){
			window.close();
		}
	});
}

//数据验证
<#list columnModify as columnModify>
_Validate.addField({id:"${columnModify.databaseColumn}",name:"${objectComment}${columnModify.webColumn}",maxLength:100,allowBlank:false,otherOut:"title",submitOut:"title"});
</#list>
