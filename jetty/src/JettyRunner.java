import org.mortbay.jetty.Server;
import org.mortbay.jetty.webapp.WebAppContext;

public class JettyRunner {

	public static void main(String[] args) throws Exception {
		Server server = new Server(8080);

		WebAppContext context = new WebAppContext();
		context.setDescriptor("www/WEB-INF/web.xml");
		context.setResourceBase("www/");
		context.setContextPath("/Commando");
		context.setParentLoaderPriority(true);

		server.setHandler(context);

		server.start();
		server.join();
	}
}