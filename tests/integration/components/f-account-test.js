import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('f-account', 'Integration | Component | f account', {
  integration: true
});

const accountStub = Ember.Object.create({
  name: 'name',
  email: 'email',
  phone: 'phone'
});

test('it can be submitted', function(assert) {
  this.on('submit', () => { assert.ok(true); })

  this.render(hbs`{{f-account submit=(action 'submit')}}`);
  this.$('button').click()
});

test('it bound to account model', function(assert) {
  this.set('account', accountStub);
  this.on('submit', () => {});

  this.render(hbs`{{f-account account=account submit=(action 'submit')}}`);
  this.$('input').val('new name');
  this.$('input').change();
  this.$('button').click();

  assert.ok(this.get('account.name') == 'new name');
});
