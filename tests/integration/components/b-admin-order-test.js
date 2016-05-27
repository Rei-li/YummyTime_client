import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('b-admin-order', 'Integration | Component | b admin order', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{b-admin-order}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#b-admin-order}}
      template block text
    {{/b-admin-order}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
