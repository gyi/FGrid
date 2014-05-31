<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'file.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
  <script type='text/javascript'>
	function getfile(){
	document.getElementById("file1").focus();
	var WshShell=new ActiveXObject("WScript.Shell") ;
	WshShell.sendKeys("c:/") ;

	}
</script> 
<script type="text/javascript" src="component/jquery/jquery-1.11.0.min.js"></script>
  </head>
  
  <body>
    <form action="jGrid.do?method=showGridPage" method="post" id="form" name="form">
		<table border=0 cellspacing=0 cellpadding=0 style="float:left;" >
			<!-- tr>
				<td>项目位置</td>
				<td>
					<input type="file" id="proFile" name="proFile" value="打开项目" />
				</td>
			</tr> --> 
			<tr>
				<td>jsp文件</td>
				<td>
					<input type="text" id="jspFile" name="jspFile" value="打开jsp文件"/>
				</td>
				<!--
				<td>
					<input type="button" value="新建" />
				</td>-->
			</tr>
			<tr>
				<td>第几行</td>
				<td>
					<input type="text" id="jspPosition" name="jspPosition" value=""/>
				</td>
			</tr> 
			<tr>
				<td>
					<input type='button' value="下一步" onclick="fileInfoCollect()"/>
				</td>
			</tr>
		</table>
	</form>
  </body>
  <script type="text/javascript" src="js/file.js"></script>
  <script type="text/javascript" src="js/file.js"></script>
</html>
