package jsbattle.core;

import org.vertx.java.core.buffer.Buffer;
import org.vertx.java.core.http.HttpServerRequest;

/**
 * Created with IntelliJ IDEA.
 * User: k33g_org
 * Date: 4/6/13
 * Time: 7:42 PM
 * To change this template use File | Settings | File Templates.
 */
public interface CRUDController {
    /*  === CREATE PLAYER ===
            $.ajax({
                type:"POST",
                url:"/players", data:'{"firstName":"John", "lastName":"Doe"}',
                error : function(err){console.log("Erreur", err);},
                success : function(data){ console.log(data);}
            });
        */
    void create(HttpServerRequest req, Buffer buffer);

    /*  === UPDATE PLAYER ===
            $.ajax({
                type:"PUT",
                url:"/players/990e3bf1-8ff3-4423-9cb5-469fafcb21ba", data:'{"firstName":"John", "lastName":"Doe"}',
                error : function(err){console.log("Erreur", err);},
                success : function(data){ console.log(data);}
            });
        */
    void update(HttpServerRequest req, Buffer buffer);

    /* === GET PLAYER ===
            $.getJSON("users/b4afe787-6fce-44ae-9c36-2411bc5540f0", function(data){console.log(data)})
         */
    void fetch(HttpServerRequest req);

    /* === DELETE PLAYER ===
            $.ajax({url:"users/b4afe787-6fce-44ae-9c36-2411bc5540f0",type:"DELETE",success:function(data){console.log(data);}})
         */
    void delete(HttpServerRequest req);

    /* === ALL PLAYERS ===
            $.getJSON("users", function(data){console.log(data)})
         */
    void all(HttpServerRequest req);

    void query(HttpServerRequest req);
}
