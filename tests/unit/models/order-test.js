import { moduleForModel, test } from 'ember-qunit';

moduleForModel('order', 'Unit | Model | order', {
  needs: ['model:vendor', 'model:account', 'model:portion']
});

test('is not ready when the total money less then required', function(assert) {
  let order = this.subject({ money: { total: 0, required: 42 } });
  assert.equal(order.get('isReady'), false);
});

test('is ready when money is enought', function(assert) {
  let order = this.subject({ money: { total: 42, required: 42 } });
  assert.equal(order.get('isReady'), true);
});
