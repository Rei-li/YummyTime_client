import Ember from 'ember';

export default Ember.Component.extend({
  today: Ember.computed('session.account.id', function() {
    return new Date().toLocaleDateString();
  })
});
