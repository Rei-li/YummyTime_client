import { moduleForModel, test } from 'ember-qunit';

moduleForModel('order', 'Unit | Serializer | order', {
  needs: ['serializer:order', 'model:vendor', 'model:account', 'model:portion']
});

test('should include portions into record', function(assert) {
  let order = this.subject();
  let res = order.serialize();

  assert.ok(res.data.relationships.hasOwnProperty('portions'));
});
