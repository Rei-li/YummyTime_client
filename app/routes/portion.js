import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return Ember.RSVP.hash({
      portion: this.store.findRecord('portion', params.portion_id),
      products: this.store.findAll('product')
    });
  }
});
