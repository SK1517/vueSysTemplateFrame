import Vue from 'vue'
import VueRouter from 'vue-router'

import Content from '../Content'
import UserManager from "../views/UserManager";
import GoodsManager from "../views/GoodsManager";

// import Login from '../components/Login'

Vue.use(VueRouter)
// const beforeEnter = (to, from, next) => {
//     if (to.meta && to.meta.title) {
//         document.title = to.meta.title;
//     }
//     if (window.$rootVue) {
//         window.$rootVue.currentRoutePath = to.path;
//     }
//     next()
// }
const routes = [
    {
        path: '/',
        name: 'Content',
        meta: {title: 'Vue Sys Template'},
        component: Content,
        redirect: '/views/UserManager',
        children: [
            {path: '/views/UserManager', component: UserManager, title: 'UserManager'},
            {path: '/views/GoodsManager', component: GoodsManager, title: 'GoodsManager'},
        ]
    },
]

const router = new VueRouter({
    mode: 'hash',
    routes
})

export default router
