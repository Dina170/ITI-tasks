import { createApp } from "vue";
import myApp from "@/myApp";
import dynamic from "./components/views/dynamic.vue";
import landing from "./components/landing.vue";
import { router } from "./components/routers";

// createApp(myApp).mount("#app");
// createApp(dynamic).mount("#app");
createApp(landing).use(router).mount("#app");

