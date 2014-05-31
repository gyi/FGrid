package com.databasecon.bo;

import java.sql.SQLException;

public interface IDBConBo {
	
	/**
	 * 获得数据库链接
	 * 
	 * @return tableList
	 */
	public boolean getConnection() throws SQLException ;
	
	/**
	 * 获得数据库中的表
	 * 
	 * @return tableList
	 */
	public void getTableList() throws SQLException ;
	
	/**
	 * 获得数据库表中的列
	 * 
	 * @param table
	 * @return rowList
	 */
	public void getColumnListByTable() throws SQLException ;
	
}
