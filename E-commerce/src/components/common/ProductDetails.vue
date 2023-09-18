<template>
    <v-card :loading="loading" class="mx-auto my-12" style="margin-top: 7% !important;" width="55%">
      <template v-slot:loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="deep-purple"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-row>
        <v-col cols="6"> 
          <v-carousel cycle height="400" hide-delimiters hide-delimiter-background show-arrows="hover" >
            <v-carousel-item v-for="images in product.images" :key="images"  :src="images" >
            </v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col cols="6">
          <v-card-item>
        <v-card-title>{{ product.title }}</v-card-title>
      </v-card-item>
  
      <v-card-subtitle>
        <h2>Price: {{ product.price }}$</h2>
      </v-card-subtitle>
  
      <v-card-text>
        <v-row
          align="center"
          class="mx-0 my-4"
        >
          <v-rating
            :model-value="product.rating"
            color="amber"
            density="compact"
            half-increments
            readonly
            size="small"
          ></v-rating>
          Rating: {{ product.rating }}
        </v-row>
  
        <div>{{ product.description }}</div>
        <v-text-field v-model="quantity" type="number" clearable min="0" label="Enter Your Quantity" placeholder="Place Your Quantity Here"
        variant="underlined"></v-text-field>
      </v-card-text>
  <v-divider vertical class="mx-4 mb-2"></v-divider>
      <div class="px-4">
        <h2>Tags:</h2>
        <v-chip-group v-model="selection">
          <v-chip>Product Brand: {{ product.brand }}</v-chip>
          <v-chip>Product Stock: {{ product.stock }} Pieces</v-chip>
          <v-chip>Discount Percentage: {{ product.discountPercentage }} %</v-chip>
        </v-chip-group>
      </div>
      <v-divider class="mx-4 mb-1"></v-divider>
      <v-card-actions>
        <v-btn color="deep-purple-lighten-2" variant="text" @click="addToCart(product, quantity)">
        Add to Cart
      </v-btn>
      </v-card-actions>
        </v-col>
      </v-row>
      <!-- <v-img
        cover
        height="250"
        :src="product.thumbnail"
      ></v-img> -->
    </v-card>
</template>
  
<script>
import axios from 'axios';
import { useStore } from 'vuex';
import { ref } from 'vue'; // Import ref instead of reactive
import { useRouter } from 'vue-router';

export default {
  name: 'ProductDetails',
  setup() {
    const store = useStore();

    const loading = ref(false); // Use ref for loading
    const selection = ref(1);
    const router = useRouter();
    const quantity = ref(1);
    const product = ref({ // Use ref for product
      thumbnail: '',
      title: '',
      price: 0,
    });

    const fetchProductDetails = async (productId) => {
      try {
        loading.value = true;
        const productId = router.currentRoute.value.params.id;
        const response = await axios.get(`https://dummyjson.com/products/${productId}`);
        Object.assign(product.value, response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        loading.value = false;
      }
    };

    const addToCart = (product, quantity) => {
      const existingCartItem = store.state.cartItems.find((item) => item.id === product.id);
      console.log('Adding to cart:', product);
      if (!existingCartItem) {
        // If the product is not in the cart, add it with quantity
        store.dispatch('addProductToCart', { ...product, quantity });
      } else {
        // If the product is already in the cart, update its quantity
        store.dispatch('updateCartItemQuantity', { id: product.id, quantity });
      }
    };

    return {
      loading,
      selection,
      quantity,
      product, // Return product as a ref
      fetchProductDetails,
      addToCart,
    };
  },
  mounted() {
    const productId = this.$route.params.id;
    this.fetchProductDetails(productId);
  },
};
</script>


<style scoped>
#pdetails{
    margin-top: 5%;
}
</style>
  