import Ember from 'ember';

export function groupBy(iter, byPath) {
  const result = new Ember.A();

  iter.forEach((item) => {
    const _id = Ember.get(item, byPath);
    const hasGroup = !!result.findBy('_id', _id);

    if (!hasGroup) {
      result.pushObject(Ember.Object.create({
        _id,
        list: new Ember.A(),
        grouper: Ember.get(item, byPath.split('.', 1)[0]),
        counter: 0,
        item: null
      }));
    }

    const group = result.findBy('_id', _id);

    group.get('list').pushObject(item);
    group.counter++;
    if (group.item === null) {
      group.item = group.get('list')[0];
    }
  });

  return result;
}

export default Ember.Helper.extend({
  compute([byPath, iter]) {
    return groupBy(iter, byPath);
  }
});
