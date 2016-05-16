import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr('string'),
  cost: DS.attr('number'),
  paid: DS.attr('boolean'),
  deleted: DS.attr('boolean'),
  owner: DS.belongsTo('account'),
  order: DS.belongsTo('order'),

  updateOrderMoney() {
    this.get('order').then((order) => {
      const cost = this.get('cost');
      const paid = this.get('paid');
      const available = order.get('money.available');

      order.set('money.available', available + ((paid) ? +cost : -cost));
      order.save();
    });
  }
});
