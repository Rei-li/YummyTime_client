import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      order: this.store.findRecord('order', params.order_id),
      portions: this.store.query('portion', {
        filter: { simple: { order: params.order_id, deleted: false } }
      })
    });
  }
});
