package com.jGrid.action;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import com.model.DatabaseModel;
import com.model.FileModel;
import com.model.JGridModel;
import com.databasecon.bo.IDBConBo;
import com.jGrid.bo.IJGridBo;

@Controller
@RequestMapping(value = "/jGrid.do")
@SuppressWarnings("unchecked")
public class JGridAction {

	@Resource(name = "jGridBo")
	IJGridBo jGridBo = null;
	
	@Resource(name = "dbconBo")
	IDBConBo dbconBo = null;
	
	/*
	@RequestMapping(params = "method=showConPage")
	public String showConPage(HttpServletRequest request, HttpServletResponse response) {
		return "databaseCon";
	}
	
	@RequestMapping(params = "method=getConnection")
	public void getConnection(HttpServletRequest request, HttpServletResponse response) throws IOException{
		String dbType = (String)request.getParameter("dbType");
		String dbIp = (String)request.getParameter("dbIp");
		String dbPort = (String)request.getParameter("dbPort");
		String dbInstance = (String)request.getParameter("dbInstance");
		String userName = (String)request.getParameter("userName");
		String password = (String)request.getParameter("password");
		
		DatabaseModel.setDbType(dbType);
		DatabaseModel.setDbIp(dbIp);
		DatabaseModel.setDbPort(dbPort);
		DatabaseModel.setDbInstance(dbInstance);
		DatabaseModel.setUserName(userName);
		DatabaseModel.setPassword(password);

		JSONObject json=new JSONObject();
		try{
			
			if(this.jGridBo.getConnection()==true){
				json.put("success","ok");
			}
			else{
				json.put("success","false");
			}
		}
		catch(Exception e){
			json.put("success","false");
			e.printStackTrace();
		}
		json.write(response.getWriter());
	}
	
	@RequestMapping(params = "method=showGridPage")
	public String showGridPage(HttpServletRequest request, HttpServletResponse response) {
		try{
			this.jGridBo.getTableList();
			request.setAttribute("tableList", DatabaseModel.getTableList());
		}
		catch(Exception e){
			e.printStackTrace();
		}
		return "jGrid";
	}
	*/
	
	@RequestMapping(params = "method=updateColumn")
	public void updateColumn(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String tableName = (String)request.getParameter("tableList");
		DatabaseModel.setTableChoose(tableName);
		List ColumnList = new ArrayList();
		
		JSONObject json=new JSONObject();
		try{
			this.dbconBo.getColumnListByTable();
			ColumnList.addAll(DatabaseModel.getColumnList());
			
//			request.setAttribute("ColumnMap", ColumnMap);
			json.put("success","ok");
			json.put("ColumnList",ColumnList);
			json.write(response.getWriter());
			//JSONObject json = JSONObject.fromObject( ColumnMap );  
		}
		catch(Exception e){
			json.put("success","ok");
			json.write(response.getWriter());
			e.printStackTrace();
		}
		//out.print(jsonArray2);
		//return "jGrid";
	}
	
