import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  notifications: Ember.inject.service(),


  actions: {
    addToOrder(model, attrs) {
      const context = this;
      model.updateComment(attrs.text).then(() => {
        const portionProducts = model.get('portion-products');
        portionProducts.toArray().forEach(product => {
          product.set('deleted', false);
          product.save();
        });

        const order = model.get('order').content;
        // order.addPortion(model);
        // order.save();
        // order.updateSum(model.get('cost')).then(() => {
        // context.get('notifications').subscribeOrderNotification(model.order.id);

        context.transitionToRoute('order', order.id);
        // });
      });
    },

    removePortion(model) {
      const context = this;
      const portion = model.portion;
      const portionProducts = portion.get('portion-products');
      // const portionCost = portion.get('cost');


      const productRemovePromises = [];

      portionProducts.toArray().forEach(product => {
        const productAddResult = portion.lazyRemoveProducts(product).then(() => {
          product.set('deleted', true);
          product.save();
        });
        productRemovePromises.push(productAddResult);
      });

      Promise.all(productRemovePromises)
        .then(() => {
          portion.save();
          const order = portion.get('order');
          // order.content.updateSum(portionCost * (-1)).then(() => {
          order.content.removePortion(portion).then(() => {
            portion.set('deleted', true);
            portion.save();
            context.transitionToRoute('order', order.content.id);
          });
          // });
        });
    },

    addToPortion(model, price, attrs) {
      const portion = model.portion;
      const portionProduct = this.store.createRecord('portion-product', {
        quantity: 1,
        product: attrs
      });

      model.portion.addProducts(portionProduct).then(() => {
        portion.updateCost(price);
        model.portion.save();
      });
    },


    removePortionProduct(model, attrs) {
      return new Promise((resolve) => {
        model.removeProducts(attrs).then(() => {
          attrs.set('deleted', true);
          attrs.save();
          resolve();
        });
      });
    }
  }
});
