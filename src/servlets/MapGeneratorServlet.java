package servlets;

import java.io.*;
import java.util.ArrayList;
import java.util.Hashtable;

import javax.servlet.*;
import javax.servlet.http.*;
import org.json.*;

import org.json.JSONException;

import utils.MapGenerator;

public class MapGeneratorServlet extends HttpServlet {

	private static final long serialVersionUID = -8654693808830882376L;	
	private static Hashtable<String,String> sessions = new Hashtable<String,String>() ;
	private static JSONArray currentMap = null;
	

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,
			IOException {
		doGet(request, response);
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			int mapDimension = Integer.parseInt(request.getParameter("seg"));
			int segmentDimentsion = Integer.parseInt(request.getParameter("size"));

			PrintWriter out = response.getWriter();
			
		    HttpSession session = request.getSession(true);
		    response.setContentType("text/html");
		    
 
		    if (session.isNew()) {	   	
		      MapGenerator mapgen = new MapGenerator(mapDimension, segmentDimentsion);
		      currentMap = mapgen.GenerateMap();
		    	
		      sessions.put(session.getId(),"Player"+ Integer.toString(sessions.size()) );
		      System.out.println("A player has entered the game;");		  		 
		      
		      }		      
		     
		     if (sessions.size() == 2) {
		    	  System.out.println("Generating map for both players.");	    	  
		    	  out.append(currentMap.toString());		    	  
		      } else {
		    	
		    	  out.append("Waiting for second player to join");
		    	  
		      }
			

			
		} catch (NumberFormatException e) {
			e.printStackTrace();
		} catch (JSONException e) {
			e.printStackTrace();
		}

	}
}
