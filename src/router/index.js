import Vue from 'vue'
import VueRouter from 'vue-router'

import Content from '../Content'

Vue.use(VueRouter)
const beforeEnter = (to, from, next) => {
    if (to.meta && to.meta.title) {
        document.title = to.meta.title;
    }
    if (window.$rootVue) {
        window.$rootVue.currentRoutePath = to.path;
    }
    next()
}
const routes = [
    {
        path: '/login',
        name: 'Login',
        meta: {title: '登录'},
        beforeEnter,
    },
    {
        path: '/',
        name: 'Content',
        meta: {title: 'Vue Sys Template'},
        component: Content,
        redirect: '/login',
        children: []
    },

]

const router = new VueRouter({
    mode: 'hash',
    routes
})

export default router
