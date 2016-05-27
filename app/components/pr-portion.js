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
  })

});
