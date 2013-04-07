package jsbattle.core;


public class Extended {
    private String id;
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    public String toJsonString() {
        return Json.stringify(Json.toJson(this));
    }

    public String criteria() {
        return "";
    }
}
