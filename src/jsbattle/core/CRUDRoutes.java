package jsbattle.core;



import org.vertx.java.core.Handler;
import org.vertx.java.core.buffer.Buffer;
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.core.http.RouteMatcher;

public class CRUDRoutes {

    public CRUDRoutes(String baseURI, final CRUDController controller, RouteMatcher routeMatcher) {
        //=== CREATE ===
        routeMatcher.post("/"+baseURI, new Handler<HttpServerRequest>() {
            public void handle(final HttpServerRequest req) {
                req.dataHandler(new Handler<Buffer>() {
                    public void handle(Buffer buffer) {
                        controller.create(req, buffer);
                    }
                });
            }
        });

        //=== UPDATE ===
        routeMatcher.put("/"+baseURI+"/:id", new Handler<HttpServerRequest>() {
            public void handle(final HttpServerRequest req) {
                req.dataHandler(new Handler<Buffer>() {
                    public void handle(Buffer buffer) {
                        controller.update(req, buffer);
                    }
                });
            }
        });

        //=== GET BY ID ===
        routeMatcher.get("/"+baseURI+"/:id", new Handler<HttpServerRequest>() {
            public void handle(HttpServerRequest req) {
                controller.fetch(req);
            }
        });

        //=== DELETE ===
        routeMatcher.delete("/"+baseURI+"/:id", new Handler<HttpServerRequest>() {
            public void handle(HttpServerRequest req) {
                controller.delete(req);
            }
        });

        //=== GET ALL ===
        routeMatcher.get("/"+baseURI, new Handler<HttpServerRequest>() {
            public void handle(HttpServerRequest req) {
                controller.all(req);
            }
        });

        //=== GET ALL : QUERY ===
        routeMatcher.get("/query/"+baseURI+"/:query", new Handler<HttpServerRequest>() {
            public void handle(HttpServerRequest req) {
                controller.query(req);
            }
        });
    }
}
