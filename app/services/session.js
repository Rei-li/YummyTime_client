import Ember from 'ember';
import ESASession from 'ember-simple-auth/services/session';

export default ESASession.extend({
  store: Ember.inject.service(),

  loadCurrentAccount: Ember.observer('isAuthenticated', function() {
    if (this.get('isAuthenticated')) {
      try {
        const jwt = Ember.getOwner(this).lookup('authenticator:jwt');
        const payload = jwt.getTokenData(this.get('session.authenticated.token'));

        this.get('store').find('account', payload).then((account) => {
          this.set('account', account);
        });
      } catch (err) {
        this.set('account', null);
      }
    } else {
      this.set('account', null);
    }
  }),

  getCurrentAccountId() {
    const jwt = Ember.getOwner(this).lookup('authenticator:jwt');
    const payload = jwt.getTokenData(this.get('session.authenticated.token'));
    return payload;
  }
});
