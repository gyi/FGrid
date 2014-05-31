package com;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

public class Test {

	public static void Action(){
		
		Configuration cfg = new Configuration();
		try {
        	cfg.setClassForTemplateLoading(Test.class, "/com");//指定模板所在的classpath目录
        	cfg.setSharedVariable("upperFC", new UpperFirstCharacter());//添加一个"宏"共享变量用来将属性名首字母大写
			Template t = cfg.getTemplate("javaAction.html");//指定模板
			FileOutputStream fos = new FileOutputStream(new File("d:/mycode/MyEmployeeAction.java"));//java文件的生成目录
			//
			//模拟数据源
			Map data = new HashMap();
			data.put("className", "MyEmployee");
			data.put("package", "system.employee");//包名
			
			data.put("classcomment", "用户");//包名
			data.put("author", "Feison");
			data.put("version", "1.0  Sep 19, 2010");//包名
			//加一个功能将大写变为小些
			data.put("lowerclassName", "myEmployee");
			data.put("modelName", "用户管理");//包名
			data.put("exceptionMessage", "用户信息");
			
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
	 * @param args
	 */
	public static void main(String[] args) {
		Action();
	}

}
