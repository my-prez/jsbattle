/*
- Cinématique :
    - ajouter joueurs : 1 état "prêt au combat" -> met le joueur dans un fight
    - il faut sélectionner 2 joueurs pour pouvoir faire 1 combat
    - pouvoir retirer un joueur d'un fight

*/


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
        opponentTwoScore : 0,
        opponentOneId : null,
        opponentTwoId : null
    },

    setOpponents : function (opponent1, opponent2) {
        this.set({
            opponentOneId : opponent1.id,
            opponentTwoId : opponent2.id
        }, {validate : true}); //opponents should be saved before
    },

    validate : function(attrs, options) {
        console.log("attrs", attrs,"options", options);
        if (attrs.opponentOneId === undefined || attrs.opponentTwoId === undefined) {
         return "id of opponent can't be undefined";
        }

    },

    initialize : function() {
        this.on("invalid", function(model, error) {
            console.log("Validation Error : ", error);
        });
    }



    /*
    setOpponentOne:function(opponent){
        //var currentRound = this;
        this.set({opponentOne:opponent.toJSON()})
        opponent.on("change", function(){ this.setOpponentOne(opponent)}, this)
    },

    setOpponentTwo:function(opponent){
        //var currentRound = this;
        this.set({opponentTwo:opponent.toJSON()})
        opponent.on("change", function(){ this.setOpponentTwo(opponent)}, this)
    }
    */

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

        //var content = this.template({rubrics:this.collection.toJSON()});
        //$(this.el).html(content);
        this.$el.html(
            this.template({
                players:this.collection.toJSON()
            })
        );
        //return this;
    },
    events:{
        "click :checkbox" : function(event) {
            console.log("CLICK --> ", event.currentTarget.name, event.currentTarget.checked);
            //console.log("CLICK --> ", event.currentTarget.name, event.currentTarget.checked, event);
            this.addOrRemove(event.currentTarget.checked ? 1 : -1);
            //App.Views.Players.selectedPlayers+=addOrRemove;
        }
		/*
			TODO METTRE EN MEMOIRE les joueurs sélectionnés (tableau pour pouvoir les mettre sur un ring)

			TODO: expliquer presque à chaque ligne ce que l'on fait
		*/
    },
    selectedPlayers:0,

    addOrRemove:function(value) {
        this.selectedPlayers+=value;

        //TODO : créer une liste des joueurs sélectionnés => permettra de créer le fight
        //TODO : cette liste est une propriété de la vue
        //TODO: cf remarque dans events

        console.log(this.selectedPlayers);

        if(this.selectedPlayers<2)
            this.$(".alert").removeClass().addClass("alert alert-info").
                html("<h4>Sélectionne 2 combattants pour 1 combat</h4>");

        if(this.selectedPlayers==2)
            this.$(".alert").removeClass().addClass("alert alert-success").
                html("<h4>Bravo ! 1 combat peut commencer</h4>");

        if(this.selectedPlayers>2) this.$(".alert").removeClass().addClass("alert alert-error").
            html("<h4>Hop hop hop ! On a dit un contre un !!!</h4>");

    }

});


App.init = function(){
        //App.router = new App.Routers.main();
        console.log("=== APP init ===")
        Backbone.history.start();

        //TODO : twitter account vs image name

        /*
        window.k33g = new this.Models.Player({
            firstName:"Philippe",
            lastName:"Charrière",
            twitter : "k33g_org",
            framework:"Backbone",
            picture:"k33g_org"

        });

        window.sebmade = new this.Models.Player({
            firstName:"Sébastien",
            lastName:"Letélié",
            twitter : "sebmade",
            framework:"Angular",
            picture:"sebmade"
        });

        window.tchak13 = new this.Models.Player({
            firstName:"Paul",
            lastName:"Chavar",
            twitter : "tchak13",
            framework:"Ember",
            picture:"tchak13"
        });
        */




        //window.players = new this.Collections.Players([ sebmade, tchak13, k33g]);

        window.players = new this.Collections.Players();

        window.playersView = new this.Views.Players({collection:players})

        players.fetch({success:function(){
            playersView.render();
        }})




        //players.on("change",function(){playersView.render()});
		
		playersView.listenTo(players, "change", playersView.render)
		

    }



$(function() {


    tools.loadTemplates(App.Templates, ['playersView', 'fightsView', 'header', 'main'], function() {
        App.init();
    });

    $("body").css("visibility","visible");  /*<body style="visibility:hidden">*/
});



