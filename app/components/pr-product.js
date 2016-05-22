import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
});

export default Ember.Component.extend(Validations, {
  actions: {
    submit() {
      this.validate().then(({ validations }) => {
        if (validations.get('isValid')) {
          this.attrs.submit(
            this.get('product')
          );
        }
        this.set('didValidate', true);
      });
    }
  }
});
