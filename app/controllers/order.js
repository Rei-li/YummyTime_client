import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  notifications: Ember.inject.service(),

  actions: {
    addPortion(model) {
      const context = this;
      const account = context.get('session.account');
      const isManager = (context.get('session.account.id') === model.order.get('manager.id'));
      // const reloadedOrder = this.store.findRecord('order', model.order.id, { reload: true });

      this.store.findRecord('order', model.order.id, { reload: true }).then(function(reloadedOrder) {
        const portion = context.store.createRecord('portion', {
          text: 'text',
          cost: 0,
          owner: account,
          order: reloadedOrder,
          'portion-products': [],
          deleted: true
        });
        if (isManager) {
          portion.set('paid', true);
        }
        portion.save().then(() => {
          reloadedOrder.addPortion(portion).then(() => {
            context.get('notifications').subscribeOrderNotification(model.order.id);
            context.transitionToRoute('portion', portion.id);
          });
        });
      });
    }
  }
});
