import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr('string'),
  cost: DS.attr('number'),
  paid: DS.attr('boolean'),
  deleted: DS.attr('boolean'),
  owner: DS.belongsTo('account'),
  order: DS.belongsTo('order'),
  'portion-products': DS.hasMany('portion-product'),

  // updateOrderMoney() {
  //   this.get('order').then((order) => {
  //     const cost = this.get('cost');
  //     const paid = this.get('paid');
  //     const available = order.get('sum');

  //     order.set('sum', available + ((paid) ? +cost : -cost));
  //     order.save();
  //   });
  // },

  updateCost(productPrice) {
    const portion = this;
    return new Promise((resolve) => {
      const cost = portion.get('cost');
      portion.set('cost', productPrice + cost);
      portion.get('order').content.updateSum(productPrice).then(() => {
        resolve();
      });
    });
  },

  updateComment(text) {
    this.set('text', text);
    return this.save();
  },

  removeProducts(portionProduct) {
    const portion = this;
    return new Promise((resolve) => {
      const productCost = portionProduct.get('product.price');
      portion.get('portion-products').removeObject(portionProduct);
      portion.updateCost(productCost * (-1)).then(() => {
        portion.save().then(() => {
          resolve();
        });
      });
    });
  },

  lazyRemoveProducts(portionProduct) {
    const portion = this;
    return new Promise((resolve) => {
      portion.get('portion-products').removeObject(portionProduct);
      resolve();
    });
  },

  addProducts(product) {
    const portion = this;
    return new Promise((resolve) => {
      product.save().then(() => {
        portion.get('portion-products').pushObject(product);
        resolve();
      });
    });
  }
});
