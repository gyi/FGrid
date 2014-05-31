package com.model;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

public class JGridModel {
	
	static private String tableName;
	static private Map columnKey;
	static private List columnList;
	static private List columnAddList;
	static private List columnModifyList;
	
	static private List columnCheckList;
	static private List operate;
	static private List operateJudge;
	static private String object;
	static private String objectComment;
	
	static private boolean isCreatePojo = false;
	
	public static String getTableName() {
		return tableName;
	}
	public static void setTableName(String tableName) {
		JGridModel.tableName = tableName;
	}
	
	public static Map getColumnKey() {
		return columnKey;
	}
	public static void setColumnKey(Map columnKey) {
		JGridModel.columnKey = columnKey;
	}
	
	public static List getColumnList() {
		return columnList;
	}
	public static void setColumnList(List columnList) {
		JGridModel.columnList = columnList;
	}
	public static List getColumnAddList() {
		return columnAddList;
	}
	public static void setColumnAddList(List columnAddList) {
		JGridModel.columnAddList = columnAddList;
	}
	public static List getColumnModifyList() {
		return columnModifyList;
	}
	public static void setColumnModifyList(List columnModifyList) {
		JGridModel.columnModifyList = columnModifyList;
	}
	public static List getColumnCheckList() {
		return columnCheckList;
	}
	public static void setColumnCheckList(List columnCheckList) {
		JGridModel.columnCheckList = columnCheckList;
	}
	public static List getOperate() {
		return operate;
	}
	public static void setOperate(List operate) {
		JGridModel.operate = operate;
	}
	public static List getOperateJudge() {
		return operateJudge;
	}
	public static void setOperateJudge(List operateJudge) {
		JGridModel.operateJudge = operateJudge;
	}
	public static String getObject() {
		return object;
	}
	public static void setObject(String object) {
		JGridModel.object = object;
	}
	public static String getObjectComment() {
		return objectComment;
	}
	public static void setObjectComment(String objectComment) {
		JGridModel.objectComment = objectComment;
	}
	public static boolean getIsCreatePojo() {
		return isCreatePojo;
	}
	public static void setIsCreatePojo(boolean isCreatePojo) {
		JGridModel.isCreatePojo = isCreatePojo;
	}
	
	
}
