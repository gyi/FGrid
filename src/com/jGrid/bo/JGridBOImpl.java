package com.jGrid.bo;

import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

import oracle.jdbc.driver.OracleDriver;

import org.springframework.stereotype.Service;

import com.Test;
import com.UpperFirstCharacter;
import com.model.DatabaseModel;
import com.model.FileModel;
import com.model.JGridModel;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;


@Service("jGridBo")
@SuppressWarnings("unchecked")
public class JGridBOImpl implements IJGridBo {

//	/**
//	 * 连接数据库
//	 */
//	public boolean getConnection() {
//		// new DBConnection("oracle", "192.168.17.108″, 3306, "test", "test", "lxd", "123456″);
//		String dbType = DatabaseModel.getDbType();
//		String dbIp = DatabaseModel.getDbIp();
//		String dbPort = DatabaseModel.getDbPort();
//		String dbInstance = DatabaseModel.getDbInstance();
//		String userName = DatabaseModel.getUserName();
//		String password = DatabaseModel.getPassword();
//		String driverClass = null;
//		String url = null;
//		if (dbType.equalsIgnoreCase("mysql")) {
//			driverClass = "com.mysql.jdbc.Driver";
//			url = "jdbc:mysql://" + dbIp + ":" + dbPort + "/" + dbInstance;
//		} else if (dbType.equalsIgnoreCase("oracle")) {
//			driverClass = "oracle.jdbc.driver.OracleDriver";
//			url = "jdbc:oracle:thin:@" + dbIp + ":" + dbPort + ":" + dbInstance;
//		} else if (dbType.equalsIgnoreCase("post")) {
//			driverClass = "org.postgresql.Driver";
//			url = "jdbc:postgresql://" + dbIp + ":" + dbPort + "/" + dbInstance;
//		} else if (dbType.equalsIgnoreCase("post")) {
//			driverClass = "org.postgresql.Driver";
//			url = "jdbc:postgresql://" + dbIp + ":" + dbPort + "/" + dbInstance;
//		}
//		Connection conn = null;
//		try {
//			Class.forName(driverClass);
//			conn = DriverManager.getConnection(url, userName, password);
//			DatabaseModel.setConn(conn);
//			return true;
//		}catch (SQLException e) {
//			e.printStackTrace();
//		}catch (ClassNotFoundException e) {
//			e.printStackTrace();
//		} 
//		return false;
//		//return conn;
//	}
//	
//	/**
//	 * 获得数据库中的表
//	 */
//	public void getTableList() throws SQLException {
//		Connection conn = DatabaseModel.getConn();
//		DatabaseMetaData dbmd = conn.getMetaData();
//		ResultSet rs = dbmd.getTables(null, "%", "%", new String[] { "TABLE" });
//		List tableList = new ArrayList();
//		while (rs.next()) {
//			tableList.add(rs.getString("TABLE_NAME"));
//		}
//		DatabaseModel.setTableList(tableList);
//		//return tableNameList;
//	}
//	
//	/**
//	 * 获得数据库表中的字段
//	 */
//	public void getColumnListByTable() throws SQLException {
//		Connection conn = DatabaseModel.getConn();
//		DatabaseMetaData dbmd = conn.getMetaData();
//		String tableName = DatabaseModel.getTableChoose();
//		ResultSet rs = dbmd.getColumns(null, "%", tableName, "%");
//		ResultSet pkRSet = dbmd.getPrimaryKeys(null, null, tableName);
//		
//		List<String> key = new ArrayList<String>();
//		
//		List list = new ArrayList();
//		List columnList = new ArrayList();
//		List columnPojoList = new ArrayList();
//		
//		String columnNameList="";
//		String columnTypeList="";
//		
//		for(int i=0; pkRSet.next(); i++){
//			key.add(i,(String)pkRSet.getString("COLUMN_NAME"));
//			
//			Map columnMap = new HashMap();
//			columnMap.put("modelColumn",FileModel.setColumnToModel(key.get(i)));
//			columnMap.put("databaseColumn",key.get(i));
//			columnMap.put("webColumn",key.get(i));
//			columnMap.put("columnType","String");
//			//columnList.add(columnMap);
//			
//			JGridModel.setColumnKey(columnMap);
//			break;
//		}
//		
//		//List columnNameList = new ArrayList();
//		//List columnTypeList = new ArrayList();
//		
//		while (rs.next()) {
//			/*
//		    String key = rs.getString("COLUMN_NAME");  //获取字段名
//		    val.add(rs.getString("DATA_TYPE"));  //获取数据类型
//		    val.add(rs.getString("DATA_LENGTH"));  //获取数据长度
//		    val.add(rs.getString("DATA_PRECISION"));  //获取数据长度
//		    val.add(rs.getString("DATA_SCALE"));  //获取数据精度
//		    val.add(rs.getString("NULLABLE"));  //获取是否为空
//		    */
//			columnNameList = rs.getString("COLUMN_NAME");
//			//columnTypeList = rs.getString("DATA_TYPE");
//			columnTypeList = "String";
//			
//			Map columnPojoMap = FileModel.setColumnToPojoList(columnNameList);
//			columnPojoList.add(columnPojoMap);
//			//columnMap.put("dataPrecisionList",rs.getString("DATA_PRECISION"));
//			if(!key.isEmpty()&&key.contains(columnNameList)){
//				
//			}
//			else{
//				Map columnMap = new HashMap();
//				columnMap.put("columnNameList",columnNameList);
//				columnMap.put("columnTypeList",columnTypeList);
//				columnList.add(columnMap);
//			}
//		
//		}
//		//list.add(columnList);
//		//columnMap.put("columnNameList", columnNameList);
//		//columnMap.put("columnTypeList", columnTypeList);
//		FileModel.setPojoColumn(columnPojoList);
//		DatabaseModel.setColumnList(columnList);
//	}
	
