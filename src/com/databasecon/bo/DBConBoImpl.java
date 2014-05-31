package com.databasecon.bo;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.model.DatabaseModel;
import com.model.FileModel;
import com.model.JGridModel;

@Service("dbconBo")
@SuppressWarnings("unchecked")
public class DBConBoImpl implements IDBConBo {
	
	/**
	 * 连接数据库
	 */
	public boolean getConnection() {
		// new DBConnection("oracle", "192.168.17.108″, 3306, "test", "test", "lxd", "123456″);
		String dbType = DatabaseModel.getDbType();
		String dbIp = DatabaseModel.getDbIp();
		String dbPort = DatabaseModel.getDbPort();
		String dbInstance = DatabaseModel.getDbInstance();
		String userName = DatabaseModel.getUserName();
		String password = DatabaseModel.getPassword();
		String driverClass = null;
		String url = null;
		if (dbType.equalsIgnoreCase("mysql")) {
			driverClass = "com.mysql.jdbc.Driver";
			url = "jdbc:mysql://" + dbIp + ":" + dbPort + "/" + dbInstance;
		} else if (dbType.equalsIgnoreCase("oracle")) {
			driverClass = "oracle.jdbc.driver.OracleDriver";
			url = "jdbc:oracle:thin:@" + dbIp + ":" + dbPort + ":" + dbInstance;
		} else if (dbType.equalsIgnoreCase("post")) {
			driverClass = "org.postgresql.Driver";
			url = "jdbc:postgresql://" + dbIp + ":" + dbPort + "/" + dbInstance;
		} else if (dbType.equalsIgnoreCase("post")) {
			driverClass = "org.postgresql.Driver";
			url = "jdbc:postgresql://" + dbIp + ":" + dbPort + "/" + dbInstance;
		}
		Connection conn = null;
		try {
			Class.forName(driverClass);
			conn = DriverManager.getConnection(url, userName, password);
			DatabaseModel.setConn(conn);
			return true;
		}catch (SQLException e) {
			e.printStackTrace();
		}catch (ClassNotFoundException e) {
			e.printStackTrace();
		} 
		return false;
		//return conn;
	}
	
	/**
	 * 获得数据库中的表
	 */
	public void getTableList() throws SQLException {
		Connection conn = DatabaseModel.getConn();
		DatabaseMetaData dbmd = conn.getMetaData();
		ResultSet rs = dbmd.getTables(null, "%", "%", new String[] { "TABLE" });
		List tableList = new ArrayList();
		while (rs.next()) {
			tableList.add(rs.getString("TABLE_NAME"));
		}
		DatabaseModel.setTableList(tableList);
		//return tableNameList;
	}
	
	/**
	 * 获得数据库表中的字段
	 */
	public void getColumnListByTable() throws SQLException {
		Connection conn = DatabaseModel.getConn();
		DatabaseMetaData dbmd = conn.getMetaData();
		String tableName = DatabaseModel.getTableChoose();
		ResultSet rs = dbmd.getColumns(null, "%", tableName, "%");
		ResultSet pkRSet = dbmd.getPrimaryKeys(null, null, tableName);
		
		List<String> key = new ArrayList<String>();
		
		List list = new ArrayList();
		List columnList = new ArrayList();
		List columnPojoList = new ArrayList();
		
		String columnNameList="";
		String columnTypeList="";
		
		for(int i=0; pkRSet.next(); i++){
			key.add(i,(String)pkRSet.getString("COLUMN_NAME"));
			
			Map columnMap = new HashMap();
			columnMap.put("modelColumn",FileModel.setColumnToModel(key.get(i)));
			columnMap.put("databaseColumn",key.get(i));
			columnMap.put("webColumn",key.get(i));
			columnMap.put("columnType","String");
			//columnList.add(columnMap);
			
			JGridModel.setColumnKey(columnMap);
			break;
		}
		
		//List columnNameList = new ArrayList();
		//List columnTypeList = new ArrayList();
		
		while (rs.next()) {
			/*
		    String key = rs.getString("COLUMN_NAME");  //获取字段名
		    val.add(rs.getString("DATA_TYPE"));  //获取数据类型
		    val.add(rs.getString("DATA_LENGTH"));  //获取数据长度
		    val.add(rs.getString("DATA_PRECISION"));  //获取数据长度
		    val.add(rs.getString("DATA_SCALE"));  //获取数据精度
		    val.add(rs.getString("NULLABLE"));  //获取是否为空
		    */
			columnNameList = rs.getString("COLUMN_NAME");
			//columnTypeList = rs.getString("DATA_TYPE");
			columnTypeList = "String";
			
			Map columnPojoMap = FileModel.setColumnToPojoList(columnNameList);
			columnPojoList.add(columnPojoMap);
			//columnMap.put("dataPrecisionList",rs.getString("DATA_PRECISION"));
			if(!key.isEmpty()&&key.contains(columnNameList)){
				
			}
			else{
				Map columnMap = new HashMap();
				columnMap.put("columnNameList",columnNameList);
				columnMap.put("columnTypeList",columnTypeList);
				columnList.add(columnMap);
			}
		
		}
		//list.add(columnList);
		//columnMap.put("columnNameList", columnNameList);
		//columnMap.put("columnTypeList", columnTypeList);
		FileModel.setPojoColumn(columnPojoList);
		DatabaseModel.setColumnList(columnList);
	}
}
