package com.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FileModel {
	
	private static String proFile;
	private static String jspFile;
	private static int jspPosition;
	
	private static String jsFile;
	private static String actionFile;
	private static String iBoFile;
	private static String boFile;
	
	private static String jsName;
	private static String actionName;
	private static String iBoName;
	private static String boName;
	
	private static String jsPackage;
	private static String actionPackage;
	private static String boPackage;
	private static String iBoPackage;
	
	private static String actionMarker;
	private static String boMarker;
	
	private static String fileName;
	private static String packageName;
	private static String className;
	private static String objectName;
	
	private static String pojoClassName;
	private static String pojoObjectName;
	private static List pojoColumn;
	
	public static String getProFile() {
		return proFile;
	}
	public static void setProFile(String proFile) {
		FileModel.proFile = proFile;
	}
	public static String getJspFile() {
		return jspFile;
	}
	public static void setJspFile(String jspFile) {
		FileModel.jspFile = jspFile;
	}
	public static int getJspPosition() {
		return jspPosition;
	}
	public static void setJspPosition(int jspPosition) {
		FileModel.jspPosition = jspPosition;
	}
	
	public static String getJsFile() {
		return jsFile;
	}
	public static void setJsFile(String jsFile) {
		FileModel.jsFile = jsFile;
	}
	public static String getActionFile() {
		return actionFile;
	}
	public static void setActionFile(String actionFile) {
		FileModel.actionFile = actionFile;
	}
	public static String getiBoFile() {
		return iBoFile;
	}
	public static void setiBoFile(String iBoFile) {
		FileModel.iBoFile = iBoFile;
	}
	public static String getBoFile() {
		return boFile;
	}
	public static void setBoFile(String boFile) {
		FileModel.boFile = boFile;
	}
	public static String getJsName() {
		return jsName;
	}
	public static void setJsName(String jsName) {
		FileModel.jsName = jsName;
	}
	public static String getActionName() {
		return actionName;
	}
	public static void setActionName(String actionName) {
		FileModel.actionName = actionName;
	}
	public static String getiBoName() {
		return iBoName;
	}
	public static void setiBoName(String iBoName) {
		FileModel.iBoName = iBoName;
	}
	public static String getBoName() {
		return boName;
	}
	public static void setBoName(String boName) {
		FileModel.boName = boName;
	}
	public static String getJsPackage() {
		return jsPackage;
	}
	public static void setJsPackage(String jsPackage) {
		FileModel.jsPackage = jsPackage;
	}
	public static String getActionPackage() {
		return actionPackage;
	}
	public static void setActionPackage(String actionPackage) {
		FileModel.actionPackage = actionPackage;
	}
	public static String getBoPackage() {
		return boPackage;
	}
	public static void setBoPackage(String boPackage) {
		FileModel.boPackage = boPackage;
	}
	public static String getiBoPackage() {
		return iBoPackage;
	}
	public static void setiBoPackage(String iBoPackage) {
		FileModel.iBoPackage = iBoPackage;
	}
	public static String getActionMarker() {
		return actionMarker;
	}
	public static void setActionMarker(String actionMarker) {
		FileModel.actionMarker = actionMarker;
	}
	public static String getBoMarker() {
		return boMarker;
	}
	public static void setBoMarker(String boMarker) {
		FileModel.boMarker = boMarker;
	}

	//
	public static String getName(String File, String Project) {
		String name = "";
		String str = File.split(Project)[0];
		String[] strs = File.split(str);
		name = strs[strs.length];
		name = name.split(".")[0];
		return name;
	}
	public static String getPackage(String File, String Project) {
		String filepackage = "";
		String str = File.split(Project)[0];
		String[] strs = File.split(str);
		for(int i=0; i<strs.length-1; i++){
			filepackage += strs[i];
			if(i!=strs.length-2){
				filepackage += ".";
			}
		}
		
		return filepackage;
	}
	public static String getMarker(String File, String Project, String type) {
		String marker = "";
		marker = getName(File, Project);
		if(type=="action"){
			marker = marker.split("Action")[0];
		}
		else if(type=="bo"){
			marker = marker.split("BoImpl")[0];
		}
		else{
			return marker = "";
		}
		//marker = marker.split(".")[0];
		
		return marker;
	}
	
	public static String upperToLowerOfString(String upperNumber){
		char[] c = upperNumber.toCharArray();
		for(int i=0; i<c.length; i++){
			c[i] = upperToLowerOfChar(c[i]);
		}

		String lowNumber = String.valueOf(c);

		return lowNumber;
	}
	
	public static String lowerToUpperOfString(String lowNumber){
		char[] c = lowNumber.toCharArray();
		for(int i=0; i<c.length; i++){
			c[i] = lowerToUpperOfChar(c[i]);
		}

		String upperNumber = String.valueOf(c);

		return upperNumber;
	}
	
	public static char upperToLowerOfChar(char upper){
		if(upper>=65&&upper<=90){
			upper = (char) (upper+32);
		}
		return upper;
	}
	
	public static char lowerToUpperOfChar(char upper){
		if(upper>=97&&upper<=122){
			upper = (char) (upper-32);
		}
		return upper;
	}
	
	public static void setFileByTable(String tableName) {
		// TODO Auto-generated method stub
		String[] strs = tableName.split("_");
		fileName="";
		for(int i=0; i<strs.length; i++){
			fileName += strs[i];
			if(i != strs.length-1){
				fileName += "/";
			}
		}
	}
	public static void setPackageByTable(String tableName) {
		// TODO Auto-generated method stub
		String[] strs = tableName.split("_");
		packageName="";
		for(int i=0; i<strs.length; i++){
			packageName += upperToLowerOfString(strs[i]);
			if(i != strs.length-1){
				packageName += ".";
			}
		}
	}
	public static void setClassByTable(String tableName) {
		// TODO Auto-generated method stub
		className="";
		String[] strs = tableName.split("_");
		int length = strs.length;
		className = strs[strs.length-1];
		char [] cs = className.toCharArray();
		cs[0] = lowerToUpperOfChar(cs[0]);
		className = String.valueOf(cs);
	}
	public static void setOjectByTable(String tableName) {
		// TODO Auto-generated method stub
		objectName="";
		String[] strs = tableName.split("_");
		objectName = strs[strs.length-1];
	}
	public static void setPojoClassByTable(String tableName) {
		// TODO Auto-generated method stub
		pojoClassName="";
		String[] strs = tableName.split("_");
		for(int i=0; i<strs.length; i++){
			char [] cs = strs[i].toCharArray();
			cs[0] = lowerToUpperOfChar(cs[0]);
			pojoClassName += String.valueOf(cs);
		}
	}
	public static void setPojoObjectNameByTable(String tableName) {
		// TODO Auto-generated method stub
		pojoObjectName="";
		String[] strs = tableName.split("_");
		for(int i=0; i<strs.length; i++){
			char [] cs = strs[i].toCharArray();
			if(i==0){
				cs[0] = upperToLowerOfChar(cs[0]);
			}
			if(i!=0){
				cs[0] = lowerToUpperOfChar(cs[0]);
			}
			pojoObjectName += String.valueOf(cs);
		}
		int j=0;
	}
	
	public static String setColumnToModel(String columnName) {
		String thatmodelColumn = "";
		String[] strs = columnName.split("_");
		
		for(int i=0; i<strs.length; i++){
			char [] cs = strs[i].toCharArray();
			cs[0] = lowerToUpperOfChar(cs[0]);
			thatmodelColumn += String.valueOf(cs);
		}
		return thatmodelColumn;
	}
	
	public static Map setColumnToPojoList(String columnName) {
		String objectColumn = "";
		String thatmodelColumn = "";
		String[] strs = columnName.split("_");
		
		for(int i=0; i<strs.length; i++){
			char [] cs = strs[i].toCharArray();
			if(i==0){
				cs[0] = upperToLowerOfChar(cs[0]);
			}
			if(i!=0){
				cs[0] = lowerToUpperOfChar(cs[0]);
			}
			objectColumn += String.valueOf(cs);
			cs[0] = lowerToUpperOfChar(cs[0]);
			thatmodelColumn += String.valueOf(cs);
		}
		Map column = new HashMap();
		column.put("columnName", columnName);
		column.put("objectColumn", objectColumn);
		column.put("modelColumn", thatmodelColumn);
		
		return column;
	}
	
	public static String getFileName() {
		return fileName;
	}
	public static String getPackageName() {
		return packageName;
	}
	public static String getClassName() {
		return className;
	}
	public static String getObjectName() {
		return objectName;
	}
	public static String getPojoClassName() {
		return pojoClassName;
	}
	public static String getPojoObjectName() {
		return pojoObjectName;
	}
	public static List getPojoColumn() {
		return pojoColumn;
	}
	public static void setPojoColumn(List pojoColumn) {
		FileModel.pojoColumn = pojoColumn;
	}
	
	
}
