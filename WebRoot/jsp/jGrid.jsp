<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
    	<base href="<%=basePath%>">
    
    	<title>My JSP 'jGrip.jsp' starting page</title>
    
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">    
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<!--
		<link rel="stylesheet" type="text/css" href="styles.css">
		-->
		<script type="text/javascript" src="component/jquery/jquery-1.11.0.min.js"></script>
		<!-- script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script -->
		

	</head>
  
	<body>
    	<form action="jGrid.do?method=jGridInfoCollect" method="post" id="form" name="form">
			<table border=0 cellspacing=0 cellpadding=0 style="float:left;" >
				<tr>
					<td class="ttd">选择你要查询的表：</td>
					<td class="ftd" width="110">
						<select id="tableList" name="tableList" onchange="chooseTable()">
							<option value="">请选择</option>
							<c:forEach items="${tableList}" var="tableList">
								<option value="${tableList }">${tableList }</option>
							</c:forEach>
						</select>
						<input type="text" id="tableName" name="tableName" value="" style="display:none"/>
					</td>
				</tr>
				<tr>
					<td>
						<input type="checkbox" id="pojo" name="pojo"  onclick="onSelectedPojo(this)"/>
					</td>
					<td class="ttd" >生成数据模型:</td>
					<td class="ttd" >
						<input type="text" id="validation_pojo" name="validation_pojo" value="off" style="display:none"/>
					</td>
				</tr>
				<tr>
					<td class="ttd">选择你要查询的字段：</td>
					<td>
						<div id="columnTable">
							<table border=1 cellspacing=1 cellpadding=1>
								<tr>
									<td class="ttd">查看</td>
									<td class="ttd">增加</td>
									<td class="ttd">修改</td>
									<td class="ttd"><span>数据库中的名字</td>
									<td class="ttd">网页中的名字</td>
									<td class="ttd">字段类型</td>
									<td class="ttd">是否为查询条件</td>
								</tr>
							</table>
						</div>
					</td>
					<td>
						<table>
							<tr>
								<td>
									<button onclick="addColumn()" style="display:none">添加字段</button>
								</td>
							</tr>
							<tr>
								<td>
									<button onclick="delColumn()" style="display:none">删除字段</button>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td class="ttd">可选择的操作：</td>
					<td colspan="5" >
						<div id="operationTable">
						</div>
					</td>
				</tr>
				<tr>
					<td>对象名称：</td>
					<td class="ftd" width="110">
						<input type="text" id="objectName" name="objectName"/>
					</td>
				</tr>
				<tr>
					<td>对象名称解释：</td>
					<td class="ftd" width="110">
						<input type="text" id="objectComment" name="objectComment"/>
					</td>
				</tr>
				<tr>
					<td>
						<input type='button' id='button' name="button" value="下一步" onclick="jGridInfofile()"/>
					</td>
				</tr>
			</table>
		</form>
	</body>
	<script type="text/javascript" src="js/jGrid.js"></script>
</html>
