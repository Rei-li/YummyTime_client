import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'account.name': {
    validators: [validator('presence', true)]
  },
  'account.email': {
    validators: [
      validator('presence', true),
      validator('format', {
        type: 'email'
      })
    ]
  },
  'account.phone': {
    validators: [validator('presence', true)]
  }
});

export default Ember.Component.extend(Validations, {
  didValidate: false,

  actions: {
    submit() {
      this.validate().then(({ validations }) => {
        if (validations.get('isValid')) {
          this.attrs.submit();
        }
        this.set('didValidate', true);
      });
    }
  }
});
