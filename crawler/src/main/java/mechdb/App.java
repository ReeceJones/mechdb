package mechdb;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.URI;
import java.lang.Runtime;


import javax.ws.rs.core.UriBuilder;
import javax.ws.rs.ext.RuntimeDelegate;

import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

public class App {
    public static void main(String[] args) throws IOException, InterruptedException {
        final HttpServer server = HttpServer.create(new InetSocketAddress(getBaseURI().getPort()), 0);
        Runtime.getRuntime().addShutdownHook(new Thread(new Runnable() {
            @Override
            public void run() {
                server.stop(0);
            }
        }));

        // create a handler wrapping the JAX-RS application
        HttpHandler handler = RuntimeDelegate.getInstance().createEndpoint(new Crawler(), HttpHandler.class);

        // map JAX-RS handler to the server root
        server.createContext(getBaseURI().getPath(), handler);

        // start the server
        server.start();
        System.out.println("Price Crawler Started");

        Thread.currentThread().join();
    }
    
    public static URI getBaseURI() {
        return UriBuilder.fromUri("http://localhost/").port(3000).build();
    }
}
