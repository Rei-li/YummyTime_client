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
        grouper: Ember.get(item, byPath.split('.', 1)[0])
      }));
    }

    result.findBy('_id', _id).get('list').pushObject(item);
  });

  return result;
}

export default Ember.Helper.extend({
  compute([byPath, iter]) {
    return groupBy(iter, byPath);
  }
});
