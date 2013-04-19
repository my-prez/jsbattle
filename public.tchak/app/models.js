App.Player = DS.Model.extend({
  firstName:  DS.attr('string'),
  lastName:   DS.attr('string'),
  twitter:    DS.attr('string'),
  framework:  DS.attr('string'),
  ready:      DS.attr('boolean', {defaultValue: false}),

  isReady:    Ember.computed.alias('ready'),

  isReadyDidChange: function() {
    if (this.get('isDirty')) { this.save(); }
  }.observes('isReady'),

  fights: function() {
    var player = this;
    return App.Fight.filter(function(fight) {
      return fight.get('opponentOne') === player ||
        fight.get('opponentTwo') === player;
    });
  }.property(),

  save: function() {
    this.get('fights').invoke('save');
    this._super();
  }
});

App.Fight = DS.Model.extend({
  opponentOne:        DS.belongsTo('App.Player'),
  opponentOneScore:   DS.attr('number', {defaultValue: 0}),
  opponentTwo:        DS.belongsTo('App.Player'),
  opponentTwoScore:   DS.attr('number', {defaultValue: 0}),

  buildOpponent: function(name) {
    return Ember.Object.extend({
      firstName: Em.computed.alias('fight.opponent'+name+'.firstName'),
      lastName: Em.computed.alias('fight.opponent'+name+'.lastName'),
      score: Em.computed.alias('fight.opponent'+name+'Score')
    });
  },

  firstOpponent: function() {
    return this.buildOpponent('One')
      .create({fight: this});
  }.property(),

  secondOpponent: function() {
    return this.buildOpponent('Two')
      .create({fight: this});
  }.property()
});

App.loadFight = function(process, data) {
  return process(data).munge(function(data, process) {
    process(data.opponentOne, App.Player).load();
    process(data.opponentTwo, App.Player).load();
    data.opponentOne = data.opponentOne.id;
    data.opponentTwo = data.opponentTwo.id;
  });
};

App.Player.sync = App.Sync.create({
  url: 'players'
});
App.Fight.sync = App.Sync.create({
  url: 'fights',
  query: function(query, process) {
    var url = this.buildUrl();

    $.getJSON(url, function(data) {
      App.loadFight(process, data).load();
    });
  },
  createRecord: function(record, process) {
    var url = this.buildUrl();

    process(record).save(function(data, process) {
      $.ajax(url, {
        method: 'POST',
        data: JSON.stringify(data),
        success: function(data) {
          App.loadFight(process, data).done();
        }
      });
    });
  }
});
