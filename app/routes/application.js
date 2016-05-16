import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import BodyClassMixin from 'ember-body-class/mixins/body-class';

export default Ember.Route.extend(ApplicationRouteMixin, BodyClassMixin, {
  session: Ember.inject.service(),
  notifications: Ember.inject.service(),

  beforeModel() {
    this.get('session').loadCurrentAccount();
    this.get('notifications').subscribeNotifications();
  },

  renderTemplate() {
    // Render the application template
    this.render('application');

    // Setup resize listener on the window object that will be called when
    // window resizes
    Ember.$(window).on('resize.removeOpenClass', () => {
      this.controllerFor('application').set('open', false);
    });
  }
});
