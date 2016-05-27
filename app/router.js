import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

// eslint-disable-next-line array-callback-return
Router.map(function() {
  // eslint-disable-next-line prefer-arrow-callback
  this.route('orders', function() {
    this.route('active');
    this.route('inactive');
  });
  this.route('order', { path: '/orders/:order_id' });
  this.route('new-order', { path: 'companies/:id/orders/new' });
  this.route('new-portion-order', { path: '/orders/:order_id/portions/new' });
  this.route('register');
  this.route('login');
  this.route('vendors', { path: '/vendors' });
  this.route('new-vendor', { path: '/vendors/new' });
  this.route('checkout', { path: '/orders/:order_id/checkout' });
  // eslint-disable-next-line prefer-arrow-callback
  this.route('account', function() {});
  this.route('new-company', { path: '/companies/new' });
  this.route('companies', { path: '/companies' });
  this.route('company-orders', { path: 'companies/:id/orders' });
  this.route('home');
  this.route('portion', { path: 'portions/:portion_id' });
  this.route('admin-order', { path: '/admin-orders/:order_id' });
});

export default Router;
