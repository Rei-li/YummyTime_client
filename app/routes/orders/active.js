import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.store.query('order', {
      filter: { simple: { active: true, company: params.id } }
    });
  },

  renderTemplate(controller, model) {
    this.render('orders.index', { model });
  }
});
