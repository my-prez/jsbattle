
window.App = Ember.Application.create({
  templates: [
    'application',
    'index',
    '_players',
    'player',
    'player/index',
    'player/edit',
    'player/_form'
  ]
});

App.Router.map(function() {
  this.resource('player', function() {
    this.route('edit', {path: ':player_id'});
  });
});

App.IndexRoute = Ember.Route.extend({
  events: {
    removePlayer: function(player) {
      player.deleteRecord();
      player.save();
    }
  }
});

App.IndexController = Ember.Controller.extend({
  players: function() {
    return App.Player.find();
  }.property()
});

App.PlayerEditRoute = Ember.Route.extend({
  events: {
    cancel: function() {
      this.get('controller.transaction').rollback();
      this.transitionTo('index');
    },
    save: function() {
      this.get('controller.model').save();
      this.transitionTo('index');
    }
  }
});

App.PlayerIndexRoute = App.PlayerEditRoute.extend({
  model: function() {
    return App.Player.createRecord();
  }
});
