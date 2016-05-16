import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createAccount(attrs) {
      const account = this.store.createRecord('account', attrs);
      account.save();
      this.transitionToRoute('orders');
    }
  }
});
