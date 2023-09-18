<template>
    <div>
      <h2>Sign Up</h2>
      <form @submit.prevent="signup">
        <div class="form-group">
          <label for="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            v-model="fullName"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="profilePicture">Profile Picture:</label>
          <input
            type="file"
            id="profilePicture"
            ref="fileInput"
            @change="handleFileUpload"
            class="form-control"
            accept="image/*"
          />
        </div>
        <button type="submit" class="btn btn-primary">Sign Up</button>
      </form>
      <p v-if="isSignedUp" class="success-message">
        Signed up successfully!
      </p>
      <!-- <div v-if="profileImage" class="profile-image">
        <img :src="profileImage" alt="Profile" />
      </div> -->
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        fullName: '',
        email: '',
        password: '',
        isSignedUp: false,
        profileImage: null,
      };
    },
    methods: {
      signup() {
        // Simulate a signup process (you should replace this with your actual signup logic)
        // For demonstration purposes, we'll just show a success message
        this.isSignedUp = true;
      },
      handleFileUpload() {
        const file = this.$refs.fileInput.files[0];
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.profileImage = reader.result;
            // Save the image to local storage
            localStorage.setItem('profileImage', reader.result);
          };
        }
      },
    },
    created() {
      // Load the profile image from local storage on component creation
      const savedProfileImage = localStorage.getItem('profileImage');
      if (savedProfileImage) {
        this.profileImage = savedProfileImage;
      }
    },
  };
  </script>
  
  <style scoped>
  /* Add your CSS styles here */
  .form-group {
    margin-bottom: 20px;
  }
  .form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .btn-primary {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
  }
  .success-message {
    color: green;
    font-weight: bold;
    margin-top: 10px;
  }
  .profile-image img {
    max-width: 100px;
    max-height: 100px;
    margin-top: 10px;
  }
  </style>