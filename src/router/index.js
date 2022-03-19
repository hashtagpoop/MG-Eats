import { createRouter, createWebHistory } from "vue-router";
import Home from "/src/views/home.vue";

const recipes = () => import("/src/views/recipeHome.vue");

const routes = [
    { 
        path: '/',
        component: Home,
        meta: {
            enterClass: "animate__animated animate__fadeInLeft",
            leaveClass: "animate__animated animate__fadeOutRight",
        }
    },
    {
        path: '/recipes',
        component: recipes,
        meta: {
            enterClass: "animate__animated",
            leaveClass: "animate__animated",
            authRequired: true,
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router
