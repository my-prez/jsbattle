/*=== main.js ===*/

/*--- application init ---*/
App.init = function () {
	window.players = new this.Collections.Players();
	window.playersView = new this.Views.Players({collection:players})
	
	players.fetch({success:function(){
	    playersView.render();
	}})
	
	playersView.listenTo(players, "change", playersView.render);
	//playersView.listenTo(players, "save", playersView.render);
	playersView.listenTo(players, "add", playersView.render);
	playersView.listenTo(players, "destroy", playersView.render);

	window.fights = new this.Collections.Fights();
	
	window.fightsView = new this.Views.Fights({collection:fights})
	
	/*=== "linked view" ===*/
	playersView.fightsView = fightsView;
	
	fights.fetch({success:function(){
	    fightsView.render();
	}})
	
	fightsView.listenTo(fights, "change", fightsView.render);
	fightsView.listenTo(fights, "save", fightsView.render);
	fightsView.listenTo(fights, "destroy", fightsView.render);
	
}

$(function() {

	tools.loadTemplates(App.Templates, ['playersView', 'playerView', 'fightsView'], function() {
        
        App.init();
    });


    $("body").css("visibility","visible");  /*<body style="visibility:hidden">*/
});