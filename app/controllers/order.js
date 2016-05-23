import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  notifications: Ember.inject.service(),

  actions: {
    addPortion(model) {
      const context = this;
      const account = context.get('session.account');
      const isManager = (context.get('session.account.id') === model.order.get('manager.id'));
      const portion = context.store.createRecord('portion', {
        text: 'text',
        cost: 0,
        owner: account,
        order: model.order,
        'portion-products': []
      });
      if (isManager) {
        portion.set('paid', true);
      }
      portion.save().then(() => {
        model.order.addPortion(portion);
        model.order.save();
        context.get('notifications').subscribeOrderNotification(model.order.id);
        context.transitionToRoute('portion', portion.id);
      });
    }
  }
});
