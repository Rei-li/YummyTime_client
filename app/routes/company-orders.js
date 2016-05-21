import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.query('order', {
      filter: { simple: { company: params.id } }
    });
  }
});
