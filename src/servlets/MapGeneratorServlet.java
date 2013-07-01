package servlets;

import java.io.*;

import javax.servlet.*;
import javax.servlet.http.*;

import org.json.JSONException;

import utils.MapGenerator;

public class MapGeneratorServlet extends HttpServlet {

	private static final long serialVersionUID = -8654693808830882376L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,
			IOException {
		doGet(request, response);
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			int mapDimension = Integer.parseInt(request.getParameter("seg"));
			int segmentDimentsion = Integer.parseInt(request.getParameter("size"));

			PrintWriter out = response.getWriter();

			MapGenerator mapgen = new MapGenerator(mapDimension, segmentDimentsion);
			out.append(mapgen.GenerateMap().toString());
		} catch (NumberFormatException e) {
			e.printStackTrace();
		} catch (JSONException e) {
			e.printStackTrace();
		}

	}
}
