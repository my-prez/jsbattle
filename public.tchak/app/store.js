App.Adapter = DS.BasicAdapter.extend({
  findAll: function(store, type) {
    this.findQuery(store, type, {}, {load: function() {}});
  }
});

App.Adapter.map('App.Fight', {
  opponentOne: { embedded: 'always' },
  opponentTwo: { embedded: 'always' }
});

DS.Model.reopen({
  toJSON: function(options) {
    return this.serialize(options);
  }
});

App.Store = DS.Store.extend({
  revision: 12,
  adapter: App.Adapter
});

App.Sync = Ember.Object.extend({
  url: null,
  buildUrl: function(id) {
    return ['', this.url, id].compact().join('/');
  },
  query: function(query, process) {
    var url = this.buildUrl();

    $.getJSON(url, function(data) {
      process(data).load();
    });
  },
  createRecord: function(record, process) {
    var url = this.buildUrl();

    process(record).save(function(data, process) {
      $.ajax(url, {
        method: 'POST',
        data: JSON.stringify(data),
        success: function(data) {
          process(data).done();
        }
      });
    });
  },
  updateRecord: function(record, process) {
    var url = this.buildUrl(record.get('id'));

    process(record).save(function(data, done) {
      $.ajax(url, {
        method: 'PUT',
        data: JSON.stringify(data),
        success: function() { done(); }
      });
    });
  },
  deleteRecord: function(record, process) {
    var url = this.buildUrl(record.get('id'));

    process(record).save(function(data, done) {
      $.ajax(url, {method: 'DELETE'}).then(function() { done(); });
    });
  }
});
