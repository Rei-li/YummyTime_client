import Ember from 'ember';
import { groupBy } from '../helpers/group-by';

export default Ember.Component.extend({
  session: Ember.inject.service(),

  isManager: Ember.computed('session.account.id', function() {
    const currentAccountId = this.get('session.account.id');
    const orderManagerId = this.get('order.manager.id');
    return (currentAccountId === orderManagerId);
  }),

  groupedProducts: Ember.computed('portions', function() {
    const portionProducts = [];
    const orderPortions = this.get('portions').toArray();
    orderPortions.forEach(portion => {
      const prods = portion.get('portion-products').toArray();
      prods.forEach(prod => {
        if (!prod.get('deleted')) {
          portionProducts.push(prod);
        }
      });
    });


    return groupBy(portionProducts, 'product.id');
  }),

  prodGroups: Ember.computed('groupedProducts', function() {
    const portionProducts = [];
    const groups = this.get('groupedProducts').toArray();



    groups.forEach(group => {
      const prod = group.item.get('title');
      // portionProducts.push(prod);
    });

    const orderPortions = this.get('order.portions').toArray();
    orderPortions.forEach(portion => {
      const prods = portion.get('portion-products').toArray();
      prods.forEach(prod => {
        if (!prod.get('deleted')) {
          prod.reload();
          const catalogProd = prod.get('product');
          portionProducts.push(catalogProd.get('title'));
        }
      });
    });


    return portionProducts;
  }),


  actions: {
    toggleActiveState() {
      const order = this.get('order');
      order.toggleProperty('active');
      order.save();
    },

    add() {
      this.attrs.add(
        this.get('order')
      );
    }
  }
});
