package jsbattle.models;


import jsbattle.core.Extended;
import jsbattle.core.Model;

public class Round extends Extended implements Model {
    private int number=0;
    private Player opponentOne;
    private Player opponentTwo;

    private int opponentOneScore=0;
    private int opponentTwoScore=0;

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

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

    public Round(int number, Player firstOpponent, Player secondOpponent) {
        this.number = number;
        this.opponentOne = firstOpponent;
        this.opponentTwo = secondOpponent;
    }

    public Round() {
    }
}
