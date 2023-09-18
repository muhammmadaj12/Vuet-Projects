<template>
  <v-app>
    <Header />
    <router-view /> <!-- This is the main content placeholder -->
    <Footer />
  </v-app>
</template>

<script setup>
  import Header from '@/components/Top-Bottom/Header.vue';
  import Footer from '@/components/Top-Bottom/Footer.vue';
</script>
