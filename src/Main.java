
import jsbattle.core.Redis;
import jsbattle.routes.Routes;
import org.vertx.java.core.Vertx;
import redis.clients.jedis.Jedis;

public class Main {

    public static void main(String[] args) {
        String httpHost = "localhost";
        int clusterConnectionPort = 8081;
        String redisHost = "localhost";
        int httpPort = 8080;
        int redisPort = 6379;
        String staticAssets = "public";
        String defaultPage = "index.html";


        if(args.length > 0) {
            httpHost = args[0];
            clusterConnectionPort = Integer.parseInt(args[1]);
            httpPort = Integer.parseInt(args[2]);
            redisHost = args[3];
            redisPort = Integer.parseInt(args[4]);
            staticAssets = args[5];
            defaultPage = args[6];
        }

        //System.out.println(redisHost);
        //System.out.println(redisPort);

        try {
            Redis.jedis = new Jedis(redisHost, redisPort);
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }


        Vertx vertx = Vertx.newVertx(clusterConnectionPort, httpHost);

        Routes.define(staticAssets, defaultPage);

        vertx.createHttpServer().requestHandler(Routes.routeMatcher).listen(httpPort);

    }
}
