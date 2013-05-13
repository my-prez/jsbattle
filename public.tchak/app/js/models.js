App.Player = DS.Model.extend({
  firstName:  DS.attr('string'),
  lastName:   DS.attr('string'),
  twitter:    DS.attr('string'),
  framework:  DS.attr('string'),

  ready:      false,

  avatarUrl: function() {
    return "app/images/avatars/"+this.get('twitter')+".jpg";
  }.property('twitter'),

  twitterUrl: function() {
    return "http://twitter.com/"+this.get('twitter');
  }.property('twitter'),

  toHash: function() {
    return this.getProperties(
      'id',
      'firstName',
      'lastName',
      'twitter',
      'framework'
    );
  }
});

App.Fight = DS.Model.extend({
  opponentOne:        DS.attr('hash'),
  opponentTwo:        DS.attr('hash'),
  opponentOneScore:   DS.attr('number', {defaultValue: 0}),
  opponentTwoScore:   DS.attr('number', {defaultValue: 0}),

  opponent: function(name) {
    return Ember.Object.extend({
      fight: this,
      firstName: Em.computed.alias('fight.opponent'+name+'.firstName'),
      lastName: Em.computed.alias('fight.opponent'+name+'.lastName'),
      score: Em.computed.alias('fight.opponent'+name+'Score')
    }).create();
  },

  firstOpponent: function() {
    return this.opponent('One');
  }.property(),

  secondOpponent: function() {
    return this.opponent('Two');
  }.property()
});
