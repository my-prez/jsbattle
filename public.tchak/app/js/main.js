
window.App = Ember.Application.create({
  templates: [
    'application',
    'index',
    'player',
    'player/index',
    'player/edit',
    'player/_form',
    'opponent'
  ]
});

App.Router.map(function() {
  this.resource('player', function() {
    this.route('edit', {path: ':player_id'});
  });
  this.route('fight');
});

App.IndexRoute = Ember.Route.extend({
  events: {
    removePlayer: function(player) {
      player.deleteRecord();
      player.save();
    },
    removeFight: function(fight) {
      fight.deleteRecord();
      fight.save();
    },
    createFight: function() {
      var players = this.controllerFor('index').get('selectedPlayers');

      App.Fight.createRecord({
        opponentOne: players.objectAt(0).toHash(),
        opponentTwo: players.objectAt(1).toHash()
      }).save();
    }
  }
});

App.IndexController = Ember.Controller.extend({
  players: function() {
    return App.Player.find();
  }.property(),

  fights: function() {
    return App.Fight.find();
  }.property(),

  selectedPlayers: function() {
    return this.get('players').filterProperty('ready');
  }.property('players.@each.ready'),

  readyToFight: Em.computed.equal('selectedPlayers.length', 2)
});

App.OpponentController = Ember.ObjectController.extend({
  isZero: Em.computed.equal('score', 0),
  incrementScore: function() {
    this.incrementProperty('score');
    this.get('fight').save();
  },
  decrementScore: function() {
    this.decrementProperty('score');
    this.get('fight').save();
  }
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
