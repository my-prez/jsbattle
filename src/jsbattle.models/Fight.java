package jsbattle.models;

import jsbattle.core.Extended;
import jsbattle.core.Model;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Fight  extends Extended implements Model {

    private String name;

    private Player opponentOne;
    private Player opponentTwo;

    private int opponentOneScore=0;
    private int opponentTwoScore=0;

    public Player getOpponentOne() {
        return opponentOne;
    }

    public void setOpponentOne(Player opponentOne) {
        this.opponentOne = opponentOne;
    }

    public Player getOpponentTwo() {
        return opponentTwo;
    }

    public void setOpponentTwo(Player opponentTwo) {
        this.opponentTwo = opponentTwo;
    }

    public int getOpponentOneScore() {
        return opponentOneScore;
    }

    public void setOpponentOneScore(int opponentOneScore) {
        this.opponentOneScore = opponentOneScore;
    }

    public int getOpponentTwoScore() {
        return opponentTwoScore;
    }

    public void setOpponentTwoScore(int opponentTwoScore) {
        this.opponentTwoScore = opponentTwoScore;
    }

/*private Round[] rounds;

    public Round[] getRounds() {
        return rounds;
    }

    public void setRounds(Round[] rounds) {
        this.rounds = rounds;
    }*/

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Fight(String name, Player opponentOne, Player opponentTwo) {
        this.name = name;
        this.opponentOne = opponentOne;
        this.opponentTwo = opponentTwo;
        this.opponentOneScore = 0;
        this.opponentTwoScore = 0;
    }

    public Fight(String name, Player opponentOne, int opponentOneScore, Player opponentTwo, int opponentTwoScore) {
        this.name = name;
        this.opponentOne = opponentOne;
        this.opponentTwo = opponentTwo;
        this.opponentOneScore = opponentOneScore;
        this.opponentTwoScore = opponentTwoScore;
    }

    @Override
    public String criteria() {
        return ":name:"+this.name;
    }

    public Fight() {
    }


}
