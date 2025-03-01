<template>
    <div class="row justify-content-between align-items-center my-5 mx-1">
        <div class="col-4 mb-2" v-for="product in productStore.products" :key="product.id">
            <product :product="product" />
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useProductStore } from '@/stores/productStore';

import product from './product.vue';

const productStore = useProductStore();

onMounted(() => {
    productStore.loadProducts();
});

</script>

<style></style>