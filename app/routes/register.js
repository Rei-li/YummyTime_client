import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      companies: this.store.findAll('company')
    });
  }
});
