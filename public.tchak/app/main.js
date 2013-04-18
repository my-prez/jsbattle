
window.App = Ember.Application.create({
  templates: [
    'application',
    'index',
    'add_player',
    'opponent'
  ]
});

App.Router.map(function() {
  this.route('addPlayer');
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
        opponentOne: players.objectAt(0),
        opponentTwo: players.objectAt(1)
      }).save();
    }
  }
});
App.IndexController = Ember.Controller.extend({
  players: function() {
    return App.Player.find();
  }.property(),

  selectedPlayers: function() {
    return this.get('players').filterProperty('isReady');
  }.property('players.@each.isReady'),

  fights: function() {
    return App.Fight.find();
  }.property(),

  readyToFight: Em.computed.gte('selectedPlayers.length', 2)
});

App.AddPlayerRoute = Ember.Route.extend({
  model: function() {
    return App.Player.createRecord();
  },
  deactivate: function() {
    Ember.run.next(this.get('controller'), function() {
      if (!this.get('isSaving')) {
        this.get('transaction').rollback();
      }
    });
  }
});
App.AddPlayerController = Ember.ObjectController.extend({
  save: function() {
    this.get('content').save();
    this.transitionToRoute('index');
  }
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
