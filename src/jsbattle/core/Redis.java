package jsbattle.core;


import java.util.LinkedList;
import java.util.Set;
import java.util.UUID;
import redis.clients.jedis.Jedis;



public class Redis {

    public static Jedis jedis;

    private static void set(String key, String value) {
        jedis.set(key, value);
    }

    private static String get(String key) {
        return jedis.get(key);
    }

    private static void delete(String key) {
        jedis.del(key);
    }

    private static Set<String> keys(String queryKey) {
        return jedis.keys(queryKey);
    }

    private static Model getByKey(String key, Class klass) {
        Model returnModel=null;
        try{
            String json = Redis.get(key);
            returnModel = (Model)Json.fromJson(Json.parse(json),klass);

        }catch(Exception e){
            System.out.println(e.getMessage());
        }finally {
            return returnModel;
        }
    }

    public static Model getById(String id, Class klass) {
        System.out.println("--> getbyid "+klass.getSimpleName()+" id : "+id);
        Model returnModel=null;
        try{
            Set<String> allkeys = Redis.keys(klass.getSimpleName()+"*:id:"+id);
            if(allkeys.size()>0) {
                String json = Redis.get(allkeys.iterator().next());
                System.out.println(json);
                returnModel = (Model) Json.fromJson(Json.parse(json), klass);
            }

        }catch(Exception e){
            System.out.println(e.getMessage());
        }finally {
            return returnModel;
        }
    }

    public static Model deleteById(String id, Class klass) {
        System.out.println("--> delete "+klass.getSimpleName()+" id : "+id);
        Model returnModel=null;
        try{
            Set<String> allkeys = Redis.keys(klass.getSimpleName()+"*:id:"+id);
            if(allkeys.size()>0) {
                String redisKey = allkeys.iterator().next();
                String json = Redis.get(redisKey);
                System.out.println(json);
                returnModel = (Model) Json.fromJson(Json.parse(json), klass);

                Redis.delete(redisKey);
            }

        }catch(Exception e){
            System.out.println(e.getMessage());
        }finally {
            return returnModel;
        }
    }

    public static LinkedList<Model> getAll(Class klass) {
        System.out.println("--> getall "+klass.getSimpleName()+"s");
        LinkedList<Model> models = new LinkedList<Model>();
        try{

            Set<String> allkeys = Redis.keys(klass.getSimpleName()+":*");

            if(allkeys.size()>0) {
                for(String s : allkeys) {
                    String json = Redis.get(s);
                    models.add((Model)Json.fromJson(Json.parse(json),klass));
                }
            } else {
                models = null;
            }

        }catch(Exception e){
            System.out.println(e.getMessage());
        }finally {
            return models;
        }
    }

    public static LinkedList<Model> getAll(Class klass, String query) {
        System.out.println("--> getsome "+klass.getSimpleName()+"s, query : "+query);
        LinkedList<Model> models = new LinkedList<Model>();
        try{

            Set<String> allkeys = Redis.keys(klass.getSimpleName()+query);

            if(allkeys.size()>0) {
                for(String s : allkeys) {
                    String json = Redis.get(s);
                    models.add((Model)Json.fromJson(Json.parse(json),klass));
                }
            } else {
                models = null;
            }

        }catch(Exception e){
            System.out.println(e.getMessage());
        }finally {
            return models;
        }
    }


    public static String save(Model model) {
        String key = null;
        String json = null;

        if(model.getId()==null) {
            model.setId(UUID.randomUUID().toString());
            System.out.println("--> create "+model.getClass().getSimpleName()+" : "+model.getId());
        } else {
            //remove and replace : it's bad i know
            deleteById(model.getId(), model.getClass());
            System.out.println("--> update "+model.getClass().getSimpleName()+" : "+model.getId());
        }

        key = model.getClass().getSimpleName()+ model.criteria()+":id:"+model.getId();
        json = Json.stringify(Json.toJson(model));

        try{
            Redis.set(key,json);
        }catch(Exception e){
            System.out.println(e.getMessage());
        }finally {
            return model.getId();
        }
    }


}






