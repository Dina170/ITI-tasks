<template>
  <div class="container">
    <navbar />
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useProductStore } from './stores/productStore';

import navbar from './components/navbar.vue';

const productStore = useProductStore();

onMounted(() => {
  productStore.loadProducts();
});

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
