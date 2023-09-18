<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  created() {
    // Load cart items from local storage and set them in the store
    const savedCartItems = localStorage.getItem('cartItems');
    console.log('Saved Cart Items:', savedCartItems);
    if (savedCartItems) {
      const parsedCartItems = JSON.parse(savedCartItems);
    console.log('Parsed Cart Items:', parsedCartItems);
    this.$store.commit('setCartItems', parsedCartItems);
    }
  },
};
</script>
