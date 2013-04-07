package jsbattle.models;

import jsbattle.core.Extended;
import jsbattle.core.Model;

public class Fight  extends Extended implements Model {

    private String name;

    private Round[] rounds;

    public Round[] getRounds() {
        return rounds;
    }

    public void setRounds(Round[] rounds) {
        this.rounds = rounds;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String criteria() {
        return ":name:"+this.name;
    }

    public Fight() {
    }
}
