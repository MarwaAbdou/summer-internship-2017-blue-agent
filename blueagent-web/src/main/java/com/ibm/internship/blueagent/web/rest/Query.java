package com.ibm.internship.blueagent.web.rest;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.lang.*;
import java.util.*;
import com.google.gson.JsonObject;

import com.ibm.watson.developer_cloud.discovery.v1.Discovery;
import com.ibm.watson.developer_cloud.discovery.v1.model.query.QueryRequest;
import com.ibm.watson.developer_cloud.discovery.v1.model.query.QueryResponse;


public class Query {

	public Response findQuery(String query) {
		
		//setting the environment Scope
		Discovery discovery = new Discovery("2017-07-19");
		  discovery.setEndPoint("https://gateway.watsonplatform.net/discovery/api");
		  discovery.setUsernameAndPassword("3fe186af-7bf8-4762-972f-08310e91c454", "luBPJjOBv2YK");
		  String environmentId = "da5029bc-ba1a-4b46-9fca-bca6e2454ecf";
		  String collectionId = "dc40f9b1-d488-4c9b-ab3d-8acbc089fd10";
		  

		  
		
		  //retrieve document
		  QueryRequest.Builder queryBuilder = new QueryRequest.Builder(environmentId, collectionId);
		  queryBuilder.query("text:"+query);
		  QueryResponse queryResponse = discovery.query(queryBuilder.build()).execute();
		
		  System.out.println("your output is"+queryResponse.getResults().get(0).get("id"));
		  
//		  List<Document> docs = new ArrayList<Document>();
//		  for (Map<String, Object> disDoc : queryResponse.getResults()) {
//			Document doc = new Document();
//			doc.setBody(disDoc.get("id").toString());
//			docs.add(doc);
	//	}
		 
		  //List<documents> result=new ArrayList<documents>();
		
		return queryResponse;
	
	}
}