	/**
	 * 处理数据
	 * @return
	 */
	public void getData(){
		Map data = new HashMap();
		
		Map columnKey = JGridModel.getColumnKey();
		
		String objectComment = JGridModel.getObjectComment();
		String tableName = JGridModel.getTableName();
		List column = new ArrayList();
		column.addAll(JGridModel.getColumnList());
		List columnCheck = new ArrayList();
		columnCheck.addAll(JGridModel.getColumnCheckList());
		
		List columnAdd = new ArrayList();
		columnAdd.addAll(JGridModel.getColumnAddList());
		List columnModify = new ArrayList();
		columnModify.addAll(JGridModel.getColumnModifyList());
		
		List operateJudge = new ArrayList();
		operateJudge.addAll(JGridModel.getOperateJudge());
		
		boolean isCreatePojo = JGridModel.getIsCreatePojo();
		
		String proName = FileModel.getProFile();
		String jspName = FileModel.getJspFile();
		int jspPosition = FileModel.getJspPosition();
		
    	String fileName = FileModel.getFileName();
    	String packageName = FileModel.getPackageName();
    	String className = FileModel.getClassName();
    	String objectName = FileModel.getObjectName();
    	String pojoClassName = FileModel.getPojoClassName();
    	String pojoObjectName = FileModel.getPojoObjectName();
    	List pojoColumn = FileModel.getPojoColumn();
    	
		data.put("author", "Feison");
		data.put("version", "1.0  Sep 19, 2010");//包名
    	
		data.put("proName", proName);
		data.put("jspName", jspName);
		data.put("jspPosition", jspPosition);
		
		data.put("objectComment", objectComment);
		data.put("fileName", fileName);
		data.put("package", packageName);
		data.put("className", className);
		data.put("objectName", objectName);
		data.put("pojoClassName", pojoClassName);
		data.put("pojoObjectName", pojoObjectName);
		data.put("pojoColumn", pojoColumn);
		
		//data.put("actionMarker", actionMarker);
		data.put("tableName", tableName);
		
		data.put("column", column);
		data.put("columnKey", columnKey);
		data.put("columnCheck", columnCheck);
		data.put("columnAdd", columnAdd);
		data.put("columnModify", columnModify);
		
		data.put("onAddClickExist", operateJudge.get(0));//包名
		data.put("onModifyClickExist", operateJudge.get(1));//包名
		data.put("onDelectClickExist", operateJudge.get(2));//包名
		data.put("operateOnClickExist", "false");//包名
		
		jspGenerator(data);
		if(data.get("onAddClickExist")=="true"){
			AddJspGenerator(data);
			AddJsGenerator(data);
		}
		if(data.get("onModifyClickExist")=="true"){
			ModifyJspGenerator(data);
			ModifyJsGenerator(data);	
		}
		jsGenerator(data);
		actionGenerator(data);
		boGenerator(data);
		IboGenerator(data);
		if(isCreatePojo==true){
			pojoGenerator(data);
		}
		
		//return data;
	}
	
