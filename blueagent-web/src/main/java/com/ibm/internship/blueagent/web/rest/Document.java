package com.ibm.internship.blueagent.web.rest;
import java.lang.*;
public class Document {
	
	private String body;
	
	public Document(String body/* String ID*/) {
	
		this.body=body;
//		this.ID =ID;
		
	}
	
	public Document() {
		
		
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	
}
