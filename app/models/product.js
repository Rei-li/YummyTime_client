import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  price: DS.attr('number'),
  imageUrl: DS.attr('string'),
  vendor: DS.belongsTo('vendor'),
  category: DS.attr('string'),
  vendorId: DS.attr('string'),
  deletedByVendor: DS.attr('boolean')
});
