<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'base.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <body>
    <form>
    	<table>
    		<tr>
				<td class="ttd">作者名：</td>
				<td class="ftd" width="110">
					<input type="text" id="service" name="service"/>
				</td>
			</tr>
			<tr>
				<td class="ttd">版本名：</td>
				<td class="ftd" width="110">
					<input type="text" id="port" name="port"/>
				</td>
			</tr>
			<tr>
				<td>
					<input type='button' value="生成jGrid代码" />
				</td>
			</tr>
    	</table>
    </form>
  </body>
</html>
