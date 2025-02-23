import MyApp from "@/myApp.vue";
import { createRouter, createWebHistory } from "vue-router";
import About from "../views/about.vue";
import Contact from "../views/contact.vue";
import Dynamic from "../views/dynamic.vue";
import studentDetails from "../views/studentDetails.vue";

const routes = [
    {path: '/', component: MyApp},
    {path: '/about', component: About},
    {path: '/contact', component: Contact},
    {path: '/dynamic', component: studentDetails},
    {path: '/student/:id', component: Dynamic},
]

export const router = createRouter({
    routes,
    history: createWebHistory()
})