	/**
	 * 插入jsp文件
	 */
	public void jspGenerator(Map data) {
		try{
			File inFile = new File((String) data.get("jspName"));
			//File inFile = new File("D:/hi.jsp");
			int lineno = (Integer) data.get("jspPosition");
			//int lineno = 2;
			
			String lineToBeInserted = "<div id=\"ajaxTable\" class=\"grid_div\" style=\"overflow: auto;\"></div>";
			String JslineToBeInserted = "<script type=\"text/javascript\" src=\"js/"+data.get("fileName")+"/"+data.get("objectName")+".js\"></script>";
			
			// 临时文件
			File outFile = File.createTempFile("name", ".jsp");
			// 输入
			FileInputStream fis = new FileInputStream(inFile);
			BufferedReader in = new BufferedReader(new InputStreamReader(fis,"UTF-8"));
			// 输出
			FileOutputStream fos = new FileOutputStream(outFile);
			PrintWriter out = new PrintWriter(fos);
			// 保存一行数据
			String thisLine;
			// 行号从1开始
			int i = 1;
			boolean haveLineToBeInserted = false;
			boolean haveJslineToBeInserted = false;
			/*
			while ((thisLine = in.readLine()) != null) {

				if(thisLine.equals(lineToBeInserted)){
					haveLineToBeInserted=true;
				}
				if(thisLine.equals(JslineToBeInserted)){
					haveJslineToBeInserted=true;
				}
				i++;
			}*/
			BufferedReader insert = new BufferedReader(new InputStreamReader(fis,"UTF-8"));
			while ((thisLine = insert.readLine()) != null) {
				// 如果行号等于目标行，则输出要插入的数据
				if (i == lineno) {
					out.println(lineToBeInserted);
				}
				if(thisLine.equals("</html>")){
					out.println(JslineToBeInserted);
				}
				// 输出读取到的数据
				out.println(thisLine);
				// 行号增加
				i++;
			}
			out.flush();
			out.close();
			in.close();
			insert.close();
			// 删除原始文件
			inFile.delete();
			// 把临时文件改名为原文件名
			outFile.renameTo(inFile);
			int ii=0;
		}
		catch(Exception e){
			e.printStackTrace();
		}

	}
	
