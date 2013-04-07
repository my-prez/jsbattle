package jsbattle.routes;

import jsbattle.controllers.Fights;
import jsbattle.controllers.Players;
import jsbattle.controllers.Rounds;
import jsbattle.core.CRUDRoutes;
import org.vertx.java.core.Handler;
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.core.http.RouteMatcher;

public class Routes {

    public static RouteMatcher routeMatcher = new RouteMatcher();

    public static void define(final String  staticDirectory, final String defaultPage) {

        new CRUDRoutes("fights", new Fights(),routeMatcher);

        new CRUDRoutes("players", new Players(),routeMatcher);

        new CRUDRoutes("rounds", new Rounds(),routeMatcher);

        // Catch all - serve the index page
        routeMatcher.getWithRegEx(".*", new Handler<HttpServerRequest>() {
            public void handle(HttpServerRequest req) {
                if(req.uri.equals("/")) {
                    req.response.sendFile(staticDirectory+"/"+defaultPage);
                } else {
                    req.response.sendFile(staticDirectory+req.uri);
                }
                //System.out.println(req.uri);
            }
        });

    }
}
