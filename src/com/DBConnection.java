package com;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class DBConnection {
	private String dbType;
	private String dbIp;
	private int dbPort;
	private String dbInstance;
	private String dbSchema;
	private String userName;
	private String password;

	public DBConnection() {
		super();
	}

	public DBConnection(String dbType, String dbIp, int dbPort, String dbInstance, String dbSchema, String userName, String password) {
		super();
		this.dbType = dbType;
		this.dbIp = dbIp;
		this.dbPort = dbPort;
		this.dbSchema = dbSchema;
		this.dbInstance = dbInstance;
		this.userName = userName;
		this.password = password;
	}

	public String getDbType() {
		return dbType;
	}

	public void setDbType(String dbType) {
		this.dbType = dbType;
	}

	public String getDbIp() {
		return dbIp;
	}

	public void setDbIp(String dbIp) {
		this.dbIp = dbIp;
	}

	public int getDbPort() {
		return dbPort;
	}

	public void setDbPort(int dbPort) {
		this.dbPort = dbPort;
	}
	
	public String getDbSchema() {
		return dbSchema;
	}
	
	public void setDbSchema(String dbSchema) {
		this.dbSchema = dbSchema;
	}
	
	public String getUserName() {
		return userName;
	}
	
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getDbInstance() {
		return dbInstance;
	}
	
	public void setDbInstance(String dbInstance) {
		this.dbInstance = dbInstance;
	}
	
	public Connection getConnection() {
		// new DBConnection("oracle", "192.168.17.108″, 3306, "test", "test", "lxd", "123456″);
		setDbType("mysql");
		setDbIp("127.0.0.1");
		setDbPort(3306);
		setDbInstance("mysql");
		setDbSchema("mysql");
		setUserName("root");
		setPassword("323847");
		String driverClass = null;
		String url = null;
		if (this.dbType.equalsIgnoreCase("mysql")) {
			driverClass = "com.mysql.jdbc.Driver";
			url = "jdbc:mysql://" + dbIp + ":" + dbPort + "/" + dbInstance;
		} else if (this.dbType.equalsIgnoreCase("oracle")) {
			driverClass = "oracle.jdbc.driver.OracleDriver";
			url = "jdbc:oracle:thin:@" + dbIp + ":" + dbPort + ":" + dbInstance;
		} else if (this.dbType.equalsIgnoreCase("post")) {
			driverClass = "org.postgresql.Driver";
			url = "jdbc:postgresql://" + dbIp + ":" + dbPort + "/" + dbInstance;
		} else if (this.dbType.equalsIgnoreCase("post")) {
			driverClass = "org.postgresql.Driver";
			url = "jdbc:postgresql://" + dbIp + ":" + dbPort + "/" + dbInstance;
		}
		Connection conn = null;
		try {
			Class.forName(driverClass);
			conn = DriverManager.getConnection(url, userName, password);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return conn;
	}
	//获取数据库中所有表的表名，并添加到列表结构中。
	public List getTableNameList(Connection conn) throws SQLException {
		DatabaseMetaData dbmd = conn.getMetaData();
		ResultSet rs = dbmd.getTables(null, "%", "%", new String[] { "TABLE" });
		List tableNameList = new ArrayList();
		while (rs.next()) {
			tableNameList.add(rs.getString("TABLE_NAME"));
		}
		return tableNameList;
	}
	//获取数据表中所有列的列名，并添加到列表结构中。
	public List getColumnNameList(Connection conn, String tableName) throws SQLException {
		DatabaseMetaData dbmd = conn.getMetaData();
		ResultSet rs = dbmd.getColumns(null, "%", tableName, "%");
		List columnNameList = new ArrayList();
		while (rs.next()) {
			columnNameList.add(rs.getString("COLUMN_NAME"));
		}
		return columnNameList;
	}
	public static void main(String[] args) {
		DBConnection dbConn = new DBConnection();
		Connection conn = dbConn.getConnection();
		try {
			List tableList = dbConn.getTableNameList(conn);
			for (int i = 0; i < tableList.size(); i++) {
				String tableName = (String) tableList.get(i);
				System.out.println("Table " + i + " : " + tableName);
				List columnList = dbConn.getColumnNameList(conn, tableName);
				for (int j = 0; j < columnList.size(); j++) {
					String coulumnName = (String) columnList.get(j);
					System.out.println("Column " + j + " : " + coulumnName);
				}
				System.out.println("——-————————————————————————分割线");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
	}
}
