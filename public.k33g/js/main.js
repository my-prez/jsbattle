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
}

$(function() {

	tools.loadTemplates(App.Templates, ['playersView', 'playerView', 'fightsView'], function() {
        
        App.init();
    });


    $("body").css("visibility","visible");  /*<body style="visibility:hidden">*/
});