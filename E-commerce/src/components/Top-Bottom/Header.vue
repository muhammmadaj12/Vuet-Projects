<template>
  <v-app-bar app color="#3853D8" dark>
    <div @click.stop="drawer1 = !drawer1">
      <v-btn >
      <v-icon>mdi-menu</v-icon>
      <span>Menu</span>
    </v-btn>
    </div>
    <!-- <v-toolbar-title>
      <span class="caption">Menu</span>
    </v-toolbar-title> -->
    <v-divider vertical class="ml-1 mr-3"></v-divider>
    <!-- <v-btn icon >
      <v-icon>mdi-magnify</v-icon>
    </v-btn> -->
    
    <div class="search-suggestions-container" style="width: 20%; height: 58px;">
      <v-text-field
        class="mx-3"
        placeholder="Type Your Search Here"
        type="search"
        v-model="searchQuery"
        @input="searchProducts"
      ></v-text-field>

      <!-- Display suggestions below the search field -->
      <v-menu
        class="suggestion-menu"
        v-model="isSuggestionOpen"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-x
        style=" width: 26%;  left: 8.5%; top: 16%;"
      >
        <v-list>
          <!-- Iterate through suggestions and display them -->
          <v-list-item
            v-for="(suggestion, index) in suggestions"
            :key="index"
            @click="selectSuggestion(suggestion)"
          >
            <!-- Display suggestion titles and thumbnails -->
            <v-list-item-avatar>
              <v-img :src="suggestion.thumbnail" alt="Suggestion Thumbnail"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ suggestion.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <!-- <v-divider vertical ></v-divider> -->
    <div
      style="
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        text-align: center;"
    >
      <h4>E-commerce Project</h4>
    </div>

    <v-spacer></v-spacer>

    <v-divider vertical class=""></v-divider>
    <!-- <v-btn icon @click="logout" class="mx-1">
      <v-icon>mdi-account-outline</v-icon>
    </v-btn> -->
    <v-divider vertical class=""></v-divider>
    <v-btn icon class="mx-1">
      <v-icon>mdi-heart-outline</v-icon>
    </v-btn>
    <v-divider vertical class=""></v-divider>

    <v-btn icon @click="toggleCartDrawer">
      <v-badge color="#94D0EF" :content="cartItems.length">
        <v-icon>mdi-cart-outline</v-icon>
      </v-badge>
    </v-btn>
    
  </v-app-bar>
  <v-navigation-drawer
        v-model="drawer1"
        location="left"
        temporary
      >
        <v-container>
          <v-list><h2>Main Menu</h2></v-list>
        <v-divider></v-divider>
        <div class="my-3" @click="goHome">
          <v-btn>
            <v-icon>mdi-home</v-icon>
          </v-btn>
          <span style="padding-left: 5%; cursor: pointer;">Home</span>
        </div>
    <v-divider></v-divider>
        <div class="my-3" @click="goCategories">
          <v-btn>
            <v-icon>mdi-dialpad</v-icon>
          </v-btn>
          <span style="padding-left: 5%; cursor: pointer;">All Categories</span>
        </div>
        <v-divider></v-divider>
        <div class="my-3" @click="logout">
          <v-btn class="mr-3">
            <v-icon>mdi-account-outline</v-icon>
          </v-btn>
          <span style="padding-left: 5%; cursor: pointer;">Log Out</span>
        </div>
        </v-container>
      </v-navigation-drawer>

  <transition name="fade">
    <v-navigation-drawer v-model="drawer" location="right" temporary>
      <v-list>
        <v-subheader class="pl-3">Product Cart:</v-subheader>
        <v-divider></v-divider>
        <v-list-item v-for="(item, index) in cartItems" :key="index" class="pa-2">
          <v-row>
            <v-col cols="6">
              <v-avatar size="100">
                <v-img :src="item.thumbnail" cover></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="6">
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.price }}$</v-list-item-subtitle>
                <v-list-item-subtitle> {{ item.quantity }} * {{ item.price }}</v-list-item-subtitle>
                <!-- <template v-if="!item.editingQuantity">
                 
                  <v-text-field v-model="item.quantity" type="number" min="0"
                  variant="underlined"></v-text-field>
                </template> -->
                <!-- <template>
                  <v-list-item-subtitle>Quantity: {{ item.quantity }}</v-list-item-subtitle>
                </template> -->
              </v-list-item-content>

              <v-btn @click="removeFromCart(item)" class="my-3">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-divider class="" ></v-divider>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </transition>


</template>

<script>
import axios from 'axios';
import { useStore } from 'vuex';
import Categories from '../Home-Dashboard/Categories.vue';

