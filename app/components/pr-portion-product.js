import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
});

export default Ember.Component.extend(Validations, {
  // actions: {
  //   remove() {
  //     this.validate().then(({ validations }) => {
  //       if (validations.get('isValid')) {
  //         this.attrs.remove(
  //           this.get('portion-product'),
  //         );
  //       }
  //       this.set('didValidate', true);
  //     });
  //   },

  //   togglePaid(portion) {
  //     // portion.toggleProperty('paid');
  //     // portion.updateOrderMoney();
  //     // portion.save();
  //   }
  // }
});
