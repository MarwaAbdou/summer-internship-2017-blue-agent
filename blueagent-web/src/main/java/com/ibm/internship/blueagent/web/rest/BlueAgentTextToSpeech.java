package com.ibm.internship.blueagent.web.rest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

import com.ibm.watson.developer_cloud.discovery.v1.model.environment.Environment;
import com.ibm.watson.developer_cloud.text_to_speech.v1.TextToSpeech;
import com.ibm.watson.developer_cloud.text_to_speech.v1.model.AudioFormat;
import com.ibm.watson.developer_cloud.text_to_speech.v1.model.Voice;
import com.ibm.watson.developer_cloud.text_to_speech.v1.util.WaveUtils;

public class BlueAgentTextToSpeech {
	 private String username = "76f4e9e8-9a51-41d8-8f91-47138452206b";
	private String password = "aaMQddZLzFoi";
//	private String url ="https://stream.watsonplatform.net/text-to-speech/api";
	TextToSpeech service = new TextToSpeech();
	
	public void setEnviroment() {
//	service.setEndPoint(url);
	service.setUsernameAndPassword(username,password);
	}

	public void convertSpeech(String text) {
		setEnviroment();
	try {
	  
	  InputStream stream = service.synthesize(text, Voice.EN_ALLISON,AudioFormat.WAV).execute();
	  InputStream in = WaveUtils.reWriteWaveHeader(stream);
	  File voice=new File("D:/blue agent/voice.wav");
	  voice.createNewFile();
	  OutputStream out = new FileOutputStream(voice);
	  byte[] buffer = new byte[1024];
	  int length;
	  while ((length = in.read(buffer)) > 0) {
	    out.write(buffer, 0, length);
	  }
	  out.close();
	  in.close();
	  stream.close();
	}
	catch (Exception e) {
	  e.printStackTrace();
	}
	
	
	}
	
	
}