export default {
  name: 'Header',
  data() {
    return {
      drawer: false,
      drawer1: false,
      searchQuery: '',
      suggestions: [],
      isSuggestionOpen: false,
    };
  },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
  computed: {
    cartItems() {
      return this.store.state.cartItems;
    },
  },
  methods: {
    toggleCartDrawer() {
      console.log('Toggle Cart Drawer'); // Add this line
      this.drawer = !this.drawer;
    },
    goHome() {
      this.$router.push('/home/dashboard');
    },
    goCategories(){
      this.$router.push('/home/categories');
    },
    logout() {
      // Remove the token from local storage
      localStorage.removeItem('userToken');

      this.$store.commit('clearCart');

      // Redirect the user to the login page (you can change the route as needed)
      this.$router.push('/');
    },
    removeFromCart(item) {
      // Use this.$store.commit to call the mutation
      this.$store.commit('removeFromCart', item);
    },
    async searchProducts() {
      try {
        // Check if searchQuery is empty or undefined
        if (!this.searchQuery || this.searchQuery.trim() === '') {
          this.suggestions = []; // Clear suggestions if the search query is empty
          this.isSuggestionOpen = false;
          return;
        }

        const apiUrl = `https://dummyjson.com/products/search?q=${this.searchQuery}`;
        console.log('API URL:', apiUrl);

        const response = await axios.get(apiUrl);
        console.log('API Response:', response.data);

        // Filter products that match the user's input
        this.suggestions = response.data.products.filter((product) => {
          // Check if product.title is defined before accessing it
          if (product.title) {
            return product.title.toLowerCase().includes(this.searchQuery.toLowerCase());
          }
          return false; // If product.title is undefined, exclude it from the suggestions
        });

        this.isSuggestionOpen = this.suggestions.length > 0;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    selectSuggestion(suggestion) {
      // Handle the selection of a suggestion
      // Set the searchQuery to the selected suggestion's title
      this.searchQuery = suggestion.title;
      this.isSuggestionOpen = false; // Close the suggestion list
      this.$router.push({ name: 'Details', params: { id: suggestion.id } });
    },
  },
  watch: {
    group() {
      this.drawer1 = false;
    },
  },
};
</script>


<!-- <script>
import axios from 'axios';
import { useStore } from 'vuex';

export default {
  name: 'Header',
  data(){
    return {
      drawer: false,
      drawer1: false,
      searchQuery: '',
      suggestions: [
      { title: 'Product 1', thumbnail: 'https://example.com/product1.jpg' },
      { title: 'Product 2', thumbnail: 'https://example.com/product2.jpg' },
      // Add more hardcoded suggestions here
    ],
      isSuggestionOpen: false,
    }
  },
  setup() {
    const store = useStore();
    return {
      store,
    }
  },
  computed: {
  cartItems() {
    return this.store.state.cartItems;
  },
},
  methods: {
    toggleCartDrawer() {
      console.log('Toggle Cart Drawer'); // Add this line
      this.drawer = !this.drawer;
    },
    goHome(){
      this.$router.push('/home/dashboard');
    },
    logout() {
      // Remove the token from local storage
      localStorage.removeItem('userToken');

      this.$store.commit('clearCart');
      
      // Redirect the user to the login page (you can change the route as needed)
      this.$router.push('/');
    },
    removeFromCart(item) {
      // Use this.$store.commit to call the mutation
      this.$store.commit('removeFromCart', item);
    },
    async searchProducts() {
      try {
        // Check if searchQuery is empty or undefined
        if (!this.searchQuery || this.searchQuery.trim() === '') {
          this.suggestions = []; // Clear suggestions if the search query is empty
          this.isSuggestionOpen = false;
          return;
        }

        const apiUrl = `https://dummyjson.com/products/search?q=${this.searchQuery}`;
        console.log('API URL:', apiUrl);

        const response = await axios.get(apiUrl);
        console.log('API Response:', response.data);

        // Filter products that match the user's input
        this.suggestions = response.data.products.filter((product) => {
          // Check if product.name is defined before accessing it
          if (product.name) {
            return product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
          }
          return false; // If product.name is undefined, exclude it from the suggestions
        });

        this.isSuggestionOpen = this.suggestions.length > 0;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    selectSuggestion(suggestion) {
      // Handle the selection of a suggestion
      // For example, you can set the searchQuery to the selected suggestion
      this.searchQuery = suggestion.name;
      this.isSuggestionOpen = false; // Close the suggestion list
    },
  },
  watch: {
      group () {
        this.drawer1 = false
      },
    },
};
</script> -->


<style scoped>
/* Scoped styles in Vue 3 */
.v-toolbar-title {
  font-size: 1rem !important;
}
.v-badge__badge {
  font-size: 10px !important;
  height: 18px !important;
  min-width: 18px !important;
}
.search-suggestions-container {
  position: relative; /* Make the container relative */
}
.suggestion-menu {
  position: absolute;
  z-index: 1; /* Ensure suggestions appear above other content */
  /* Add any other styles you need */
}
/* .v-overlay__content{
  width: 26% ; 
  left: 13.8%; 
  top: 12%;
} */
</style>
