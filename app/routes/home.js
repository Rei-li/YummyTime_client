import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),


  model() {
    return Ember.RSVP.hash({
      orders: this.store.query('order', {
        filter: { simple: { manager: this.get('session').getCurrentAccountId() } }
      }, { reload: true }),
      portions: this.store.query('portion', {
        filter: { simple: { owner: this.get('session').getCurrentAccountId(),
        deleted: false, paid: false } }
      }, { reload: true })
    });
  }
});
