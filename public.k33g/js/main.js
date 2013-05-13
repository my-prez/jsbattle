/*=== main.js ===*/

/*--- application init ---*/
App.init = function () {

}

$(function() {

	tools.loadTemplates(App.Templates, ['playersView', 'playerView', 'fightsView'], function() {
        
        App.init();
    });


    $("body").css("visibility","visible");  /*<body style="visibility:hidden">*/
});