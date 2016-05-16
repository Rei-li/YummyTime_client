import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'label',
  classNames: ['checkbox'],
  classNameBindings: ['checked:_checked', 'disabled:_disabled']
});
