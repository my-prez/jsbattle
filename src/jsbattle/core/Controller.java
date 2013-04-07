package jsbattle.core;



import org.vertx.java.core.buffer.Buffer;
import org.vertx.java.core.http.HttpServerRequest;

import java.util.LinkedList;

public class Controller implements CRUDController {
    public  Model _model;
    /*  === CREATE PLAYER ===
        $.ajax({
            type:"POST",
            url:"/players", data:'{"firstName":"John", "lastName":"Doe"}',
            error : function(err){console.log("Erreur", err);},
            success : function(data){ console.log(data);}
        });
    */
    @Override
    public void create(HttpServerRequest req, Buffer buffer) {
        req.response.headers().put("Content-Type", "application/json; charset=UTF-8");

        System.out.println(buffer.toString());

        Model model = Json.fromJson(Json.parse(buffer.toString()), _model.getClass());

        Redis.save(model);

        if(model==null) {
            req.response.end("{}");
        } else {
            System.out.println(model.toJsonString());
            req.response.end(model.toJsonString());
        }
    }

    /*  === UPDATE PLAYER ===
        $.ajax({
            type:"PUT",
            url:"/players/990e3bf1-8ff3-4423-9cb5-469fafcb21ba", data:'{"firstName":"John", "lastName":"Doe"}',
            error : function(err){console.log("Erreur", err);},
            success : function(data){ console.log(data);}
        });
    */
    @Override
    public void update(HttpServerRequest req, Buffer buffer) {
        req.response.headers().put("Content-Type", "application/json; charset=UTF-8");

        Model model = Json.fromJson(Json.parse(buffer.toString()), _model.getClass());
        model.setId(req.params().get("id"));
        Redis.save(model);

        if(model==null) {
            req.response.end("{}");
        } else {
            System.out.println(model.toJsonString());
            req.response.end(model.toJsonString());
        }
    }
    /* === GET PLAYER ===
        $.getJSON("users/b4afe787-6fce-44ae-9c36-2411bc5540f0", function(data){console.log(data)})
     */
    @Override
    public void fetch(HttpServerRequest req) {
        req.response.headers().put("Content-Type", "application/json; charset=UTF-8");

        Model model = (Model) Redis.getById(req.params().get("id"), _model.getClass());

        if(model==null) {
            req.response.end("{}");
        } else {
            req.response.end(model.toJsonString());
        }
    }
    /* === DELETE PLAYER ===
        $.ajax({url:"users/b4afe787-6fce-44ae-9c36-2411bc5540f0",type:"DELETE",success:function(data){console.log(data);}})
     */
    @Override
    public void delete(HttpServerRequest req) {
        req.response.headers().put("Content-Type", "application/json; charset=UTF-8");

        Model model = (Model) Redis.deleteById(req.params().get("id"), _model.getClass());

        if(model==null) {
            req.response.end("{}");
        } else {
            req.response.end(model.toJsonString());
        }
    }
    /* === ALL PLAYERS ===
        $.getJSON("users", function(data){console.log(data)})
     */
    @Override
    public void all(HttpServerRequest req) {
        req.response.headers().put("Content-Type", "application/json; charset=UTF-8");

        LinkedList<Model> models =  Redis.getAll(_model.getClass());

        if(models==null) {
            req.response.end("[]");
        } else {
            req.response.end(Json.stringify(Json.toJson(models)));
        }
    }

    @Override
    public void query(HttpServerRequest req) {
        req.response.headers().put("Content-Type", "application/json; charset=UTF-8");

        LinkedList<Model> models =  Redis.getAll(_model.getClass(),req.params().get("query"));

        if(models==null) {
            req.response.end("[]");
        } else {
            req.response.end(Json.stringify(Json.toJson(models)));
        }
    }

}
