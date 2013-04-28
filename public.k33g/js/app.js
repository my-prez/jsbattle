
window.App = {
    Models: {},
    Collections: {},
    Routers: {},
    Views: {},
    Templates:{},

};

App.Models.Player = Backbone.Model.extend({
    urlRoot:"/players"

});

App.Models.Fight = Backbone.Model.extend({
    urlRoot:"/fights" ,

    defaults : {
        opponentOneScore : 0,
        opponentTwoScore : 0
    }

});

App.Collections.Players = Backbone.Collection.extend({
    url :"/players",
    model : App.Models.Player
});

App.Collections.Fights = Backbone.Collection.extend({
    url :"/fights",
    model : App.Models.Fight
});

App.Views.Players = Backbone.View.extend({
    el : "#players",
    initialize : function() {
        this.template = _.template(App.Templates["playersView"]); //fair un dessin/workflow de ce qu'il se passe
    },
    render : function() {

        this.$el.html(
            this.template({
                players:this.collection.toJSON()
            })
        );
    },
    events:{
        "click :checkbox" : function(event) {
            /*
             event.currentTarget.name : name of the checkbox
             event.currentTarget.checked
             event.currentTarget.id
             event.currentTarget.dataset["playerid"]
             */
            console.log(
                "click :checkbox --> ",
                event.currentTarget.dataset["playerid"],
                event.currentTarget.name,
                event.currentTarget.checked
            );

            this.addOrRemove(event.currentTarget.checked ? 1 : -1);
        },

        "click .btn-success" : function() {
            console.log("click .btn-success");

            this.fightsView.addFight(this.selectedPlayers[0], this.selectedPlayers[1])


        }
    },

    selectedPlayersCounter:0,
    selectedPlayers: [null, null],

    getSelectedPlayers : function (selectedPlayers, players) {
        $.each(
            $("input:checked"), function (id,opponent) {
                selectedPlayers[id] = players.get(opponent.dataset["playerid"]);
            }
        )
    },

    addOrRemove:function(value) {

        this.selectedPlayersCounter+=value;

        if (this.selectedPlayersCounter<2) {
            this.$(".alert").removeClass().addClass("alert alert-info").
                html("<h4>Sélectionne 2 combattants pour 1 combat</h4>");
        }


        if (this.selectedPlayersCounter==2) {

            this.getSelectedPlayers(this.selectedPlayers, this.collection);

            var message = [
                "<h4>Bravo ! 1 combat peut commencer : ",
                "@" + this.selectedPlayers[0].get("twitter") +" vs @"+ this.selectedPlayers[1].get("twitter") + " ",
                "<button class='btn btn-success'>FIGHT !</button></h4>"
            ].join("")

            this.$(".alert")
                .removeClass().addClass("alert alert-success")
                .html(message);
        }

        if (this.selectedPlayersCounter>2) {
            this.$(".alert").removeClass().addClass("alert alert-error").
                html("<h4>Hop hop hop ! On a dit un contre un !!!</h4>");
        }
    }

});


App.Views.Fights = Backbone.View.extend({
    el : "#fights",
    initialize : function() {
        this.template = _.template(App.Templates["fightsView"]);
    },
    render : function() {
        this.$el.html(
            this.template({
                fights:this.collection.toJSON()
            })
        );
    },
    addFight : function(opponent1, opponent2) {

        var fight = new App.Models.Fight({
            opponentOne : opponent1,
            opponentTwo : opponent2
        });

        this.collection.add(fight);

        fight.save({},{success: function(){

        }});


    }
});



App.init = function () {

    //App.router = new App.Routers.main();
    console.log("=== APP init ===")
    Backbone.history.start();

    window.players = new this.Collections.Players();
    window.fights = new this.Collections.Fights();

    window.playersView = new this.Views.Players({collection:players})

    window.fightsView = new this.Views.Fights({collection:fights})

    playersView.fightsView = fightsView;

    players.fetch({success:function(){
        playersView.render();
    }})

    fights.fetch({success:function(){
        fightsView.render();
    }})


    playersView.listenTo(players, "change", playersView.render);
    playersView.listenTo(players, "save", playersView.render);
    playersView.listenTo(players, "destroy", playersView.render);

    fightsView.listenTo(fights, "add", fightsView.render);
    fightsView.listenTo(fights, "change", fightsView.render);
    fightsView.listenTo(fights, "save", fightsView.render);
    fightsView.listenTo(fights, "destroy", fightsView.render);

}



$(function() {
    //TODO: utiliser router pour changer les points ?
    //TODO: afficher le total des points

    tools.loadTemplates(App.Templates, ['playersView', 'fightsView'], function() {
        App.init();
    });

    $("body").css("visibility","visible");  /*<body style="visibility:hidden">*/
});



