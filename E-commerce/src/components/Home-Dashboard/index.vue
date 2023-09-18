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
    <v-divider class="my-3"></v-divider>
    <v-col class="text-center pb-3">
       <!-- Featured Products -->
       <div class="text-center">
            <v-card-title class="mb-0">
              <h1 class="mb-0 h3 fw-bold">Featured Products</h1>
            </v-card-title>
            <v-card-text class="mb-0 text-capitalize" style="font-size: 1rem">
              The purpose of Our Featured Products
            </v-card-text>
          </div>
          <!-- Use v-slide-group to display cards -->
          <v-slide-group
            v-model="model"
            class="pa-4"
            selected-class="bg-primary"
            mandatory
            show-arrows
          >
            <!-- Loop through your products and create cards -->
            <v-slide-group-item v-for="product in products" :key="product">
              <v-card
                class="mx-6 my-12 text-center"
                max-width="374"
                width="300"
                elevation="8"
                style="cursor: pointer;"
                @click="navigateToProductDetails(product.id)"
              >
                <v-img height="250" :src="product.thumbnail"></v-img>

                <v-card-item>
                  <v-card-title>{{ product.title }}</v-card-title>
                </v-card-item>

                <v-card-text>
                  <div class="mx-0 my-0">
                    <v-rating
                      :model-value="product.rating"
                      color="amber"
                      density="compact"
                      half-increments
                      readonly
                      size="small"
                    ></v-rating>
                  </div>

                  <div class="my-4 text-subtitle-1">$ {{ product.price }}</div>
                </v-card-text>
              </v-card>
            </v-slide-group-item>
          </v-slide-group> 
    </v-col>
    <v-divider class="my-3"></v-divider>
    <v-col class="text-center pb-3">
       <!-- Featured Products -->
       <div class="text-center">
            <v-card-title class="mb-0">
              <h1 class="mb-0 h3 fw-bold">Samrtphones Products</h1>
            </v-card-title>
            <v-card-text class="mb-0 text-capitalize" style="font-size: 1rem">
              The quality of Our Smartphones
            </v-card-text>
          </div>
          <v-slide-group
            v-model="model"
            class="pa-4"
            selected-class="bg-primary"
            mandatory
            show-arrows
          >
            <!-- Loop through your products and create cards -->
            <v-slide-group-item v-for="(phoneProduct, index) in phonesProducts" :key="index">
              <v-card
                class="mx-6 my-12 text-center"
                max-width="374"
                width="300"
                elevation="8"
                style="cursor: pointer;"
                @click="navigateToProductDetails(phoneProduct.id)"
              >
                <v-img height="250" :src="phoneProduct.thumbnail"></v-img>

                <v-card-item>
                  <v-card-title>{{ phoneProduct.title }}</v-card-title>
                </v-card-item>

                <v-card-text>
                  <div class="mx-0 my-0">
                    <v-rating
                      :model-value="phoneProduct.rating"
                      color="amber"
                      density="compact"
                      half-increments
                      readonly
                      size="small"
                    ></v-rating>
                  </div>

                  <div class="my-4 text-subtitle-1">$ {{ phoneProduct.price }}</div>
                </v-card-text>
              </v-card>
            </v-slide-group-item>
          </v-slide-group> 

    </v-col>
    <v-col class="text-center pb-3">
       <!-- Featured Products -->
       <div class="text-center">
            <v-card-title class="mb-0">
              <h1 class="mb-0 h3 fw-bold">Laptops Products</h1>
            </v-card-title>
            <v-card-text class="mb-0 text-capitalize" style="font-size: 1rem">
              The quality of Our Laptops
            </v-card-text>
          </div>
          <v-slide-group
            v-model="model"
            class="pa-4"
            selected-class="bg-primary"
            mandatory
            show-arrows
          >
            <!-- Loop through your products and create cards -->
            <v-slide-group-item v-for="(laptopProduct, index) in laptopsProducts" :key="index">
              <v-card
                class="mx-6 my-12 text-center"
                max-width="374"
                width="300"
                elevation="1"
                style="cursor: pointer;"
                @click="navigateToProductDetails(laptopProduct.id)"
              >
                <v-img height="250" :src="laptopProduct.thumbnail"></v-img>

                <v-card-item>
                  <v-card-title>{{ laptopProduct.title }}</v-card-title>
                </v-card-item>

                <v-card-text>
                  <div class="mx-0 my-0">
                    <v-rating
                      :model-value="laptopProduct.rating"
                      color="amber"
                      density="compact"
                      half-increments
                      readonly
                      size="small"
                    ></v-rating>
                  </div>

                  <div class="my-4 text-subtitle-1">$ {{ laptopProduct.price }}</div>
                </v-card-text>
              </v-card>
            </v-slide-group-item>
          </v-slide-group> 

    </v-col>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: "Dashboard",
  data: () =>{
    return {
      products: [],
      model: "",
      phonesProducts: [],
      laptopsProducts: [],
    }
  },
  async mounted() {
  try {
    // Make an Axios GET request to fetch products
    const productsResponse = await axios.get(
      "https://dummyjson.com/products"
    );
    this.products = productsResponse.data.products; // Update the products data

    // Use filter to get all products with category "smartphones"
    this.phonesProducts = this.products.filter((product) => {
      return product.category === "smartphones"; // Change this condition to match your data structure
    });
    this.laptopsProducts = this.products.filter((product) => {
      return product.category === "laptops"; // Change this condition to match your data structure
    });

    console.log('phonesProducts:', this.phonesProducts);
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
  
  