import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createOrder(vendor, account, attrs) {
      const order = this.store.createRecord('order', attrs);
      order.set('vendor', vendor);
      order.set('manager', account);
      order.set('money.required', vendor.get('minOrderCost'));
      order.save();
      this.transitionToRoute('orders');
    }
  }
});