	@RequestMapping(params = "method=jGridInfoCollect")
	public void jGridInfoCollect(HttpServletRequest request, HttpServletResponse response) throws IOException {
		JSONObject json=new JSONObject();
		//Map requestMap = request.getParameterMap();
		String validationChoose="";
		String validationCheck="";
		String validationAdd="";
		String validationModify="";
		String validationOpAdd="";
		String validationOpModify="";
		String validationOpDel="";
		
		//Map gridInfo = new HashMap();
		List column = new ArrayList();
		List columnCheck = new ArrayList();
		List columnAdd = new ArrayList();
		List columnModify = new ArrayList();
		List operation = new ArrayList();
		
		//是否生成数据模型
		String validationPojo = (String)request.getParameter("validation_pojo");
		
		if(validationPojo.equals("on")){
			JGridModel.setIsCreatePojo(true);
		}
		
		validationChoose = (String)request.getParameter("validation_choose_0");
		
		for(int i=0;validationChoose!=null&&!validationChoose.trim().equals("");i++){
			
			if(validationChoose.equals("on")){
				//获取column信息
				Map column_i= new HashMap();
				
				column_i.put("modelColumn", FileModel.setColumnToModel(request.getParameter("databaseColumn_"+i).toString()));
				column_i.put("databaseColumn", request.getParameter("databaseColumn_"+i).toString());
				column_i.put("webColumn", request.getParameter("webColumn_"+i).toString());
				column_i.put("columnType", request.getParameter("columnType_"+i).toString());
				
				//操作
				validationCheck = request.getParameter("validation_check_"+i).toString();
				if(validationCheck.equals("on")){
					columnCheck.add(request.getParameter("databaseColumn_"+i).toString());
				}
				validationAdd = request.getParameter("validation_add_"+i).toString();
				if(validationAdd.equals("on")){
					columnAdd.add(column_i);
				}
				validationModify = request.getParameter("validation_modify_"+i).toString();
				if(validationModify.equals("on")){
					columnModify.add(column_i);
				}
				column.add(column_i);
				
			}
			
			validationChoose = (String)request.getParameter("validation_choose_"+(i+1));
		}
		
		//有什么操作
		validationOpAdd = (String)request.getParameter("validation_checkboxOp_add");
		validationOpModify = (String)request.getParameter("validation_checkboxOp_modify");
		validationOpDel = (String)request.getParameter("validation_checkboxOp_del");
		
		List operateJudge = new ArrayList();
		operateJudge.add(0, "false");
		operateJudge.add(1, "false");
		operateJudge.add(2, "false");
		
		if(validationOpAdd.equals("on")){
			operateJudge.set(0, "true");
		}
		if(validationOpModify.equals("on")){
			operateJudge.set(1, "true");
		}
		if(validationOpDel.equals("on")){
			operateJudge.set(2, "true");
		}
		
		String fileName = "";
		String packageName = "";
		String className = "";
		String objectName = "";
		//String MarkerName = "";
		String pojoClass = "";
		String pojoObject = "";
		
		//通过表来生成各种目录各种包
		String tableName = request.getParameter("tableName").toString();
		String lTableName = FileModel.upperToLowerOfString(tableName);
		FileModel.setFileByTable(lTableName);
		FileModel.setPackageByTable(lTableName);
		FileModel.setClassByTable(lTableName);
		FileModel.setOjectByTable(lTableName);
		FileModel.setPojoClassByTable(lTableName);
		FileModel.setPojoObjectNameByTable(lTableName);
		
		//
		JGridModel.setObject(request.getParameter("objectName").toString());
		JGridModel.setObjectComment(request.getParameter("objectComment").toString());
		JGridModel.setTableName(request.getParameter("tableList").toString());
		
		JGridModel.setOperate(operation);
		JGridModel.setOperateJudge(operateJudge);
		JGridModel.setColumnList(column);
		JGridModel.setColumnAddList(columnAdd);
		JGridModel.setColumnModifyList(columnModify);
		
		JGridModel.setColumnCheckList(columnCheck);
		
		try{
			//showfilePage();
			json.put("success","ok");
			//this.jGridBo.jsGenerator();

		}
		catch(Exception e){
			json.put("success","false");
			e.printStackTrace();
		}

		json.write(response.getWriter());
		return ;
	}
	
	@RequestMapping(params = "method=showFilePage")
	public String showFilePage(HttpServletRequest request, HttpServletResponse response) {
		return "file";
	}

	public String showFilePage() {
		return "file";
	}
	
	@RequestMapping(params = "method=fileInfoCollect")
	public void fileInfoCollect(HttpServletRequest request, HttpServletResponse response) throws IOException {
		JSONObject json=new JSONObject();
		String proFile = (String)request.getParameter("proFile");
		String jspFile = (String)request.getParameter("jspFile");
		int jspPosition = Integer.valueOf((String)request.getParameter("jspPosition"));
		
		FileModel.setProFile(proFile);
		FileModel.setJspFile(jspFile);
		FileModel.setJspPosition(jspPosition);
		try{
			json.put("success","ok");
			//json.put("ColumnList",ColumnList);
		}
		catch(Exception e){
			json.put("success","false");
			e.printStackTrace();
		}
		json.write(response.getWriter());
	}
	
	@RequestMapping(params = "method=showBasePage")
	public String showBasePage(HttpServletRequest request, HttpServletResponse response) {
		return "base";
		
	}
	
	@RequestMapping(params = "method=doGenertorPage")
	public void doGenertorPage() {
		this.jGridBo.getData();
		int i;
//		this.jGridBo.jsGenerator();
//		this.jGridBo.actionGenerator();
//		this.jGridBo.boGenerator();
		
	}
	
	
}