	/**
	 * 生成Add jsp文件
	 */
	public void AddJspGenerator(Map data) {
		Configuration cfg = new Configuration();
		//Map data = this.getData();
		try {
			
        	cfg.setClassForTemplateLoading(this.getClass(), "/com");//指定模板所在的classpath目录
        	
			Template t = cfg.getTemplate("showAdd.jsp");//指定模板
			String catalogue = data.get("proName")+"WebRoot/jsp/"+data.get("fileName");
			File fp = new File(catalogue);  
	        // 创建目录  
	        if (!fp.exists()) {  
	            fp.mkdirs();// 目录不存在的情况下，创建目录。  
	        } 
			FileOutputStream fos = new FileOutputStream(new File(catalogue+"/showAdd"+data.get("className")+".jsp"));//java文件的生成目录
			
			t.process(data, new OutputStreamWriter(fos,"utf-8"));//
			fos.flush();
			fos.close();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (TemplateException e) {
			e.printStackTrace();
		}
		
	}
	
	/**
	 * 生成Modify jsp文件
	 */
	public void ModifyJspGenerator(Map data) {
		Configuration cfg = new Configuration();
		//Map data = this.getData();
		try {
			
        	cfg.setClassForTemplateLoading(this.getClass(), "/com");//指定模板所在的classpath目录
        	
			Template t = cfg.getTemplate("showModify.jsp");//指定模板
			String catalogue = data.get("proName")+"/WebRoot/jsp/"+data.get("fileName");
			File fp = new File(catalogue);  
	        // 创建目录  
	        if (!fp.exists()) {  
	            fp.mkdirs();// 目录不存在的情况下，创建目录。  
	        } 
			FileOutputStream fos = new FileOutputStream(new File(catalogue+"/showModify"+data.get("className")+".jsp"));//java文件的生成目录
			
			t.process(data, new OutputStreamWriter(fos,"utf-8"));//
			fos.flush();
			fos.close();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (TemplateException e) {
			e.printStackTrace();
		}
		
	}
	
	/**
	 * 生成js文件
	 */
	public void jsGenerator(Map data) {
		Configuration cfg = new Configuration();
    	//Map data = new HashMap();
		//data = this.getData();
		try {
			
        	cfg.setClassForTemplateLoading(this.getClass(), "/com");//指定模板所在的classpath目录
        	
			Template t = cfg.getTemplate("objectName.js");//指定模板
			String catalogue = data.get("proName")+"/WebRoot/js/"+data.get("fileName");
			File fp = new File(catalogue);  
	        // 创建目录  
	        if (!fp.exists()) {  
	            fp.mkdirs();// 目录不存在的情况下，创建目录。  
	        } 
			FileOutputStream fos = new FileOutputStream(new File(catalogue+"/"+data.get("objectName")+".js"));//java文件的生成目录
			
			t.process(data, new OutputStreamWriter(fos,"utf-8"));//
			fos.flush();
			fos.close();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (TemplateException e) {
			e.printStackTrace();
		}
		
	}
	
	/**
	 * 生成Add jsp文件
	 */
	public void AddJsGenerator(Map data) {
		Configuration cfg = new Configuration();
		//Map data = this.getData();
		try {
			
        	cfg.setClassForTemplateLoading(this.getClass(), "/com");//指定模板所在的classpath目录
        	
			Template t = cfg.getTemplate("showAdd.js");//指定模板
			String catalogue = data.get("proName")+"/WebRoot/js/"+data.get("fileName");
			File fp = new File(catalogue);  
	        // 创建目录  
	        if (!fp.exists()) {  
	            fp.mkdirs();// 目录不存在的情况下，创建目录。  
	        } 
			FileOutputStream fos = new FileOutputStream(new File(catalogue+"/showAdd"+data.get("className")+".js"));//java文件的生成目录
			
			t.process(data, new OutputStreamWriter(fos,"utf-8"));//
			fos.flush();
			fos.close();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (TemplateException e) {
			e.printStackTrace();
		}
		
	}
	
	/**
	 * 生成Modify jsp文件
	 */
	public void ModifyJsGenerator(Map data) {
		Configuration cfg = new Configuration();
		//Map data = this.getData();
		try {
			
        	cfg.setClassForTemplateLoading(this.getClass(), "/com");//指定模板所在的classpath目录
        	
			Template t = cfg.getTemplate("showModify.js");//指定模板
			String catalogue = data.get("proName")+"/WebRoot/js/"+data.get("fileName");
			File fp = new File(catalogue);  
	        // 创建目录  
	        if (!fp.exists()) {  
	            fp.mkdirs();// 目录不存在的情况下，创建目录。  
	        } 
			FileOutputStream fos = new FileOutputStream(new File(catalogue+"/showModify"+data.get("className")+".js"));//java文件的生成目录
			
			t.process(data, new OutputStreamWriter(fos,"utf-8"));//
			fos.flush();
			fos.close();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (TemplateException e) {
			e.printStackTrace();
		}
		
	}
	
	/**
	 * 生成Action文件
	 */
	public void actionGenerator(Map data) {
		Configuration cfg = new Configuration();
		//Map data = this.getData();
		try {
			
        	cfg.setClassForTemplateLoading(this.getClass(), "/com");//指定模板所在的classpath目录
        	
			Template t = cfg.getTemplate("javaAction.html");//指定模板
			String catalogue = data.get("proName")+"/src/module/"+data.get("fileName")+"/action";
			File fp = new File(catalogue);  
	        // 创建目录  
	        if (!fp.exists()) {  
	            fp.mkdirs();// 目录不存在的情况下，创建目录。  
	        } 
			FileOutputStream fos = new FileOutputStream(new File(catalogue+"/"+data.get("className")+"Action.java"));//java文件的生成目录
			
			t.process(data, new OutputStreamWriter(fos,"utf-8"));//
			fos.flush();
			fos.close();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (TemplateException e) {
			e.printStackTrace();
		}
		
	}
	
	/**
	 * 生成bo文件
	 */
	public void boGenerator(Map data) {
		Configuration cfg = new Configuration();
		//Map data = this.getData();
		try {
			
        	cfg.setClassForTemplateLoading(this.getClass(), "/com");//指定模板所在的classpath目录
        	
			Template t = cfg.getTemplate("javaBo.html");//指定模板
			String catalogue = data.get("proName")+"/src/module/"+data.get("fileName")+"/bo";
			File fp = new File(catalogue);  
	        // 创建目录  
	        if (!fp.exists()) {  
	            fp.mkdirs();// 目录不存在的情况下，创建目录。  
	        } 
			FileOutputStream fos = new FileOutputStream(new File(catalogue+"/"+data.get("className")+"BoImpl.java"));//java文件的生成目录
			
			t.process(data, new OutputStreamWriter(fos,"utf-8"));//
			fos.flush();
			fos.close();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (TemplateException e) {
			e.printStackTrace();
		}
		
	}
	
	/**
	 * 生成bo文件
	 */
	public void IboGenerator(Map data) {
		Configuration cfg = new Configuration();
		//Map data = this.getData();
		try {
			
        	cfg.setClassForTemplateLoading(this.getClass(), "/com");//指定模板所在的classpath目录
        	
			Template t = cfg.getTemplate("IjavaBo.html");//指定模板
			String catalogue = data.get("proName")+"/src/module/"+data.get("fileName")+"/bo";
			File fp = new File(catalogue);  
	        // 创建目录  
	        if (!fp.exists()) {  
	            fp.mkdirs();// 目录不存在的情况下，创建目录。  
	        } 
			FileOutputStream fos = new FileOutputStream(new File(catalogue+"/I"+data.get("className")+"Bo.java"));//java文件的生成目录
			
			t.process(data, new OutputStreamWriter(fos,"utf-8"));//
			fos.flush();
			fos.close();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (TemplateException e) {
			e.printStackTrace();
		}
		
	}

	/**
	 * 生成pojo文件
	 */
	public void pojoGenerator(Map data) {
		Configuration cfg = new Configuration();
		//Map data = this.getData();
		try {
			
        	cfg.setClassForTemplateLoading(this.getClass(), "/com");//指定模板所在的classpath目录
        	
			Template t = cfg.getTemplate("pojo.html");//指定模板
			String catalogue = data.get("proName")+"/src/module/pojo";
			File fp = new File(catalogue);  
	        // 创建目录  
	        if (!fp.exists()) {  
	            fp.mkdirs();// 目录不存在的情况下，创建目录。  
	        } 
			FileOutputStream fos = new FileOutputStream(new File(catalogue+"/"+data.get("pojoClassName")+".java"));//java文件的生成目录
			
			t.process(data, new OutputStreamWriter(fos,"utf-8"));//
			fos.flush();
			fos.close();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (TemplateException e) {
			e.printStackTrace();
		}
		
	}
}
