package com.ibm.internship.blueagent.web.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.ibm.watson.developer_cloud.discovery.v1.Discovery;
import com.ibm.watson.developer_cloud.discovery.v1.model.query.QueryRequest;
import com.ibm.watson.developer_cloud.discovery.v1.model.query.QueryResponse;


public class Query {

	public  List<Document> findQuery(String query) {
		
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
		  
		  List<Document> docsList = new ArrayList<Document>();
		  for (Map<String, Object> discoveryDocs : queryResponse.getResults()) {
			Document doc = new Document();
			doc.setBody(discoveryDocs.toString());
			docsList.add(doc);
			
		}
		 
		return docsList ;
	
	}
}
