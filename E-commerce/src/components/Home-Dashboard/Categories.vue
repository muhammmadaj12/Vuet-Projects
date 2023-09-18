<template>
    <div id="main-bg">
      <v-col cols="12" class="mb-5" id="h-dash">
        <v-carousel
          hide-delimiters
          cycle
          color="blue"
          height="400"
          hide-delimiter-background
          show-arrows="hover"
        >
          <v-carousel-item
            src="https://www.pngmart.com/files/22/iPhone-14-PNG-Transparent.png"
            contain
          ></v-carousel-item>
  
          <v-carousel-item
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBwbGUlMjBsYXB0b3B8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
            cover
          ></v-carousel-item>
  
          <v-carousel-item
            src="https://i0.wp.com/theedinburghreporter.co.uk/wp-content/uploads/2022/02/malik-shibly-I7wnWm6HQQY-unsplash-scaled.jpg?fit=2560%2C1707&ssl=1"
            cover
          >
          </v-carousel-item>
          <v-carousel-item
            src="https://www.oberlo.com/media/1603970229-test8.png?w=1824&fit=max"
            cover
          ></v-carousel-item>
        </v-carousel>
      </v-col>
      <v-container>
        <v-row>
          <v-col cols="3">
            <div class="text-subtitle-1 my-3 text-large-emphasis">
              <h2>Filters :</h2>
            </div>
            <div>
              <h3 class="text-subtitle-2 text-medium-emphasis">Categories:</h3>
              <hr />
              <div v-for="(category, index) in categories" :key="index">
                <v-checkbox
                  :label="category"
                  v-model="selectedCategories"
                  :value="category"
                ></v-checkbox>
              </div>
            </div>
          </v-col>
          <v-col cols="9">
            <v-row>
              <v-card
                style="cursor: pointer"
                @click="navigateToProductDetails(product.id)"
                v-for="product in filteredProducts"
                :key="product.id"
                class="mx-auto my-2"
                width="31%"
              >
                <v-img cover height="250" :src="product.thumbnail"></v-img>
                <v-card-item>
                  <v-card-title>{{ product.title }}</v-card-title>
                  <v-rating
                    :model-value="product.rating"
                    color="amber"
                    density="compact"
                    half-increments
                    readonly
                    size="small"
                  ></v-rating>
                </v-card-item>
                <v-card-subtitle>
                  <h2>Price: {{ product.price }}$</h2>
                </v-card-subtitle>
                <v-card-text style="min-height: 130px">{{
                  product.description
                }}</v-card-text>
                <v-divider class="mx-4 mb-1"></v-divider>
                <v-card-actions>
                  <v-btn color="deep-purple-lighten-2" variant="text"
                    >Buy Now
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  <script>
  import axios from "axios";
  export default {
    name: "Categories",
    data() {
      return {
        products: [], // Store products from the API
        categories: [], // Store categories from the API
        selectedCategories: [], // Store selected categories
        colors: [
          "indigo",
          "warning",
          "pink darken-2",
          "red lighten-1",
          "deep-purple accent-4",
        ],
      };
    },
    computed: {
      filteredProducts() {
        if (this.selectedCategories.length === 0) {
          // No categories selected, show all products
          return this.products;
        } else {
          // Filter products based on selected categories
          return this.products.filter((product) =>
            this.selectedCategories.includes(product.category)
          );
        }
      },
    },
    async mounted() {
      try {
        // Make an Axios GET request to fetch products
        const productsResponse = await axios.get(
          "https://dummyjson.com/products"
        );
        this.products = productsResponse.data.products; // Update the products data
  
        // Make another Axios GET request to fetch categories
        const categoriesResponse = await axios.get(
          "https://dummyjson.com/products/categories"
        );
        this.categories = categoriesResponse.data; // Update the categories data
      } catch (error) {
        console.error(error);
      }
    },
    methods: {
      navigateToProductDetails(productId) {
        // Use Vue Router to navigate to the ProductDetails route with the product ID as a parameter
        this.$router.push({ name: "Details", params: { id: productId } });
      },
    },
    // // Make an Axios GET request to fetch products
    // axios.get('https://dummyjson.com/products')
    //   .then(response => {
    //     this.products = response.data.products; // Update the products data
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  
    // // Make another Axios GET request to fetch categories
    // axios.get('https://dummyjson.com/products/categories')
    //   .then(response => {
    //     this.categories = response.data; // Update the categories data
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  };
  </script>
    
    
  <style scoped>
  /* Add your CSS styles here if needed */
  #main-bg {
    background-color: #e5f1f5;
  }
  div#h-dash {
    padding-top: 5%;
  }
  </style>
    
    