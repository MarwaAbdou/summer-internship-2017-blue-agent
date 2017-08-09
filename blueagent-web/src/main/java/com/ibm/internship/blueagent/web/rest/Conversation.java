package com.ibm.internship.blueagent.web.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ibm.watson.developer_cloud.conversation.v1.ConversationService;
import com.ibm.watson.developer_cloud.conversation.v1.model.MessageRequest;
import com.ibm.watson.developer_cloud.conversation.v1.model.MessageResponse;

public class Conversation {

	
	public Map<String,Object> CheckChat (String text) {
		
		//setting conversation environment.
		Map<String,Object> fetchingObjects = new  HashMap<String,Object>();
		ConversationService service = new ConversationService("2017-07-25");
		service.setEndPoint("https://gateway.watsonplatform.net/conversation/api");
		service.setUsernameAndPassword("b70cdcad-91cd-4a6a-8089-98b24ce6d053", "gNL1hmi5CWTF");
		
		
		//send message to conversation
		MessageRequest newMessage = new MessageRequest.Builder().inputText("text: "+text).build();
		String workspaceId = "de7eb1fe-1140-4309-a2e3-c83636b1cf20";
		MessageResponse response = service.message(workspaceId, newMessage).execute();
		System.out.println(response.getOutput().toString());
						
		//List<Intent> intents=new List<Intent>();
		Map<String,Object> contextVariables = response.getContext();
		String action = "ACTION";
		if (contextVariables.containsKey(action) && contextVariables.get(action).toString() == "SearchWDS"){
			String searchTerm =contextVariables.get("SEARCH_TERM").toString();
			
			//fetching the method of searching in WDS
			Query queryObject = new Query();
			List<Document> results = queryObject.findQuery(searchTerm);
			Integer discoveryCount = new Integer(results.size());
			contextVariables.put(discoveryCount.toString(), "SEARCH_COUNT");
			//reseting the variable
			contextVariables.remove("ACTION");
			
			Services sendResults=new Services();
			sendResults.getConversation("search result");
			//response.setContext(contextVariables);
		
			
			fetchingObjects.put("WDSResponse", results);
			fetchingObjects.put("WCSResponse", response);
		
		
		
		}else{
			fetchingObjects.put("WDSResponse", null);
			fetchingObjects.put("WCSResponse", response);
		}
		return fetchingObjects;
	}
}
