import MyApp from "@/myApp.vue";
import { createRouter, createWebHistory } from "vue-router";
import About from "../views/about.vue";
import Contact from "../views/contact.vue";
import Dynamic from "../views/dynamic.vue";
import studentDetails from "../views/studentDetails.vue";
import UnderConstuction from "../views/underConstuction.vue";

const routes = [
    {path: '/', component: MyApp},
    {path: '/about', component: About},
    {path: '/contact', component: Contact},
    {path: '/dynamic', component: Dynamic},
    {path: '/student/:id', component: studentDetails},
    {path: '/:catchAll(.*)', component: UnderConstuction},
]

export const router = createRouter({
    routes,
    history: createWebHistory()
})

