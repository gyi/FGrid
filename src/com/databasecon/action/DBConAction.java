package com.databasecon.action;

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

import com.jGrid.bo.IJGridBo;
import com.model.DatabaseModel;
import com.model.FileModel;
import com.model.JGridModel;
import com.databasecon.bo.IDBConBo;

@Controller
@RequestMapping(value = "/dbcon.do")
@SuppressWarnings("unchecked")
public class DBConAction {
	
	@Resource(name = "dbconBo")
	IDBConBo dbconBo = null;
	
	@RequestMapping(params = "method=showConPage")
	public String showConPage(HttpServletRequest request, HttpServletResponse response) {
		return "databaseCon";
	}
	
	@RequestMapping(params = "method=getConnection")
	public void getConnection(HttpServletRequest request, HttpServletResponse response) throws IOException{
		Map map = request.getParameterMap();
				
				
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
			
			if(this.dbconBo.getConnection()==true){
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
			this.dbconBo.getTableList();
			request.setAttribute("tableList", DatabaseModel.getTableList());
		}
		catch(Exception e){
			e.printStackTrace();
		}
		return "jGrid";
	}

}
