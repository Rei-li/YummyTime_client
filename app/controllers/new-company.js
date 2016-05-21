import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createCompany(attrs) {
      const company = this.store.createRecord('company', attrs);
      company.save();
      this.transitionToRoute('register');
    }
  }
});
