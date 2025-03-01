import { defineStore } from "pinia";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [],
  }),
  actions: {
    async loadProducts() {
      let res = await fetch("http://localhost:5000/products");
      this.products = await res.json();
    },
  },
});
