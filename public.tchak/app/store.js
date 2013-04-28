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
  didFindQuery: function(store, type, json, array) {
    json = this.extractData(type, json, true);
    this._super(store, type, json, array);
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
    if (hash.data && hash.data.player) { hash.data = hash.data.player; }
    else if (hash.data && hash.data.fight) { hash.data = hash.data.fight; }
    this._super(url, method, hash);
  },

  extractData: function(type, json, plural) {
    var root = this.rootForType(type);
    var data = {};
    root = plural ? this.pluralize(root) : root;
    data[root] = json;
    return data;
  }
});

App.Adapter.registerTransform('hash', {
  deserialize: function(serialized) {
    return serialized;
  },

  serialize: function(object) {
    return object;
  }
});

App.Store = DS.Store.extend({
  revision: 12,
  adapter: App.Adapter
});
