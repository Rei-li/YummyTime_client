import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createVendor(attrs) {
      const vendor = this.store.createRecord('vendor', attrs);
      vendor.save();
      this.transitionToRoute('vendors');
    }
  }
});
