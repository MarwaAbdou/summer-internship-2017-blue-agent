package com.ibm.internship.blueagent.web.rest;

import com.ibm.watson.developer_cloud.conversation.v1.ConversationService;
import com.ibm.watson.developer_cloud.conversation.v1.model.MessageRequest;
import com.ibm.watson.developer_cloud.conversation.v1.model.MessageResponse;

public class Conversation {

	
	public MessageResponse CheckChat (String text) {
		
		//setting conversation environment.
		
		ConversationService service = new ConversationService("7/25/2017");
		service.setEndPoint("https://gateway.watsonplatform.net/conversation/api");
		service.setUsernameAndPassword("b70cdcad-91cd-4a6a-8089-98b24ce6d053", "gNL1hmi5CWTF");
		
		
		//send message to conversation
		MessageRequest newMessage = new MessageRequest.Builder().inputText("text: "+text).build();
				String workspaceId = "de7eb1fe-1140-4309-a2e3-c83636b1cf20";
		MessageResponse response = service.message(workspaceId, newMessage).execute();
						System.out.println(response);
		return response;
	}
}
