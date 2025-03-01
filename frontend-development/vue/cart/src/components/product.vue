<template>
    <div class="card">
        <div>
            <img :src="product.image" class="card-img-top">
        </div>
        <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p>{{ product.description }}</p>
        </div>
        <div class="card-footer d-flex justify-content-between align-items-baseline">
            <p class="pt-3"><span
                    :class="[product.instock >= 5 ? 'more' : '', product.instock < 5 ? 'less' : '', product.instock == 0 ? 'none' : '']">instock:
                    {{ product.instock }}</span></p>
            <button class="btn btn-primary" @click="cartStore.addToCart(product)" :disabled="product.instock == 0">Add
                to
                Cart</button>
        </div>
    </div>
</template>

<script setup>

import { useCartStore } from '@/stores/cartStore';

import { defineProps } from 'vue';

const cartStore = useCartStore();

const props = defineProps(['product']);


</script>

<style></style>