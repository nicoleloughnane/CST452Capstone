import {createRouter, createWebHistory} from 'vue-router'
import NotFound from './NotFound.vue';
import UserAuth from './pages/LoginUserComponent.vue';
import WelcomeHome from './pages/WelcomeHome.vue';
import SignUpUser from './pages/SignUpUserComponent.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/home', component: WelcomeHome},
        {path: '/', redirect: '/login'},
        {path: '/login', component: UserAuth},
        {path: '/signup', component: SignUpUser},
        //invalid route
        {path: '/:notFound(.*)', component: NotFound},
    ],
});

export default router;