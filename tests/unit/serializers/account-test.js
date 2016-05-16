import { moduleForModel, test } from 'ember-qunit';

moduleForModel('account', 'Unit | Serializer | account', {
  // Specify the other units that are required for this test.
  needs: ['serializer:account']
});

test('should serialize password', function(assert) {
  let account = this.subject({ password: 'secret' });
  let res = account.serialize();

  assert.equal(res.data.attributes.password, 'secret');
});

test('should remove undefined password', function(assert) {
  let account = this.subject({ password: undefined });
  let res = account.serialize();

  assert.notOk(res.data.attributes.hasOwnProperty('password'));
});

test('should remove null password', function(assert) {
  let account = this.subject({ password: null });
  let res = account.serialize();

  assert.notOk(res.data.attributes.hasOwnProperty('password'));
});
