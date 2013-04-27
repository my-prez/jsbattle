App.Adapter = DS.RESTAdapter.extend({
  serializer: DS.JSONSerializer,

  didFindRecord: function(store, type, json, id) {
    var root = this.rootForType(type);
    var data = {};
    data[root] = json;
    this._super(store, type, data, id);
  },
  didFindAll: function(store, type, json) {
    var root = this.pluralize(this.rootForType(type));
    var data = {};
    data[root] = json;
    this._super(store, type, data);
  },
  didFindQuery: function(store, type, json, array) {
    var root = this.pluralize(this.rootForType(type));
    var data = {};
    data[root] = json;
    this._super(store, type, data, array);
  },

  didCreateRecord: function(store, type, record, json) {
    var root = this.rootForType(type);
    var data = {};
    data[root] = json;
    this._super(store, type, record, data);
  },

  didUpdateRecord: function(store, type, record) {
    this._super(store, type, record);
  },

  didDeleteRecord: function(store, type, record) {
    this._super(store, type, record);
  },

  ajax: function(url, method, hash) {
    if (hash.data && hash.data.player) { hash.data = hash.data.player; }
    if (hash.data && hash.data.fight) { hash.data = hash.data.fight; }
    this._super(url, method, hash);
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
