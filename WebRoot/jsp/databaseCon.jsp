<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'databaseCon.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<script type="text/javascript" src="component/jquery/jquery-1.11.0.min.js"></script>

  </head>
  
  <body>
    <form action="jGrid.do?method=showGridPage" method="post" id="form" name="form">
		<table border=0 cellspacing=0 cellpadding=0 style="float:left;" >
			<!-- ---------------------------------------------------------------------- -->
			<tr>
				<td class="ttd">数据库类型：</td>
				<td class="ftd" width="110">
					<select id="dbType" name="dbType">
						<option value="">请选择</option>
						<option value="MYSQL">MYSQL</option>
						<option value="ORACLE">ORACLE</option>
					</select>
				</td>
			</tr>
			<tr>
				<td class="ttd">服务器：</td>
				<td class="ftd" width="110">
					<input type="text" id="dbIp" name="dbIp"/>
				</td>
			</tr>
			<tr>
				<td class="ttd">端口：</td>
				<td class="ftd" width="110">
					<input type="text" id="dbPort" name="dbPort"/>
				</td>
			</tr>
			<tr>
				<td class="ttd">数据库：</td>
				<td class="ftd" width="110">
					<input type="text" id="dbInstance" name="dbInstance"/>
				</td>
			</tr>
			<tr>
				<td class="ttd">用户名：</td>
				<td class="ftd" width="110">
					<input type="text" id="userName" name="userName"/>
				</td>
			</tr>
			<tr>
				<td class="ttd">密码：</td>
				<td class="ftd" width="110">
					<input type="password" id="password" name="password"/>
				</td>
			</tr>
			<tr>
				<td>
					<input type='button' value="测试连接" onclick="getConnection('test')"/>
				</td>
				<td>
					<input type='button' value="下一步" onclick="getConnection('start')"/>
				</td>
			</tr>
		</table>
	</form>
  </body>
  <script type="text/javascript" src="js/databaseCon.js"></script>
</html>
