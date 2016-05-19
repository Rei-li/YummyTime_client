import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: {
    validators: [
      validator('presence', true)
    ]
  }
});

export default Ember.Component.extend(Validations, {
  didValidate: false,

  actions: {
    submit() {
      this.validate().then(({ validations }) => {
        if (validations.get('isValid')) {
          this.attrs.submit(
            this.getProperties('title', 'address', 'description')
          );
        }
        this.set('didValidate', true);
      });
    }
  }
});
