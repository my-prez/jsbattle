App.Models.Player = Backbone.Model.extend({
    urlRoot:"/players"
});

App.Collections.Players = Backbone.Collection.extend({
    url :"/players",
    model : App.Models.Player
});