// import MyApp from "@/myApp.vue";
import App from "@/App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Cart from "../cart.vue";
import ProductsList from "../productsList.vue";
import UnderConstuction from "../underConstuction.vue";

const routes = [
  { path: "/", component: ProductsList },
  { path: "/products", component: ProductsList },
  { path: "/cart", component: Cart },
  { path: "/:catchAll(.*)", component: UnderConstuction },
];

export const router = createRouter({
  routes,
  history: createWebHistory(),
});
