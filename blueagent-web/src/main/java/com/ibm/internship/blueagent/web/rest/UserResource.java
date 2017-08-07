package com.ibm.internship.blueagent.web.rest;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.JsonObject;


@Path("user")
public class UserResource {

	
  @GET @Path("{query}") 
  @Produces(MediaType.APPLICATION_JSON) 
  public Response getQuery(@QueryParam ("query")String query/*@Context HttpServletRequest req*/ ) {
	 Query qu =new Query();
//	 qu.findQuery(query);
	  //setting discovery environment
//	  JsonObject json = new JsonObject();
//	   json.addProperty("currentUser", req.getRemoteUser());
	  return Response.status(Response.Status.OK).entity(qu.findQuery(query)).build();
  }

  @GET @Path("{text}")
  @Produces(MediaType.APPLICATION_JSON)
  public Response getConversation(@QueryParam("text")String text) {
  
	  Conversation conv =new Conversation();
	  Response object =Response.status(Response.Status.OK).entity(conv.CheckChat(text)).build();
	  return object;
	 // return Response.status(Response.Status.OK).entity(conv.CheckChat(text)).build();
}
}