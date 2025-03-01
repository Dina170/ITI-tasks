<template>
    <div class="d-flex justify-content-between align-items-center p-2 bg-dark text-light">
        <router-link to="/products" style="color: yellow; text-decoration: none;">Products</router-link>
        <div class="info d-flex justify-content-between align-items-center">
            <p class="pe-2 my-auto">{{ cartStore.cart.items.length }} item<span
                    v-if="cartStore.cart.items.length != 1">s</span>
                with total
                {{ cartStore.formatCurrency(cartStore.getTotalPrice) }}
            </p>
            <router-link to="/cart" class="btn btn-primary">Show Cart</router-link>
        </div>
    </div>
</template>

<script setup>

import { useCartStore } from '@/stores/cartStore';
const cartStore = useCartStore();

</script>

<style></style>