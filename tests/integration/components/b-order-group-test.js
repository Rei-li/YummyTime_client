import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('b-order-group', 'Integration | Component | b order group', {
  integration: true
});

const ownerStub = Ember.Object.create({ displayName: 'me', phone: 'hidden' });
const portionsStub = Ember.A([
  Ember.Object.create({ paid: true, cost: 1, save() {}, updateOrderMoney() {} }),
  Ember.Object.create({ paid: false, cost: 2, save() {}, updateOrderMoney() {} })
]);

test('should render group', function(assert) {
  this.set('portions', portionsStub);
  this.set('owner', ownerStub);
  this.render(hbs`{{b-order-group portions=portions owner=owner}}`);

  assert.equal(this.$('.b-person__name').text(), 'me');
  assert.equal(this.$('.b-person__phone').text(), 'hidden');
  assert.equal(this.$('.b-portion').length, 2);
});

test('should toggle all portion paid status at once', function(assert) {
  this.set('portions', portionsStub);
  this.set('owner', ownerStub);
  this.render(hbs`{{b-order-group portions=portions owner=owner}}`);
  this.$('.b-order-group__checkbox input').click();

  assert.ok(this.get('portions').every((item) => { return item.paid }));
});
