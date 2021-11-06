import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/game/:id',
        name: 'Game',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Game.vue')
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Cart.vue')
    },
    {
        path: '/aboutus',
        name: 'About Us',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/AboutUs.vue')
    },
    {
        path: '/faq',
        name: 'Faq',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Faq.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router