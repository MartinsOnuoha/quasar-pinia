import { defineStore } from 'pinia';
import { Cookies, Notify, Loading } from 'quasar';
import { api } from 'src/boot/axios';

export const useMainStore = defineStore('mainStore', {
  state: () => ({
    clientId: Cookies.get('clientId') || null, // check cookie first before  rendering it to null
    restaurantId: Cookies.get('restaurantId') || null,
    token: Cookies.get('token') || null,
    clientDetails: null,
    restaurantDetails: null,
    orders: [],
    menus: [],
    restaurants: [],
    cart: JSON.parse(localStorage.getItem('cart')) || [],
  }),
  actions: {
    async login(payload, accountType) {
      Loading.show();
      try {
        const response = await api.post(`/api/${accountType}-login`, payload);
        if (response.status === 201) {
          this.setCookie('token', response.data.token);
          this.setCookie('clientId', response.data.clientId);
          this.setCookie('restaurantId', response.data.restaurantId);

          // destructure the restaurantId property from the response.data object
          const { restaurantId, clientId } = response.data;
          this.restaurantId = restaurantId;
          this.clientId = clientId;

          return true;
        }
        return false;
      } catch (error) {
        const errorMessage = error.response.data.error;

        Notify.create({
          message: errorMessage,
          position: 'center',
          type: 'negative',
        });
        return false;
      } finally {
        Loading.hide();
      }
    },
    async register(payload, accountType) {
      Loading.show();
      try {
        // attempt to perform an action
        const response = await api.post(`/api/${accountType}`, payload);

        if (response.status === 201) {
          this.setCookie('token', response.data.token);
          this.setCookie('clientId', response.data.clientId);
          this.setCookie('restaurantId', response.data.restaurantId);
          return true;
        }
        return false;
      } catch (error) {
        // If it fails, comes into this block
        const errorMessage = error.response.data;
        Notify.create({
          message: errorMessage,
          position: 'center',
          type: 'negative',
        });
        return false;
      } finally {
        Loading.hide();
      }
    },
    async logout(accountType) {
      Loading.show();
      try {
        // get a cookie value with the key "token", saved during login
        api.defaults.headers.token = Cookies.get('token');
        const response = await api.delete(`/api/${accountType}-login`);

        if (response.status === 204) {
          Notify.create({
            message: 'Logout was successful',
            position: 'center',
            type: 'positive',
          });
          Cookies.remove('token');
          Cookies.remove('restaurantId');
          Cookies.remove('clientId');
          localStorage.clear();

          return true;
        }
        return false;
      } catch (error) {
        Notify.create({
          message: 'Logout failed',
          position: 'center',
          type: 'negative',
        });
        return false;
      } finally {
        Loading.hide();
      }
    },
    async getClient() {
      Loading.show();

      try {
        api.defaults.headers.token = Cookies.get('token');
        const response = await api.get('/api/client');

        if (response.status === 200) {
          const client = response.data[0];
          this.clientDetails = client;
          return true;
        }
        return false;
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'An error occurred',
          position: 'center',
        });
        return true;
      } finally {
        Loading.hide();
      }
    },

    async getRestaurant(restaurantId) {
      Loading.show();

      try {
        api.defaults.headers.token = Cookies.get('token');
        let url = 'restaurant';
        if (restaurantId) {
          url = `${url}?restaurantId=${restaurantId}`;
        }
        const response = await api.get(`/api/${url}`);

        if (response.status === 200) {
          const restaurant = response.data[0];
          this.restaurants = response.data;
          this.restaurantDetails = restaurant;
          return true;
        }
        return false;
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'An error occurred',
          position: 'center',
        });
        return true;
      } finally {
        Loading.hide();
      }
    },
    async getOrders() {
      Loading.show();

      try {
        api.defaults.headers.token = Cookies.get('token');
        const response = await api.get('/api/order');

        if (response.status === 200) {
          this.orders = response.data;
          return true;
        }
        return false;
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'An error occurred',
          position: 'center',
        });
        return false;
      } finally {
        Loading.hide();
      }
    },
    async createMenu(payload) {
      Loading.show();
      try {
        api.defaults.headers.token = Cookies.get('token');
        const response = await api.post('/api/menu', payload);

        if (response.status === 201) {
          Notify.create({
            message: 'menu created succesfully',
            position: 'center',
            type: 'positive',
          });
          return true;
        }

        return false;
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'menu creation failed',
          position: 'center',
        });
        return false;
      } finally {
        Loading.hide();
      }
    },
    async deleteMenu(payload) {
      Loading.show();

      try {
        api.defaults.headers.token = Cookies.get('token');
        const response = await api.delete('/api/menu', payload);

        if (response.status === 204) {
          Notify.create({
            type: 'positive',
            message: 'menu deleted',
            position: 'center',
          });
          return true;
        }
        return false;
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'menu delete failed',
          position: 'center',
        });
        return false;
      } finally {
        Loading.hide();
      }
    },
    async updateMenu(payload) {
      Loading.show();

      try {
        api.defaults.headers.token = Cookies.get('token');
        const response = await api.patch('/api/menu', payload);

        if (response.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'menu updated successfully',
            position: 'center',
          });
          return true;
        }
        return false;
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'menu update failed',
          position: 'center',
        });
        return false;
      } finally {
        Loading.hide();
      }
    },
    async getMenus(restaurantId, menuId) {
      Loading.show();

      try {
        // no need for header token, its not required, opened.
        // query parameters added to the url as optional args
        let url = '/menu';
        if (restaurantId) {
          url = `${url}?restaurantId=${restaurantId}`;
        }
        if (menuId) {
          url = `${url}&menuId=${menuId}`;
        }

        const response = await api.get(`/api${url}`);

        if (response.status === 200) {
          this.menus = response.data;
          return true;
        }
        return false;
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'no menu fetched',
          position: 'center',
        });
        return false;
      } finally {
        Loading.hide();
      }
    },
    async updateProfile(payload, accountType) {
      Loading.show();

      try {
        api.defaults.headers.token = Cookies.get('token');
        const response = await api.patch(`/api/${accountType}`, payload);

        if (response.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Profile update successfully',
            position: 'center',
          });
          return true;
        }
        return false;
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Profile update failed',
          position: 'center',
        });
        return false;
      } finally {
        Loading.hide();
      }
    },
    async placeClientOrder(payload) {
      Loading.show();

      try {
        api.defaults.headers.token = Cookies.get('token');
        const response = await api.post('/api/order', payload);

        if (response.status === 201) {
          Notify.create({
            type: 'positive',
            message: 'Order placed successfully',
            position: 'center',
          });
          this.cart = [];
          localStorage.removeItem('cart');
          return true;
        }
        return false;
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Order placement failed',
          position: 'center',
        });
        return false;
      } finally {
        Loading.hide();
      }
    },
    async updateOrder(payload) {
      Loading.show();

      try {
        api.defaults.headers.token = Cookies.get('token');
        const response = await api.patch('/api/order', payload);

        if (response.status === 200 || response.status === 204) {
          Notify.create({
            type: 'positive',
            message: 'Order updated successfully',
            position: 'center',
          });
          return true;
        }
        return false;
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Order update failed',
          position: 'center',
        });
        return false;
      } finally {
        Loading.hide();
      }
    },
    getAccountType() {
      const restaurantId = Number(Cookies.get('restaurantId'));
      const clientId = Number(Cookies.get('clientId'));

      if (restaurantId) {
        return 'restaurant';
      }
      if (clientId) {
        return 'client';
      }
      return null;
    },
    addToCart(item) {
      const alreadyExists = this.cart.find(
        (value) => value.menuId === item.menuId,
      );
      if (alreadyExists) {
        Notify.create({
          type: 'info',
          message: 'This item is already in your cart',
          position: 'center',
        });
      } else {
        this.cart.push(item);
        Notify.create({
          type: 'positive',
          message: 'Item added',
          position: 'center',
        });
      }
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    async deleteClientProfile() {
      Loading.show();

      try {
        api.defaults.headers.token = Cookies.get('token');
        const response = await api.delete('/api/client', {});

        if (response.status === 204) {
          this.removeCookie('token');
          this.removeCookie('clientId');
          this.removeCookie('menuId');
          this.removeCookie('restaurantId');
          Notify.create({
            type: 'positive',
            message: 'Profile deleted successfully',
            position: 'center',
          });
          return true;
        }
        return false;
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Profile delete failed',
          position: 'center',
        });
        return false;
      } finally {
        Loading.hide();
      }
    },
    setCookie(name, payload) {
      Cookies.set(name, payload);
    },
    removeCookie(name) {
      Cookies.remove(name);
    },
  },
  getters: {
    getToken: (state) => state.token,
    getClientId: (state) => state.clientId,
    getTotalOrders: (state) => state.orders.length,
    getTotalMenus: (state) => state.menus.length,
    getRestaurantId: (state) => state.restaurantId,
  },
});
