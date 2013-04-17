
Ember.Application.reopen({
  init: function() {
    this._super();

    this.loadTemplates();
  },

  templates: null,

  loadTemplates: function() {
    var app = this,
        templates = this.get('templates'),
        promises;

    if (templates && templates.length > 0) {
      app.deferReadiness();
    } else {
      return;
    }

    promises = templates.map(function(name) {
      return Ember.$.get('app/templates/'+name+'.hbs').then(function(data) {
        Ember.TEMPLATES[name] = Ember.Handlebars.compile(data);
      });
    });

    Ember.RSVP.all(promises).then(function() {
      app.advanceReadiness();
    });
  }
});
