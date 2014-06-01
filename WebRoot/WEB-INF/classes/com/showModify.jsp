<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<html>
	<head>
		<base href="<%=basePath%>">
		<title>${objectComment} modify</title>
	</head>

	<body style="text-align: center;" scroll="no">
	<div >
		<table  class="TableCardTitleClose" border=0 cellSpacing=0 cellPadding=0 width="100%" >
			<tbody>
			<tr style="CURSOR: auto">
				<td class="PartMiddleOpen">${objectComment} modify</td>
			</tr>
			</tbody>
		</table> 
	</div>
	<div class="dialog_edit_div">
		<div style="width: 96%; padding-top: 10px;overflow: auto;">
		<form id="form" name="form" action="${objectName}.do?method=doModify" method="post">
		<table border="0" cellpadding="0" cellspacing="0" align="left">
			<tr align="left">
				<td>
					<table>
						<tr>
							<td>
								<input type="hidden" id="${columnKey.databaseColumn}" name="${columnKey.databaseColumn}" 
								value="<%=${objectName}List.${columnKey.databaseColumn}%>
							</td>
						</tr>
						<#list columnModify as columnModify>
						<tr>
							<td class="ttd" width="80">
								<span>*</span>${objectComment}${columnModify.webColumn}：
							</td>
							<td class="ftd" width="150">
								<input id="${columnModify.databaseColumn}" name="${columnModify.databaseColumn}" class="text_input" 
								value="<%=${objectName}List.${columnModify.databaseColumn}%>
							</td>
						</tr>
						</#list>
					</table>
				</td>
			</tr>
		</table>
		</form>
		</div>
	</div>
	<div class="dialog_button_div">
		<ul id="btn_list2" class="btn_list" >
			<li>
				<div class="save" onClick="onSaveClick()">save</div>
			</li>
			<li>
				<div class="close" onClick="window.close()">close</div>
			</li> 
		</ul>
	</div>
</body>
<jsp:include flush="false" page="../../component/import/js.jsp">
	<jsp:param name="list" value="true" />
	<jsp:param name="validate" value="true" />
</jsp:include>
<script type="text/javascript" src="js/${fileName}/showModifyStudent.js"></script>
</html>