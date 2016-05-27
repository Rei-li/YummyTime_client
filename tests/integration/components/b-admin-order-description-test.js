import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('b-admin-order-description', 'Integration | Component | b admin order description', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{b-admin-order-description}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#b-admin-order-description}}
      template block text
    {{/b-admin-order-description}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
