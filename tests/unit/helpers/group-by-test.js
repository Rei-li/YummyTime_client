import { groupBy } from 'client/helpers/group-by';
import { module, test } from 'qunit';

module('Unit | Helper | group by');

const a = { id: 1, attr: 'a' };
const b = { id: 2, attr: 'b' };
const c = { id: 3, attr: 'b' };

test('should group lists', function(assert) {
  const result = groupBy([a, b, c], 'attr');
  assert.ok(result.length == 2);
  assert.ok(result[1].list.length == 2, 'lists grouped by required attribute');
});

test('should contains grouper attribute', function(assert) {
  const result = groupBy([a, b, c], 'attr');
  assert.equal(result[1].grouper, 'b');
});
