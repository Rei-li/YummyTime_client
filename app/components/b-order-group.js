/* global $ */
import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  tagName: 'li',
  classNames: ['b-order-group'],

  canDelete: Ember.computed('order.active', function() {
    const currentAccountId = this.get('session.account.id');
    const order = this.get('order');

    if (order.get('active')) {
      return (currentAccountId === this.get('order.manager.id')) ||
        (currentAccountId === this.get('owner.id'));
    }
    return false;
  }),

  isOwner: Ember.computed('session.account.id', function() {
    const currentAccountId = this.get('session.account.id');
    return (currentAccountId === this.get('portion.owner.id'));
  }),

  allPaid: Ember.computed('portions.@each.paid', function() {
    return this.get('portions').isEvery('paid', true);
  }),

  click: (e) => {
    const target = $(e.target);

    if (target.hasClass('checkbox__text') || target.hasClass('checkbox__control')) {
      e.stopPropagation();
      return;
    }

    const elem = (e.target === this) ? target : target.parents('.b-order-group');

    if (!elem.length) {
      return;
    }

    elem.find('.b-order-group__summary').slideToggle(100);
  }
});
