package com.ibm.internship.blueagent.web.rest;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

import com.google.gson.Gson;
import com.ibm.watson.developer_cloud.conversation.v1.model.MessageRequest;
import com.ibm.watson.developer_cloud.conversation.v1.model.MessageResponse;
import com.ibm.watson.developer_cloud.service.exception.UnauthorizedException;


@Path("services")
public class Services {

  @GET @Path("discovery") 
  @Produces(MediaType.APPLICATION_JSON) 
  public Response getQuery(@QueryParam ("query")String query) {
	 Query qu = new Query();
	 return Response.status(Response.Status.OK).entity(qu.findQuery(query)).build();
  }

  @POST @Path("conversation")
  @Produces(MediaType.APPLICATION_JSON)
  @Consumes(MediaType.APPLICATION_JSON)
  public Response getConversation(InputStream body) {
	
	HashMap<String, Object> errorsOutput = new HashMap<String, Object>();
	ConversationBrain conv = new ConversationBrain();
	MessageRequest request = conv.buildMessageFromPayload(body);
	if (request == null) {
		throw new IllegalArgumentException("NO REQUEST");
	}
	MessageResponse response = null;
	try {
	      response = conv.getWatsonResponse(request);

	    } catch (Exception e) {
	      if (e instanceof UnauthorizedException) {
	        errorsOutput.put(conv.getError(),"INVALID CONVERSATION CREDS");
	      } else if (e instanceof IllegalArgumentException) {
	        errorsOutput.put(conv.getError(), e.getMessage());
	      } else if (e instanceof MalformedURLException) {
	        errorsOutput.put(conv.getError(), "MALFORMED URL");
	      } else if (e.getMessage().contains("URL workspaceid parameter is not a valid GUID.")) {
	        errorsOutput.put(conv.getError(), "INVALID WORKSPACEID");
	      } else {
	        errorsOutput.put(conv.getError(), "GENERIC ERROR");
	      }

	      return Response.ok(new Gson().toJson(errorsOutput, HashMap.class)).type(MediaType.APPLICATION_JSON).build();
	    }
	    return Response.ok(new Gson().toJson(response, MessageResponse.class)).type(MediaType.APPLICATION_JSON).build();
	 
  }
}
