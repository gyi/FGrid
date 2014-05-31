package com.model;

import java.sql.Connection;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

public class DatabaseModel {
	
	static private String dbType;
	static private String dbIp;
	static private String dbPort;
	static private String dbInstance;
	static private String userName;
	static private String password;
	static private Connection conn;
	static private List tableList;
	static private String tableChoose;
	static List columnList;
	
	public static String getDbType() {
		return dbType;
	}
	public static void setDbType(String dbType) {
		DatabaseModel.dbType = dbType;
	}
	public static String getDbIp() {
		return dbIp;
	}
	public static void setDbIp(String dbIp) {
		DatabaseModel.dbIp = dbIp;
	}
	public static String getDbPort() {
		return dbPort;
	}
	public static void setDbPort(String dbPort) {
		DatabaseModel.dbPort = dbPort;
	}
	public static String getDbInstance() {
		return dbInstance;
	}
	public static void setDbInstance(String dbInstance) {
		DatabaseModel.dbInstance = dbInstance;
	}
	public static String getUserName() {
		return userName;
	}
	public static void setUserName(String userName) {
		DatabaseModel.userName = userName;
	}
	public static String getPassword() {
		return password;
	}
	public static void setPassword(String password) {
		DatabaseModel.password = password;
	}
	public static Connection getConn() {
		return conn;
	}
	public static void setConn(Connection conn) {
		DatabaseModel.conn = conn;
	}
	public static List getTableList() {
		return tableList;
	}
	public static void setTableList(List tableList) {
		DatabaseModel.tableList = tableList;
	}
	public static String getTableChoose() {
		return tableChoose;
	}
	public static void setTableChoose(String tableChoose) {
		DatabaseModel.tableChoose = tableChoose;
	}
	public static List getColumnList() {
		return columnList;
	}
	public static void setColumnList(List columnList) {
		DatabaseModel.columnList = columnList;
	}
	
	
}
