App.Adapter = DS.RESTAdapter.extend({
  serializer: DS.JSONSerializer,

  didFindRecord: function(store, type, json, id) {
    json = this.extractData(type, json);
    this._super(store, type, json, id);
  },
  didFindAll: function(store, type, json) {
    json = this.extractData(type, json, true);
    this._super(store, type, json);
  },

  didCreateRecord: function(store, type, record, json) {
    json = this.extractData(type, json);
    this._super(store, type, record, json);
  },
  didUpdateRecord: function(store, type, record) {
    this._super(store, type, record);
  },
  didDeleteRecord: function(store, type, record) {
    this._super(store, type, record);
  },

  ajax: function(url, method, hash) {
    if (hash && hash.data) {
      if (hash.data.player) { hash.data = hash.data.player; }
      else if (hash.data.fight) { hash.data = hash.data.fight; }
    }
    return this._super(url, method, hash);
  },

  extractData: function(type, json, plural) {
    var root = this.rootForType(type);
    var data = {};
    root = plural ? this.pluralize(root) : root;
    data[root] = json;
    return data;
  }
});
