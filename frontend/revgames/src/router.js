import SignUp  from "@/components/SignUp.vue";
import Home from "@/components/Home.vue";
import SignIn from "@/components/SignIn.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        name: "SignUp",
        component: SignUp,
        path: "/signup"
    },
    {
        name: "Home",
        component: Home,
        path: "/"
    },
    {
        name: "SignIn",
        component: SignIn,
        path: "/signin"
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;