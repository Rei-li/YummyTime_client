import Ember from 'ember';
import { groupBy } from '../helpers/group-by';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  nonDeletedPortions: Ember.computed.filterBy('portions', 'deleted', false),
  groupedPortions: Ember.computed('nonDeletedPortions', function() {
    const orderPortions = this.get('order.portions').toArray();
    return groupBy(orderPortions, 'owner.id');
  }),

  isManager: Ember.computed('session.account.id', function() {
    const currentAccountId = this.get('session.account.id');
    const orderManagerId = this.get('order.manager.id');
    return (currentAccountId === orderManagerId);
  }),

  canAddPortion: Ember.computed('session.account.id', function() {
    const isOrderActive = this.get('order.active');
    if (!isOrderActive) {
      return false;
    }
    const currentAccountId = this.get('session.account.id');
    const orderPortions = this.get('order.portions').toArray();
    for (let i = 0; i < orderPortions.length; i++) {
      if (orderPortions[i].get('owner.id') === currentAccountId) {
        return false;
      }
    }

    return true;
  }),

  actions: {
    toggleActiveState() {
      const order = this.get('order');
      order.toggleProperty('active');
      order.save();
    },

    add() {
      this.attrs.add(
        this.get('order')
      );
    }
  }
});
