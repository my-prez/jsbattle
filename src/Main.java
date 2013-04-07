
import jsbattle.core.Redis;
import jsbattle.routes.Routes;
import org.vertx.java.core.Vertx;
import redis.clients.jedis.Jedis;

public class Main {

    public static void main(String[] args) {
        String httpHost = "localhost";
        String redisHost = "localhost";
        Integer httpPort = 8080;
        Integer redisPort = 6379;
        String staticAssets = "public";
        String defaultPage = "index.html";


        if(args.length > 0) {
            httpHost = args[0];
            httpPort = Integer.parseInt(args[1]);
            redisHost = args[2];
            redisPort = Integer.parseInt(args[3]);
            staticAssets = args[4];
            defaultPage = args[5];
        }

        //System.out.println(redisHost);
        //System.out.println(redisPort);

        try {
            Redis.jedis = new Jedis(redisHost, redisPort);
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }


        Vertx vertx = Vertx.newVertx(httpHost);

        Routes.define(staticAssets, defaultPage);

        vertx.createHttpServer().requestHandler(Routes.routeMatcher).listen(httpPort);

    }
}
