import Ember from 'ember';
import { groupBy } from '../helpers/group-by';

export default Ember.Component.extend({
  nonDeletedPortions: Ember.computed.filterBy('portions', 'deleted', false),
  groupedPortions: Ember.computed('nonDeletedPortions', function() {
    return groupBy(this.get('nonDeletedPortions'), 'owner.id');
  }),

  actions: {
    toggleActiveState() {
      const order = this.get('order');
      order.toggleProperty('active');
      order.save();
    }
  }
});
