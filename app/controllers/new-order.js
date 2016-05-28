import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createOrder(vendor, account, company, attrs) {
      const order = this.store.createRecord('order', attrs);
      order.set('vendor', vendor);
      order.set('manager', account);
      order.set('company', company);
      order.set('sum', 0);
      order.set('date', new Date());
      order.save();
      this.transitionToRoute('company-orders', company.content.id);
    }
  }
});
