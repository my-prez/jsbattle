package jsbattle.models;


import jsbattle.core.Extended;
import jsbattle.core.Model;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;


@JsonIgnoreProperties(ignoreUnknown = true)
public class Player extends Extended implements Model {

    private String firstName;
    private String lastName;

    private String picture;
    private String twitter;
    private String framework;

    private Boolean ready;

    public Boolean getReady() {
        return ready;
    }

    public void setReady(Boolean ready) {
        this.ready = ready;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getFramework() {
        return framework;
    }

    public void setFramework(String framework) {
        this.framework = framework;
    }

    public String getTwitter() {
        return twitter;
    }

    public void setTwitter(String twitter) {
        this.twitter = twitter;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }


    @Override
    public String criteria() {
        return ":framework:"+this.framework+":twitter:"+this.twitter+":firstName:"+this.firstName+":lastName:"+this.lastName;
    }

    public Player(String firstName, String lastName) {
        this.lastName = lastName;
        this.firstName = firstName;
    }


    public Player() {}


}
