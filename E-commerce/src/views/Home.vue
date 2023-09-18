<template>
  <div>
    <!-- <Home /> -->
    <Dashboard />
  </div>
</template>

<script>
// import Home from '@/components/Home.vue'; // Include the Home component
import Dashboard from '@/components/Home-Dashboard/index.vue';

export default {
  name: 'Home',
  components: {
    // Home,
    Dashboard,
  },
};
</script>
