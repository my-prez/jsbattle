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
  }.property('twitter')
});
