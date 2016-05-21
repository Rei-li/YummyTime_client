import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  phone: DS.attr('string'),
  company: DS.belongsTo('company'),

  /**
   * Public name of the account
   *
   * @return {String} The specified name of the account or email if no name
   *                  is available.
   */
  displayName: Ember.computed('name', 'email', function() {
    return this.get('name') || this.get('email');
  })
});
