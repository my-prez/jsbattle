App.Models.Player = Backbone.Model.extend({
    urlRoot:"/players"
});

App.Collections.Players = Backbone.Collection.extend({
    url :"/players",
    model : App.Models.Player
});

App.Models.Fight = Backbone.Model.extend({
    urlRoot:"/fights",
    defaults : {
    	opponentOneScore : 0,
		opponentTwoScore : 0
	}
});

App.Collections.Fights = Backbone.Collection.extend({
    url :"/fights",
    model : App.Models.Fight
});