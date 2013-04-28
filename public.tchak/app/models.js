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

  toHash: function() {
    return this.getProperties('firstName', 'lastName', 'twitter', 'framework');
  }
});

App.Fight = DS.Model.extend({
  opponentOne:        DS.attr('hash'),
  opponentOneScore:   DS.attr('number', {defaultValue: 0}),
  opponentTwo:        DS.attr('hash'),
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
