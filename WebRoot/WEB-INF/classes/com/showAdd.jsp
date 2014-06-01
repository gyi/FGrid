<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="myTag" uri="/WEB-INF/my-tag.tld" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	//清除JSP缓存
	response.setHeader("Pragma", "No-Cache");
	response.setHeader("Cache-Control", "No-Cache");
	response.setDateHeader("Expires", 0);
%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
	<base href="<%=basePath%>">
	<title>${objectComment} add</title>
	<!-- jsp:include flush="false" page="../../component/import/css.jsp">
		<jsp:param name="grid" value="true" />
	</jsp:include> -->
</head>
<body style="overflow: hidden;">
	<div  class="dialog_title_context">
		${objectComment} add
	</div>
	<div>
	<form id="form" name="form" action="${objectName}.do?method=doAdd" method="post">
		<table border="0" cellpadding="0" cellspacing="0" >
			<tr align="left">
				<td>
					<table>
						<tr>
							<td>t<input type="hidden" id="${columnKey.databaseColumn}" name="${columnKey.databaseColumn}" value="" />
							</td>
						</tr>
						<#list columnAdd as columnAdd>
						<tr>
							<td class="ttd" width="80">
								<span>*</span>${objectComment}${columnAdd.webColumn}：
							</td>
							<td class="ftd" width="150">
								<input id="${columnAdd.databaseColumn}" name="${columnAdd.databaseColumn}" class="text_input" value="">
							</td>
						</tr>
						</#list>
					</table>
				</td>
			</tr>
		</table>
	</form>
	</div>
	<div class="dialog_button_div" style="text-align: center;">
		<ul id="btn_list2" class="btn_list" >
			<li>
				<input type="button" onClick="onSaveClick()" value="save">
			</li>
			<li>
				<input type="button" onClick="window.close()" value="close">
			</li>
		</ul>
	</div>
</body>
<jsp:include flush="false" page="../../component/import/js.jsp">
	<jsp:param name="list" value="true" />
	<jsp:param name="validate" value="true" />
</jsp:include>
<script type="text/javascript" src="js/${fileName}/showAddRole.js"></script>
</html>