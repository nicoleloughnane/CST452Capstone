import {createRouter, createWebHistory} from 'vue-router'
import NotFound from './NotFound.vue';
import UserAuth from './pages/UserAuth.vue';
import WelcomeHome from './pages/WelcomeHome.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/home', component: WelcomeHome},
        {path: '/', redirect: '/login'},
        {path: '/login', component: UserAuth},
        //invalid route
        {path: '/:notFound(.*)', component: NotFound},
    ],
});

export default router;