App.Store = DS.Store.extend({
  revision: 12,
  adapter: App.Adapter
});

App.Adapter.registerTransform('hash', {
  deserialize: function(serialized) {
    return serialized;
  },

  serialize: function(object) {
    return object;
  }
});
