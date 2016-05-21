import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  address: DS.attr('string'),
  description: DS.attr('string'),
  accounts: DS.hasMany('account')
});
