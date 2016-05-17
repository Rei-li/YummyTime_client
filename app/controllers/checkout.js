import Ember from 'ember';

export default Ember.Controller.extend({
  notifications: Ember.inject.service(),

  actions: {
    send(data, order) {
      this.get('notifications').sendOrderNotification(data.message, order.id);
    }
  }
});
