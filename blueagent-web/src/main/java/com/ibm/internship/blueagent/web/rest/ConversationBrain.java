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
    private String workspaceId = "51915892-c414-4e62-9b33-6f6be65ebf87";

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

//	    if (response.getContext().containsKey("ACTION")
//	        && (response.getContext().get("ACTION").toString().indexOf("SearchWDS") != -1)) {
//	      String query = response.getContext().get("SEARCH_TERM").toString();
//
//	      // Extract the user's original query from the conversational
//	      // response
//	      if ((query != null) && !query.isEmpty()) {
//
//	        // For this app, both the original conversation response and the
//	        // discovery response
//	        // are sent to the UI. Extract and add the conversational
//	        // response to the ultimate response
//	        // we will send to the user. The UI will process this response
//	        // and show the top 3 retrieve
//	        // and rank answers to the user in the main UI. The JSON
//	        // response section of the UI will
//	        // show information from the calls to both services.
//	        Map<String, Object> output = response.getOutput();
//	        if (output == null) {
//	          output = new HashMap<String, Object>();
//	          response.setOutput(output);
//	        }
//	        
//	        // Send the user's question to the discovery service
//	        List<Document> docs = new Query().findQuery(query);
//	        response.getContext().put("SEARCH_COUNT",docs.size());
//	        // Append the discovery answers to the output object that will
//	        // be sent to the UI
//	        output.put("SearchResults", docs);
//	      }
//	    }

	    return response;
	}
	
	public String getError() {
		return ERROR;
	}
}
