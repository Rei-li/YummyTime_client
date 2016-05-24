import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  vendor: DS.belongsTo('vendor'),
  location: DS.attr('string'),
  manager: DS.belongsTo('account'),
  company: DS.belongsTo('company'),
  time: DS.attr('string'),
  portions: DS.hasMany('portion'),
  active: DS.attr('boolean', { defaultValue: true }),
  deleted: DS.attr('boolean'),

  sum: Ember.computed('portions', function() {
    // this.reload();
    const portions = this.get('portions');
    let orderSum = 0;
    portions.reload();
    portions.toArray().forEach(portion => {
      orderSum += portion.get('cost');
    });
    return orderSum;
  }),

  isReady: Ember.computed('money.total', 'money.required', function() {
    return this.get('money.total') >= this.get('money.required');
  }),

  addPortion(portion) {
    this.get('portions').pushObject(portion);
  },

  updateSum(portionCost) {
    const total = this.get('sum');
    this.set('sum', total + portionCost);
    return this.save();
  },

  removePortion(portion) {
    this.get('portions').removeObject(portion);
    return this.save();
  }
});
