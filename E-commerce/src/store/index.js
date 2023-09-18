import { createStore } from 'vuex';

export default createStore({
  state: {
    cartItems: [],
  },
  mutations: {
    addToCart(state, product) {
      state.cartItems.push(product);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    setCartItems(state, cartItems) {
      state.cartItems = cartItems;
    },
    clearCart(state) {
      state.cartItems = [];
      localStorage.removeItem('cartItems'); // Clear local storage
    },
    removeFromCart(state, item) {
      const itemIndex = state.cartItems.findIndex((cartItem) => cartItem.id === item.id);
      if (itemIndex !== -1) {
        // Remove the item from the cart
        state.cartItems.splice(itemIndex, 1);
  
        // Update local storage
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },
  },
  actions: {
    addProductToCart({ commit }, product) {
      commit('addToCart', product);
    },
  },
});