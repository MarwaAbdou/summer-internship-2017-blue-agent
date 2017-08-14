package com.ibm.internship.blueagent.web.rest;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ibm.watson.developer_cloud.conversation.v1.ConversationService;
import com.ibm.watson.developer_cloud.conversation.v1.model.MessageRequest;
import com.ibm.watson.developer_cloud.conversation.v1.model.MessageRequest.Builder;
import com.ibm.watson.developer_cloud.conversation.v1.model.MessageResponse;
import com.ibm.watson.developer_cloud.util.GsonSingleton;

public class ConversationBrain {

    private String API_VERSION = "2017-07-25";
    private final String ERROR = "error";
    private String password = "gNL1hmi5CWTF";
    private String url = "https://gateway.watsonplatform.net/conversation/api";
    private String username = "b70cdcad-91cd-4a6a-8089-98b24ce6d053";
    private String workspaceId = "de7eb1fe-1140-4309-a2e3-c83636b1cf20";
//	public Map<String,Object> startChat (ConversationParameter parameters) {
//		
//		//setting conversation environment.
//		Map<String,Object> fetchingObjects = new  HashMap<String,Object>();
//		String workspaceId = "de7eb1fe-1140-4309-a2e3-c83636b1cf20";
//		ConversationService service = new ConversationService("2017-07-25");
//		service.setEndPoint("https://gateway.watsonplatform.net/conversation/api");
//		service.setUsernameAndPassword("b70cdcad-91cd-4a6a-8089-98b24ce6d053", "gNL1hmi5CWTF");
//		
//		
//		//send message to conversation
//		Builder wcsbuilder = new MessageRequest.Builder();
//		wcsbuilder.context(parameters.getContext());
//		MessageRequest newMessage = wcsbuilder.inputText("text: "+parameters.getInput().get("text").toString()).build();
//		
//		
//		MessageResponse response = service.message(workspaceId, newMessage).execute();
//		System.out.println(response.getOutput().toString());
//						
//		//List<Intent> intents=new List<Intent>();
//		Map<String,Object> contextVariables = response.getContext();
//		String action = "ACTION";
//		if (contextVariables.containsKey(action) && contextVariables.get(action).toString() == "SearchWDS"){
//			String searchTerm =contextVariables.get("SEARCH_TERM").toString();
//			
//			//fetching the method of searching in WDS
//			Query queryObject = new Query();
//			List<Document> results = queryObject.findQuery(searchTerm);
//			Integer discoveryCount = new Integer(results.size());
//			contextVariables.put(discoveryCount.toString(), "SEARCH_COUNT");
//			//reseting the variable
//			contextVariables.remove("ACTION");
//			
//			Map<String,Object> input =  parameters.getInput();
//			input.put("text", "Search Results");
//			parameters.setInput(input);
//			wcsbuilder.context(parameters.getContext());
//			newMessage = wcsbuilder.inputText("text: "+parameters.getInput().get("text").toString()).build();
//			response = service.message(workspaceId, newMessage).execute();
//			fetchingObjects.put("WDSResponse", results);
//			fetchingObjects.put("WCSResponse", response);
//		
//		}else{
//			fetchingObjects.put("WDSResponse", null);
//			fetchingObjects.put("WCSResponse", response);
//		}
//		return fetchingObjects;
//	}

	public MessageRequest buildMessageFromPayload(InputStream body) {
		StringBuilder sbuilder = null;
	    BufferedReader reader = null;
	    try {
	      reader = new BufferedReader(new InputStreamReader(body, "UTF-8"));
	      sbuilder = new StringBuilder();
	      String str = reader.readLine();
	      while (str != null) {
	        sbuilder.append(str);
	        str = reader.readLine();
	        if (str != null) {
	          sbuilder.append("\n");
	        }
	      }
	      return GsonSingleton.getGson().fromJson(sbuilder.toString(), MessageRequest.class);
	    } catch (IOException e) {
	      System.out.println("JSON READ");
	    } finally {
	      try {
	        if (reader != null) {
	          reader.close();
	        }
	      } catch (IOException e) {
	    	  System.out.println("STREAM CLOSE");
	      }
	    }
	    return null;
	}

	public MessageResponse getWatsonResponse(MessageRequest request) {
		ConversationService service = new ConversationService(API_VERSION);
	    if ((username != null) || (password != null)) {
	      service.setUsernameAndPassword(username, password);
	    }

	    service.setEndPoint(url);

	    // Use the previously configured service object to make a call to the
	    // conversational service
	    MessageResponse response = service.message(workspaceId, request).execute();

	    // Determine if conversation's response is sufficient to answer the
	    // user's question or if we
	    // should call the discovery service to obtain better answers

	    if (response.getContext().containsKey("ACTION")
	        && (response.getContext().get("ACTION").toString().indexOf("SearchWDS") != -1)) {
	      String query = response.getContext().get("SEARCH_TERM").toString();

	      // Extract the user's original query from the conversational
	      // response
	      if ((query != null) && !query.isEmpty()) {

	        // For this app, both the original conversation response and the
	        // discovery response
	        // are sent to the UI. Extract and add the conversational
	        // response to the ultimate response
	        // we will send to the user. The UI will process this response
	        // and show the top 3 retrieve
	        // and rank answers to the user in the main UI. The JSON
	        // response section of the UI will
	        // show information from the calls to both services.
	        Map<String, Object> output = response.getOutput();
	        if (output == null) {
	          output = new HashMap<String, Object>();
	          response.setOutput(output);
	        }

	        // Send the user's question to the discovery service
	        List<Document> docs = new Query().findQuery(query);

	        // Append the discovery answers to the output object that will
	        // be sent to the UI
	        output.put("SEARCH_COUNT", docs);
	      }
	    }

	    return response;
	}
	
	public String getError() {
		return ERROR;
	}
}
