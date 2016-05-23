import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({});

export default Ember.Component.extend(Validations, {
  tagName: 'li',
  classNames: ['b-portion'],
  session: Ember.inject.service(),

  isManager: Ember.computed('session.account.id', function() {
    const currentAccountId = this.get('session.account.id');
    const orderManagerId = this.get('portion.order.manager.id');
    return (currentAccountId !== orderManagerId);
  }),

  canDelete: Ember.computed('portion.order.active', function() {
    const currentAccountId = this.get('session.account.id');
    const order = this.get('portion.order');

    if (order.get('active')) {
      return (currentAccountId === this.get('portion.order.manager.id')) ||
        (currentAccountId === this.get('portion.owner.id'));
    }
    return false;
  }),
  actions: {
    del() {
      this.validate().then(({ validations }) => {
        if (validations.get('isValid')) {
          this.attrs.del(
            this.get('order'),
          );
        }
        this.set('didValidate', true);
      });
    }
  }
});
