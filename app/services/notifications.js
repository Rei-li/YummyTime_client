import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Service.extend({
  socketService: Ember.inject.service('socket-io'),
  session: Ember.inject.service(),

  getSocket() {
    return this.get('socketService').socketFor(ENV.host);
  },

  setNotificationCookie(orderId) {
    const isCookieExists = this.getIfNotificationCookieSet(orderId);
    if (!isCookieExists) {
      const oneDay = 1 * 24 * 60 * 60 * 1000;
      const date = new Date();
      date.setTime(date.getTime() + oneDay);
      document.cookie =
        `ROOMS_JOINED_${orderId}=${orderId}; expires=${date.toGMTString()}; path=/`;
    }
  },

  removeNotificationCookie(orderId) {
    const isCookieExists = this.getIfNotificationCookieSet(orderId);
    if (isCookieExists) {
      const oneDay = 1 * 24 * 60 * 60 * 1000;
      const date = new Date();
      date.setTime(date.getTime() - oneDay);
      document.cookie = `ROOMS_JOINED_${orderId}=; expires=${date.toGMTString()}`;
    }
  },

  getIfNotificationCookieSet(orderId) {
    const name = `ROOMS_JOINED_${orderId}=`;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return true;
      }
    }
    return false;
  },

  getOrdersFromCookies() {
    const connectedOrders = [];
    const name = 'ROOMS_JOINED_';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        cookie = cookie.substring(name.length, cookie.length);
        const divider = '=';
        if (cookie.indexOf(divider) > 0) {
          const order = cookie.substring(cookie.indexOf(divider) + 1, cookie.length);
          connectedOrders.push(order);
        }
      }
    }
    return connectedOrders;
  },

  requestUserOrders(email) {
    const socketIO = this.getSocket();
    socketIO.emit('getOrders', { email });
  },

  joinToPrivateSession(email) {
    const socketIO = this.getSocket();
    socketIO.emit('join', { room: email });
  },

  sendOrderNotification(message, order) {
    const socketIO = this.getSocket();
    socketIO.emit('sendMessage', { message, order });
  },

  subscribeOrderNotification(orderId) {
    this.setNotificationCookie(orderId);
    const socketIO = this.getSocket();
    socketIO.emit('join', { room: orderId });
  },

  subscribeNotifications() {
    const notification = this;
    const orders = notification.getOrdersFromCookies();
    orders.forEach(item => {
      notification.subscribeOrderNotification(item);
    });
  },

  subscribeNotificationsOnLogin(email) {
    this.joinToPrivateSession(email);
    this.requestUserOrders(email);
  },

  unsubscribeFromOrderNotifications() {
    const socketIO = this.getSocket();
    const notification = this;
    const orders = notification.getOrdersFromCookies();
    orders.forEach(item => {
      socketIO.emit('leave', { room: item });
      notification.removeNotificationCookie(item);
    });
  },

  createNotification(options) {
    const notification = new Notification('Yummy Time', options);
    notification.onclick = function(event) {
      event.preventDefault();
      notification.close();
    };
  },

  init(email) {
    this._super.apply(this);
    const socketIO = this.getSocket();


    socketIO.on('message', data => {
      const options = {
        body: data.msg,
        icon: 'assets/img/notify-icon.jpg'
      };

      if ('Notification' in window) {
        if (Notification.permission === 'granted') {
          this.createNotification(options);
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission(permission => {
            if (permission === 'granted') {
              this.createNotification(options);
            }
          });
        }
      }
    }, this);


    socketIO.on('orders', function(data) {
      const notification = this;
      data.orders.forEach(orderId => {
        notification.subscribeOrderNotification(orderId);
      });
      socketIO.emit('leave', { room: email });
    }, this);
  }
});
