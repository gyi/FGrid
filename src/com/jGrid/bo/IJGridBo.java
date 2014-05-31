package com.jGrid.bo;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

@SuppressWarnings("unchecked")
public interface IJGridBo {

//	/**
//	 * 获得数据库链接
//	 * 
//	 * @return tableList
//	 */
//	public boolean getConnection() throws SQLException ;
//	
//	/**
//	 * 获得数据库中的表
//	 * 
//	 * @return tableList
//	 */
//	public void getTableList() throws SQLException ;
//	
//	/**
//	 * 获得数据库表中的列
//	 * 
//	 * @param table
//	 * @return rowList
//	 */
//	public void getColumnListByTable() throws SQLException ;
	
	/**
	 * 处理数据
	 * @return
	 */
	public void getData() ;
	
}
