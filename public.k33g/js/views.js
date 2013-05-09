/*=== VUE PLAYER ===*/

App.Views.Player = Backbone.View.extend({
    initialize : function() {
        /* "compilation" du template */
        this.template = _.template(App.Templates["playerView"]); 
    },
    render : function() {
        this.$el.html(
            this.template({
                player:this.model.toJSON()
            })
        );
        return this;
    },
    events:{
        "click :checkbox" : function(event) {
            this.model.set({
                ready:event.currentTarget.checked
            });
            this.parentView.checkSelectedPlayers();            
        }
        
    }
})


/*=== VUE PLAYERS ===*/
App.Views.Players = Backbone.View.extend({
    el : "[name='players']", /* div */
    initialize : function() {
        /* "compilation" du template */
        this.template = _.template(App.Templates["playersView"]); 
    },
    appendSubViews : function(currentView) {
        
        this.collection.each(function(player) {
            var subView = new App.Views.Player({
                model : player
            });
            subView.parentView = currentView;            
            currentView.$(".thumbnails").append(subView.render().el);
        })
    },
    render : function() {
        
        this.$el.html(this.template({}));
        this.appendSubViews(this);
        //this.checkSelectedPlayers();
    },

    selectedPlayers:null,

    checkSelectedPlayers:function() {

        this.selectedPlayers = this
            .collection
            .filter(function(player){ return player.get("ready") == true; })
        
        var selectedPlayersCounter = this.selectedPlayers.length;
    
        if (selectedPlayersCounter<2) {
            this.$(".alert").removeClass().addClass("alert alert-info").
                html("<h4>Sélectionne 2 combattants pour 1 combat</h4>");
        }
    
        if (selectedPlayersCounter==2) {
        
            var message = [
                "<h4>Bravo ! 1 combat peut commencer : ",
                "@" + this.selectedPlayers[0].get("twitter") +" vs @"+ this.selectedPlayers[1].get("twitter") + " ",
                "<button class='btn btn-success'>FIGHT !</button></h4>"
            ].join("")
    
            this.$(".alert")
                .removeClass().addClass("alert alert-success")
                .html(message);
        }
    
        if (selectedPlayersCounter>2) {
            this.$(".alert").removeClass().addClass("alert alert-error").
                html("<h4>Hop hop hop ! On a dit un contre un !!!</h4>");
        }
    },
    events:{
        "click .btn-success" : function() {
            this.fightsView.addFight(this.selectedPlayers[0], this.selectedPlayers[1])
        }        
    }
    

});

/*=== VUE FIGHTS ===*/
App.Views.Fights = Backbone.View.extend({
    el : "[name='fights']",
    initialize : function() {
        this.template = _.template(App.Templates["fightsView"]); 
    },
    render : function() {

        this.$el.html(
            this.template({
                fights:this.collection.toJSON(),
                scores:this.computeScores()
            })
        );
    },
    addFight : function(opponent1, opponent2) {
    
        var fight = new App.Models.Fight({
            opponentOne : opponent1,
            opponentTwo : opponent2
        });
    
        this.collection.add(fight);
    
        fight.save({},{success: function(){}});
    
    
    },
    computeScores : function() {
        var scores = {BACKBONE:0, ANGULAR:0, EMBER:0};
    
        this.collection.each(function(fight) {
    
            scores[fight.get("opponentOne").framework.toUpperCase()] += fight.get("opponentOneScore");
            scores[fight.get("opponentTwo").framework.toUpperCase()] += fight.get("opponentTwoScore");
            
        })
    
        return scores;
    },
    setScores : function(fightIndex, score1, score2) {
        this.collection.at(fightIndex).set("opponentOneScore", score1);
        this.collection.at(fightIndex).set("opponentTwoScore", score2);
    }

});



