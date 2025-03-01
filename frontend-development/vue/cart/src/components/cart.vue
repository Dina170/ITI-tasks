<template>
    <div class="cart">
        <h3 class="text-center text-danger pt-5" v-if="cartStore.cart.items.length == 0">No items in cart...</h3>
        <div class="my-5" v-else>
            <table class="table table-striped table-bordered text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in cartStore.cart.items" :key="item.product.id">
                        <td>{{ item.product.id }}</td>
                        <td>{{ item.product.name }}</td>
                        <td>{{ cartStore.formatCurrency(item.product.price) }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ cartStore.formatCurrency(item.quantity * item.product.price) }}</td>
                        <td>
                            <button class="btn btn-success me-2" @click="cartStore.increaseQuantity(item)"
                                :disabled="item.product.instock == 0">+</button>
                            <button class="btn btn-danger" @click="cartStore.decreaseQuantity(item)">-</button>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">Total Price</td>
                        <td colspan="3">{{ cartStore.formatCurrency(cartStore.getTotalPrice) }}</td>
                    </tr>
                    <tr>
                        <td colspan="3">Total Taxes</td>
                        <td colspan="3">{{ cartStore.formatCurrency(cartStore.getTotalPrice * 0.1) }}</td>
                    </tr>
                    <tr>
                        <td colspan="3">Grand Total</td>
                        <td colspan="3">{{ cartStore.formatCurrency(cartStore.getTotalPrice * 1.1) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>

import { useCartStore } from '@/stores/cartStore';

const cartStore = useCartStore();
console.log("test", cartStore.getTotalPrice);

</script>

<style></style>