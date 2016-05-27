import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  tagName: 'li',
  classNames: ['b-portion', 'b-order-group'],

  actions: {
    togglePaid(portion) {
      portion.toggleProperty('paid');
      portion.save();
    }
  },

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
