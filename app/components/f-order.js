import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  vendor: {
    validators: [validator('presence', true)]
  },
  location: {
    validators: [validator('presence', true)]
  },
  time: {
    validators: [validator('presence', true)]
  }
});

export default Ember.Component.extend(Validations, {
  session: Ember.inject.service(),
  vendor: null,
  didValidate: false,

  actions: {
    setVendor(vendor) {
      this.set('vendor', vendor);
    },

    submit() {
      this.validate().then(({ validations }) => {
        if (validations.get('isValid')) {
          this.attrs.submit(
            this.get('vendor'),
            this.get('session.account'),
            this.get('session.account.company'),
            this.getProperties('location', 'time')
          );
        }
        this.set('didValidate', true);
      });
    }
  }
});
