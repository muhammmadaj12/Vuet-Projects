<template>
  <div id="login-bg">
    <v-row>
      <v-col cols="12">
        <v-card
          col-
          class="mx-auto my-6 pa-12 pb-8"
          elevation="8"
          max-width="55%"
          rounded="lg"
        >
          <div class="text-subtitle-1 text-medium-emphasis">Email</div>

          <v-text-field
            v-model="username"
            density="compact"
            placeholder="Username"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
          ></v-text-field>

          <div
            class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
          >
            Password
            <a
              class="text-caption text-decoration-none text-blue"
              href="#"
              rel="noopener noreferrer"
              target="_blank"
            >
              Forgot login password?
            </a>
          </div>

          <v-text-field
            v-model="password"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Enter your password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
          ></v-text-field>

          <!-- Include the CameraCapture component -->
          <CameraCapture
            @imageCaptured="onImageCaptured"
            v-if="!imageCaptured"
          />

          <v-btn
            block
            class="mb-8"
            color="blue"
            size="large"
            variant="tonal"
            @click="login"
          >
            Log In
          </v-btn>

          <!-- <v-card class="mb-12" color="surface-variant" variant="tonal">
            <v-card-text class="text-medium-emphasis text-caption">
              Warning: After 3 consecutive failed login attempts, your account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.
            </v-card-text>
          </v-card> -->

          <v-card-text class="text-center">
            <a
              class="text-blue text-decoration-none"
              @click="signup"
              rel="noopener noreferrer"
              target="_blank"
              style="cursor: pointer"
            >
              Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
            </a>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CameraCapture from "@/components/common/CameraCapture.vue"; // Adjust the path as needed
import axios from "axios";

export default {
  name: "Login",
  components: {
    CameraCapture,
  },
  data() {
    return {
      visible: false,
      username: "",
      password: "",
      imageCaptured: false,
    };
  },
  created() {
    // When the login component is created, check if there's a token in local storage and remove it
    localStorage.removeItem("userToken");
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("https://dummyjson.com/auth/login", {
          username: this.username,
          password: this.password,
        });

        if (response.data.token) {
          // Store the token in local storage
          localStorage.setItem("userToken", response.data.token);

          // Redirect to the dashboard route
          this.$router.push("/home/dashboard");
        } else {
          // Handle login failure (e.g., show an error message)
          console.error("Login failed");
        }
      } catch (error) {
        console.error(error);
      }
    },

    signup() {
      this.$router.push("/signup");
    },
    // Method to handle image captured event from CameraCapture component
    onImageCaptured() {
      // Handle image captured event, if needed
      this.imageCaptured = true; // Set imageCaptured to true to hide the camera screen
    },
  },
};
</script>

<style scoped>
#login-bg {
  background-image: url("src/assets/login.webp");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: left;
}
</style>
