import { defineStore } from "pinia";
import { useProductStore } from "./productStore";

export const useCartStore = defineStore("cartStore", {
  state: () => ({
    cart: {
      items: [],
    },
  }),
  getters: {
    getTotalPrice(state) {
      let res = 0;
      for (let i = 0; i < state.cart.items.length; i++)
        res += state.cart.items[i].quantity * state.cart.items[i].product.price;
      return res;
    },
  },
  actions: {
    isProductExists(product) {
      return this.cart.items.some((item) => item.product.id === product.id);
    },
    addToCart(product) {
      const productStore = useProductStore();

      if (!this.isProductExists(product)) {
        this.cart.items.push({ product, quantity: 1 });
      } else {
        let foundItem = this.cart.items.find(
          (item) => item.product.id === product.id
        );
        foundItem.quantity++;
      }
      const productUpdate = productStore.products.find(
        (p) => p.id === product.id
      );
      if (productUpdate) productUpdate.instock--;
    },
    increaseQuantity(item) {
      item.quantity++;
      item.product.instock--;
    },
    decreaseQuantity(item) {
      item.quantity--;
      item.product.instock++;
      if (item.quantity === 0)
        this.cart.items = this.cart.items.filter(
          (i) => i.product.id !== item.product.id
        );
    },
    formatCurrency(value) {
      return Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(value);
    },
  },
});
