import Ember from 'ember';

import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  text: {
    validators: [validator('presence', true)]
  },
  cost: {
    validators: [
      validator('presence', true),
      validator('number', {
        allowString: true,
        positive: true,
        integer: true
      })
    ]
  }
});

export default Ember.Component.extend(Validations, {
  session: Ember.inject.service(),

  didValidate: false,

  actions: {
    submit() {
      this.validate().then(({ validations }) => {
        if (validations.get('isValid')) {
          this.attrs.submit(
            this.getProperties('text')
          );
        }
        this.set('didValidate', true);
      });
    }
  }
});
