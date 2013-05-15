
Ember.Application.reopen({
  loadTemplates: function(templates) {
    var app = this;

    app.deferReadiness();

    var promises = templates.map(function(name) {
      return Ember.$.get('app/templates/'+name+'.hbs').then(function(data) {
        Ember.TEMPLATES[name] = Ember.Handlebars.compile(data);
      });
    });

    Ember.RSVP.all(promises).then(function() {
      app.advanceReadiness();
    });
  }
});
