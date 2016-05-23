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
    return new Promise((resolve, reject) => {
      const cost = portion.get('cost');
      portion.set('cost', productPrice + cost);
      portion.get('order').content.updateSum(productPrice).then(() => {
        console.log('cost updated', portion.id);
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
    return new Promise((resolve, reject) => {
      const productCost = portionProduct.get('product.price');
      portion.get('portion-products').removeObject(portionProduct);
      portion.updateCost(productCost * (-1)).then(() => {
        portion.save().then(() => {
          console.log('product removed', portion.id);
          resolve();
        });
      });
    });
  },

  lazyRemoveProducts(portionProduct) {
    const portion = this;
    return new Promise((resolve, reject) => {
      portion.get('portion-products').removeObject(portionProduct);
      console.log('product removed lazy', portion.id);
      resolve();
    });
  },

  addProducts(product) {
    const portion = this;
    return new Promise((resolve, reject) => {
      product.save().then(() => {
        portion.get('portion-products').pushObject(product);
        console.log('product added', product.id);
        resolve();
      });
    });
    // products.forEach(product => {
    //   product.save().then(() => {
    //     this.get('portion-products').pushObject(product);
    //     console.log('product added');
    //   });
    // });
  }
});
