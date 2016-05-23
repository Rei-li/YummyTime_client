import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  notifications: Ember.inject.service(),
  portionProducts: [],

  actions: {
    addToOrder(model, account, attrs) {
      const context = this;
      const isManager = (context.get('session.account.id') === model.order.get('manager.id'));
      const portion = context.store.createRecord('portion', attrs);
      portion.set('order', model.order);
      portion.set('owner', account);
      const productAddPromises = [];

      context.portionProducts.forEach(product => {
        const productAddResult = portion.addProducts(product);
        productAddPromises.push(productAddResult);
      });

      Promise.all(productAddPromises)
        .then(() => {
          if (isManager) {
            portion.set('paid', true);
          }

          portion.save().then(() => {
            console.log('portion saved');
            model.order.addPortion(portion);
            context.portionProducts = [];
            if (isManager) {
              portion.updateOrderMoney();
            }
            model.order.save();
            console.log('order saved');
          });

          context.get('notifications').subscribeOrderNotification(model.order.id);
          context.transitionToRoute('order', model.order.id);
        });
    },

    addToPortion(model, attrs) {
      let isExists = false;

      for (let i = 0; i < this.portionProducts.length; i++) {
        if (this.portionProducts[i].product.id === attrs.id) {
          this.portionProducts[i].quantity++;
          isExists = true;
          break;
        }
      }
      if (!isExists) {
        const portionProduct = this.store.createRecord('portion-product', {
          quantity: 1,
          product: attrs
        });
        this.portionProducts.push(portionProduct);
      }
    }
  }
});
